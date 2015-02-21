<h2>Datos para {{chosenState}}</h2>
<div class="row-fluid">
  <div class="col-md-12">
    <highchart id="chart1" config="chartConfig" style="height: 600px"></highchart>
  </div>
</div>
<h2>Elegi uno o mas criterios</h2>
<div ng-controller="SpecialSeriesController">
  <a href="" ng-click="addTimeSeries()">Tiempos de Espera</a>
  <a href="" ng-click="addRightsSeries()">Derechos de Usuarios</a>
  <a href="" ng-click="addPriceSeries()">Tickets y Ordenes</a>
  <a href="" ng-click="addResourcesSeries()">Recursos Humanos</a>
</div>

<div class="row">
  <span ng-repeat="field in fields">
    <a href="" ng-click="addSeries(field)">{{field}}</a> -
  </span>
</div>
<h2>Elegi otro departamento</h2>
<div ng-repeat="state in states">
  <a href="#/departamento/{{state.path}}">{{state.name}}</a>
</div>
