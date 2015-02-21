'use strict';

angular
.module('myapp', [
  "ngResource",
  "ngRoute",
  "highcharts-ng"
])

.controller('StateController', function ($scope, $http, $routeParams) {
  $scope.chosenState = $routeParams.path;
  var jsonFile = "data/" + $scope.chosenState.toString() + '.json';
  $http.get(jsonFile).then(function(res) {
    var data = res.data;
    $scope.providers = data.providers;
    $scope.states = data.states;
    $scope.state = $scope.states.filter(function(element) {
      return element.path === $scope.chosenState;
    })[0];

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

    // $scope.dashStyles = [
    //   {"id": "Solid", "title": "Solid"},
    //   {"id": "ShortDash", "title": "ShortDash"},
    //   {"id": "ShortDot", "title": "ShortDot"},
    //   {"id": "ShortDashDot", "title": "ShortDashDot"},
    //   {"id": "ShortDashDotDot", "title": "ShortDashDotDot"},
    //   {"id": "Dot", "title": "Dot"},
    //   {"id": "Dash", "title": "Dash"},
    //   {"id": "LongDash", "title": "LongDash"},
    //   {"id": "DashDot", "title": "DashDot"},
    //   {"id": "LongDashDot", "title": "LongDashDot"},
    //   {"id": "LongDashDotDot", "title": "LongDashDotDot"}
    // ];

    $scope.fields = Object.keys($scope.providers[0]);

    $scope.providers_names = $scope.providers.map(function(prov) {
      return prov.nombre_abreviado;
    });

    $scope.getAllByProp = function(prop) {
      return $scope.providers.map(function(prov) { return parseFloat(prov[prop]); });
    }

    // have a function for afiliados
    // $scope.chartSeries = [{ "name": "afiliados", "data": $scope.getAllByProp("afiliados"), "yAxis": 0 }];

    // TODO: refactor to optimize
    $scope.removeAllSeries = function() {
      $scope.chartConfig.options.yAxis = [];
      $scope.chartConfig.series = [];
      $scope.addPeopleSeries();
    };

    $scope.removeSeries = function (title) {
      var seriesArray = $scope.chartConfig.series;
      var id = seriesArray.every(function(element, index, array) {
        if (element.title === title) {
          return id;
        };
      });
      seriesArray.splice(id, 1);
    }

    $scope.pushDataSeries = function(name, title, chartType, stackName) {
      var serie = {
        "name": title,
        "type": chartType,
        "data": $scope.getAllByProp(name),
        "yAxis": $scope.chartConfig.options.yAxis.length - 1
      };

      if (stackName !== 'undefined') {
        serie['stack'] = stackName;
      };

      $scope.chartConfig.series.push(serie);
    };

    $scope.addSeries = function(name, chartType) {
      if (typeof(chartType) === 'undefined') chartType = "areaspline";

      $scope.chartConfig.options.yAxis.push({
        title: {
          text: name
        },
        labels: {
          format: '{value} %'
        }
      });

      $scope.pushDataSeries(name, name, chartType);
    };

  $scope.addPeopleSeries = function() {
    $scope.chartConfig.options.yAxis.push({
      title: {
        text: "Afiliados"
      },
      opposite: true
    });

    $scope.pushDataSeries("afiliados", "Cantidad de afiliados", "spline");
  };

   $scope.chartConfig = {
        options: {
            chart: {
              zoomType: 'xy'
            },
            tooltip: {
              shared: true
            },
            yAxis: []
        },
        series: [], //$scope.chartSeries,
        title: {
            text: 'Comparación para ' + $scope.state.name
        },
        xAxis: {
          categories: $scope.providers_names,
          labels: {
            rotation: 45
          },
        },
        loading: false
    };
    $scope.addPeopleSeries();

    $scope.reflow = function () {
      $scope.$broadcast('highchartsng.reflow');
    };
  });
})

.controller('SpecialSeriesController', function($scope) {

  $scope.addTimeSeries = function() {
    $scope.removeAllSeries(); //TODO: Refactor to remove this
    $scope.chartConfig.options.yAxis.push({
      title: {
        text: "Tiempos de Espera"
      },
      labels: {
        format: '{value} días'
      },
    });

    $scope.chartConfig.options.plotOptions = {
      column: {
        stacking: 'normal'
      }
    };

    $scope.pushDataSeries("tiempo_espera_medicina_general", "Espera Med. General", "column", "tiempos_espera");
    $scope.pushDataSeries("tiempo_espera_cirugia_general", "Espera Cirugía", "column", "tiempos_espera");
    $scope.pushDataSeries("tiempo_espera_pediatria", "Espera Pediatría", "column", "tiempos_espera");
    $scope.pushDataSeries("tiempo_espera_ginecotocologia", "Espera Ginecólogo", "column", "tiempos_espera");
    $scope.pushDataSeries("tiempo_espera_medico_referencia", "Espera Med. Cabecera", "column", "tiempos_espera");
  };

  $scope.addRightsSeries = function() {
    $scope.removeAllSeries(); //TODO: Refactor to remove this
    $scope.chartConfig.options.yAxis.push({
      title: {
        text: "Tiempos de Espera"
      },
      labels: {
        format: '{value} %'
      },
    });

    // $scope.chartConfig.options.plotOptions = {
    //   column: {
    //     stacking: 'normal'
    //   }
    // };

    $scope.pushDataSeries("informacion_sobre_derechos_2014", "Información sobre derechos", "column", "derechos");
    $scope.pushDataSeries("queja_sugerencia_sabe_donde_dirigirse_2014", "Recepción de quejas", "column", "derechos");
    $scope.pushDataSeries("satisfaccion_primer_nivel_atencion_2014", "Satisfacción", "column", "derechos");
    $scope.pushDataSeries("disponibilidad_medicamentos_farmacia_2014", "Disponibilidad de medicamentos", "column", "derechos");
    $scope.pushDataSeries("facilidad_para_realizar_tramites_gestiones_2014", "Facilidad de trámites", "column", "derechos");
    $scope.pushDataSeries("conformidad_disponibilidad_agenda_2014", "Hay horas?", "column", "derechos");
  };

  $scope.addPriceSeries = function() {
  };

  $scope.addObjectivesSeries = function() {
  };

  $scope.addResourcesSeries = function() {
    $scope.removeAllSeries(); //TODO: Refactor to remove this
    $scope.chartConfig.options.yAxis.push({
      title: {
        text: "Recursos Humanos c/10.000 usuarios"
      },
      labels: {
        format: '{value} cargos'
      },
    });

    $scope.chartConfig.options.plotOptions = {
      column: {
        stacking: 'normal'
      }
    };

    $scope.pushDataSeries("medicos_generales_policlinica", "Med. Generales", "column", "rrhh");
    $scope.pushDataSeries("medicos_de_familia_policlinica", "Médicos de Familia", "column", "rrhh");
    $scope.pushDataSeries("medicos_pediatras_policlinica", "Pediatras", "column", "rrhh");
    $scope.pushDataSeries("medicos_ginecologos_policlinica", "Ginecólogos", "column", "rrhh");
    $scope.pushDataSeries("auxiliares_enfermeria_policlinica", "Enfermeros", "column", "rrhh");
    $scope.pushDataSeries("licenciadas_enfermeria_policlinica", "Lic. en Enfermería", "column", "rrhh");
  };
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/departamento/:path', {
      templateUrl: 'state_info.html.tpl',
      controller: 'StateController'
    })
    .otherwise('/departamento/montevideo');
}])
