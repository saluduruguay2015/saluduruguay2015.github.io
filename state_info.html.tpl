<div class="row-fluid">
  <div class="col-md-6">
    <h2>Elegi uno criterio para {{state.name}}:</h2>
  </div>
  <div class="col-md-6">
    <div ng-controller="SpecialSeriesController">
      <div class="buttons">
        <label class="btn btn-default btn-lg" ng-model="special" btn-radio="afiliados" ng-click="addPeopleSeries()">Afiliados</label>
        <label class="btn btn-default btn-lg" ng-model="special" btn-radio="tiempos_espera" ng-click="addTimeSeries()">Tiempos de Espera</label>
        <label class="btn btn-default btn-lg" ng-model="special" btn-radio="derechos" ng-click="addObjectivesSeries()">Metas</label>
      </div>
      <div class="buttons">
        <label class="btn btn-default btn-lg" ng-model="special" btn-radio="derechos" ng-click="addResourcesSeries()">Recursos Humanos</label>
        <label class="btn btn-default btn-lg" ng-model="special" btn-radio="derechos" ng-click="addPriceSeries()">Precios</label>
        <label class="btn btn-default btn-lg" ng-model="special" btn-radio="derechos" ng-click="addRightsSeries()">Derechos</label>
      </div>
    </div>
  </div>
</div>

<div class="row-fluid">
  <div class="col-md-12">
    <highchart id="chart1" config="chartConfig" style="height: 600px"></highchart>
  </div>
</div>
<div class="row-fluid">
  <div class="col-md-12">
    <ul id="select_state">
      <h2>Elegir otro departamento:</h2>
      <li ng-repeat="state in states">
        <a href="#/departamento/{{state.path}}">{{state.name}}</a>
      </li>
    </ul>
  </div>
</div>


<!-- this actually confuses people! -->
<!-- <div class="row"> -->
<!--   <span ng&#45;repeat="field in fields"> -->
<!--     <a href="" ng&#45;click="addSeries(field)">{{field}}</a> &#45; -->
<!--   </span> -->
<!-- </div> -->
