<div class="row-fluid">
  <div class="col-md-4">
    <h2>Elegi uno o mas criterios para <a ng-href="#select_state">{{state.name}}</a></h2>
  </div>
  <div class="col-md-4">
    <div ng-controller="SpecialSeriesController" class="btn-group">
      <label class="btn btn-primary" ng-model="none" ng-click="removeAllSeries()">Borrar todo</label>
      <label class="btn btn-primary" ng-model="special" btn-radio="afiliados" ng-click="removeAllSeries()">Afiliados</label>
      <label class="btn btn-primary" ng-model="special" btn-radio="tiempos_espera" ng-click="addTimeSeries()">Tiempos de Espera</label>
      <label class="btn btn-primary" ng-model="special" btn-radio="derechos" ng-click="addRightsSeries()">Derechos</label>
      <label class="btn btn-primary" ng-model="special" btn-radio="derechos" ng-click="addResourcesSeries()">Recursos Humanos</label>

      <!-- <a href="" ng&#45;click="addRightsSeries()">Derechos de Usuarios</a> -->
      <!-- <a href="" ng&#45;click="addPriceSeries()">Tickets y Ordenes</a> -->
    </div>
  </div>
</div>

<div class="row-fluid">
  <div class="col-md-12">
    <highchart id="chart1" config="chartConfig" style="height: 600px"></highchart>
  </div>
</div>

<div id="select_state">
  <h2>Elegi otro departamento</h2>
  <div ng-repeat="state in states">
    <a href="#/departamento/{{state.path}}">{{state.name}}</a>
  </div>
</div>

<div class="row">
  <span ng-repeat="field in fields">
    <a href="" ng-click="addSeries(field)">{{field}}</a> -
  </span>
</div>
