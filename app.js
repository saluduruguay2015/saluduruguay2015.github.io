'use strict';

var myapp = angular.module('myapp', ["highcharts-ng"]);

myapp.controller('myctrl', function ($scope, $http) {
  //atuservicio-rails:3000/departamento/montevideo.json
  $http.get('montevideo.json').then(function(res) {
    var data = res.data;
    $scope.providers = res.data;

    $scope.chartTypes = [
      {"id": "line", "title": "Line"},
      {"id": "spline", "title": "Smooth line"},
      {"id": "area", "title": "Area"},
      {"id": "areaspline", "title": "Smooth area"},
      {"id": "column", "title": "Column"},
      {"id": "bar", "title": "Bar"},
      {"id": "pie", "title": "Pie"},
      {"id": "scatter", "title": "Scatter"}
    ];

    $scope.dashStyles = [
      {"id": "Solid", "title": "Solid"},
      {"id": "ShortDash", "title": "ShortDash"},
      {"id": "ShortDot", "title": "ShortDot"},
      {"id": "ShortDashDot", "title": "ShortDashDot"},
      {"id": "ShortDashDotDot", "title": "ShortDashDotDot"},
      {"id": "Dot", "title": "Dot"},
      {"id": "Dash", "title": "Dash"},
      {"id": "LongDash", "title": "LongDash"},
      {"id": "DashDot", "title": "DashDot"},
      {"id": "LongDashDot", "title": "LongDashDot"},
      {"id": "LongDashDotDot", "title": "LongDashDotDot"}
    ];


    // $scope.chartStack = [
    //   {"id": '', "title": "No"},
    //   {"id": "normal", "title": "Normal"},
    //   {"id": "percent", "title": "Percent"}
    // ];

    // $scope.addPoints = function () {
    //   var seriesArray = $scope.chartConfig.series;
    //   var rndIdx = Math.floor(Math.random() * seriesArray.length);
    //   seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    // };


//     $scope.removeRandomSeries = function () {
//       var seriesArray = $scope.chartConfig.series;
//       var rndIdx = Math.floor(Math.random() * seriesArray.length);
//       seriesArray.splice(rndIdx, 1)
//     }
//
    // $scope.removeSeries = function (id) {
    //   var seriesArray = $scope.chartConfig.series;
    //   seriesArray.splice(id, 1)
    // }

    // $scope.toggleHighCharts = function () {
    //   this.chartConfig.useHighStocks = !this.chartConfig.useHighStocks
    // }

    // $scope.replaceAllSeries = function () {
    //   var data = [
    //     { name: "first", data: [10] },
    //     { name: "second", data: [3] },
    //     { name: "third", data: [13] }
    //   ];
    //   $scope.chartConfig.series = data;
    // };
    //

    $scope.fields = Object.keys($scope.providers[0]);

    $scope.providers_names = $scope.providers.map(function(prov) {
      return prov.nombre_abreviado;
    });

    $scope.getAllByProp = function(prop) {
      return $scope.providers.map(function(prov) { return parseFloat(prov[prop]); });
    }

    $scope.chartSeries = [
      { "name": "afiliados", "data": $scope.getAllByProp("afiliados"), "yAxis": 0 }
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
        "type": "areaspline",
        "yAxis": $scope.chartConfig.options.yAxis.length - 1,
        "data": $scope.getAllByProp(name)
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
          categories: $scope.providers_names,
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
