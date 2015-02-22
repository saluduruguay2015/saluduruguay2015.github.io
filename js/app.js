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

  $scope.addPeopleSeries = function() {
    $scope.removeAllSeries(); //TODO: Refactor to remove this
    $scope.chartConfig.options.yAxis.push({
      title: {
        text: "Afiliados"
      },
      opposite: true,
      min: 0
    });

    $scope.pushDataSeries("afiliados", "Cantidad de afiliados", "column");
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
            rotation: -90
          },
        },
        loading: false
    };
    $scope.addPeopleSeries();
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
      max: 30.0
    });

    $scope.chartConfig.options.plotOptions = {
      column: {
        stacking: 'normal'
      }
    };


    var chartType = "column"
    $scope.pushDataSeries("tiempo_espera_medicina_general", "Espera Med. General", chartType, "tiempos_espera");
    $scope.pushDataSeries("tiempo_espera_cirugia_general", "Espera Cirugía", chartType, "tiempos_espera");
    $scope.pushDataSeries("tiempo_espera_pediatria", "Espera Pediatría", chartType, "tiempos_espera");
    $scope.pushDataSeries("tiempo_espera_ginecotocologia", "Espera Ginecólogo", chartType, "tiempos_espera");
    $scope.pushDataSeries("tiempo_espera_medico_referencia", "Espera Med. Cabecera", chartType, "tiempos_espera");
  };

  $scope.addRightsSeries = function() {
    $scope.removeAllSeries(); //TODO: Refactor to remove this
    $scope.chartConfig.options.yAxis.push({
      title: {
        text: "Derechos"
      },
      labels: {
        format: '{value} %'
      },
      max: 100
    });

    $scope.chartConfig.options.plotOptions = {
      column: {
        stacking: null
      }
    };

    var chartType = "column"
    $scope.pushDataSeries("informacion_sobre_derechos_2014", "Información sobre derechos", chartType, "derechos");
    $scope.pushDataSeries("queja_sugerencia_sabe_donde_dirigirse_2014", "Recepción de quejas", chartType, "derechos");
    $scope.pushDataSeries("satisfaccion_primer_nivel_atencion_2014", "Satisfacción", chartType, "derechos");
    $scope.pushDataSeries("disponibilidad_medicamentos_farmacia_2014", "Disponibilidad de medicamentos", chartType, "derechos");
    $scope.pushDataSeries("facilidad_para_realizar_tramites_gestiones_2014", "Facilidad de trámites", chartType, "derechos");
    $scope.pushDataSeries("conformidad_disponibilidad_agenda_2014", "Hay horas?", chartType, "derechos");
  };

  $scope.addPriceSeries = function() {
    $scope.removeAllSeries(); //TODO: Refactor to remove this
  };

  $scope.addObjectivesSeries = function() {
    $scope.removeAllSeries(); //TODO: Refactor to remove this
    $scope.chartConfig.options.yAxis.push({
      title: {
        text: "Metas del MSP"
      },
      labels: {
        format: '{value} %'
      },
      max: 300
    });

    $scope.chartConfig.options.plotOptions = {
      column: {
        stacking: 'stacked'
      }
    };

    var chartType = "column"
    $scope.pushDataSeries("meta_medico_referencia", "Usuarios con médico de referencia", chartType, "metas");
    $scope.pushDataSeries("meta_ninos_controlados", "Niños (menores de 1 año) controlados", chartType, "metas");
    $scope.pushDataSeries("meta_embarazadas", "Embarazadas controladas correctamente", chartType, "metas");
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
