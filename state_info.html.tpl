<h2>Datos para {{chosenState}}</h2>
<div class="row-fluid">
  <div class="col-md-12">
    <highchart id="chart1" config="chartConfig" style="height: 600px"></highchart>
  </div>
</div>
<div ng-repeat="state in states">
  <a href="#/departamento/{{state.path}}">{{state.name}}</a>
</div>
<div class="row">
  <span ng-repeat="field in fields">
    <a href="" ng-click="addSeries(field)">{{field}}</a> -
  </span>
</div>
