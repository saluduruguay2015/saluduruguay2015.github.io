<h2>{{chosenState}}</h2>
<div class="row-fluid">
  <div class="col-md-12">
    <highchart id="chart1" config="chartConfig" style="height: 600px"></highchart>
  </div>
</div>
<div class="row">
  <span ng-repeat="field in fields">
    <a href="" ng-click="addSeries(field)">{{field}}</a> -
  </span>
</div>
