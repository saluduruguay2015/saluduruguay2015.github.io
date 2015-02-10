'use strict';

var myapp = angular.module('myapp', ["highcharts-ng"]);

myapp.controller('myctrl', function ($scope, $http) {
  //atuservicio-rails:3000/departamento/montevideo.json
  // $http.get('montevideo.json').then(function(res) {

  //atuservicio-rails:3000/.json
  $http.get('providers.json').then(function(res) {
    var data = res.data;
    $scope.providers = res.data['providers'];

    $scope.states = {};
    $scope.states.list = res.data['states']
    $scope.states.selected = $scope.states.list[0];

    $scope.lookupByState = res.data['lookup_by_state'];
    $scope.providersByState = function(state_id) {
      var providers_ids = $scope.lookupByState[$scope.states.selected.id];// || [$scope.default_state];
      var res = $scope.providers.filter(function(provider) {
        return providers_ids.indexOf(provider.id) >= 0;
      });

      return res;
    };
    $scope.changeState = function() {
      console.log($scope.states.selected);
      return true;
    }

    $scope.stateProviders = function(state_id) {
      return $scope.providersByState(state_id);
    }
    $scope.fields = Object.keys($scope.providers[0]);

    $scope.providers_names = function(state) {
      return $scope.stateProviders(state.id).map(function(prov) {
        return prov.nombre_abreviado;
      });
    }

    $scope.getAllByProp = function(state_id, prop) {
      return $scope.stateProviders(state_id).map(function(prov) { return parseFloat(prov[prop]); });
    }

    $scope.chartSeries = [
      { "name": "afiliados", "data": $scope.getAllByProp($scope.states.selected.id, "afiliados"), "yAxis": 0 }
    ];

    $scope.addSeries = function(name) {
      $scope.chartConfig.options.yAxis.push({
        title: {
          text: name
        },
        labels: {
          format: '{value} %'
        },
        gridLineWidth: 0
      });

      $scope.chartConfig.series.push({
        "name": name,
        "type": "spline",
        "yAxis": $scope.chartConfig.options.yAxis.length - 1,
        "data": $scope.getAllByProp($scope.states.selected.id, name)
      });
    }

   $scope.chartConfig = {
        options: {
            chart: {
              zoomType: 'xy'
            },
            tooltip: {
              shared: true
            },

            yAxis: [{
              title: {
                text: 'afiliados'
              },
              opposite: true
            }]
        },
        series: $scope.chartSeries,
        title: {
            text: 'Comparador'
        },
        xAxis: {
          categories: $scope.providers_names($scope.states.selected.id),
          labels: {
            rotation: 45
          },
        },
        loading: false
    }

    $scope.reflow = function () {
      $scope.$broadcast('highchartsng.reflow');
    };
  });
});
