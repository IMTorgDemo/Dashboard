

Keen.ready(function(){

  // Pageviews by browser

  var data = {
    result: [ 9873, 6768, 2215, 909 ],
    steps: [
        { event_collection: "create_account" },
        { event_collection: "complete_profile" },
        { event_collection: "create_project" },
        { event_collection: "invite_teammate" }
    ]
};

// Custom label map for label replacement
// ----------------------------------------
var customLabelMap = {
    "create_account"   : "Created Account",
    "complete_profile" : "Completed Profile",
    "create_project"   : "Created Project",
    "invite_teammate"  : "Invited Teammate"
};

// Create a new Keen.Dataviz instance
// ----------------------------------------
var chart = new Keen.Dataviz()
    .el("#chart-01")
    .chartType("bar")
		.height(280)
    .title("Cybersecurity Incidents by Severity")
    .prepare();


// Parse data and modify funnel labels
// ----------------------------------------

chart
    .data(data)
    .call(function(){
        // Updates labels w/ percentage of total
        var total = this.dataset.selectRow(1)[1];
        this.dataset.updateColumn(0, function(value, index, series){
            var diff = 100 * Number(series[1]/total).toFixed(2);
            var label = customLabelMap[value];
            return label + " (" + diff + "%)";
        });
    })
    .chartOptions({
        // Custom configurations for C3.js
        axis: {
            rotated: true,
            x: {
                type: "category",
                categories: chart.dataset.selectColumn(0).slice(1)
            }
        },
        legend: {
            show: false
        }
    })
    .render();
/*
  var pageviews_timeline = new Keen.Dataviz()
    .el('#chart-01')
    .type('area')
    .height(280)
    .stacked(true)
    .title('Pageviews by browser')
    .prepare();

  var res = {
      "result": [{
        "color": "Blue",
        "result": 2
      }, {
        "color": "Red",
        "result": 1
      }]
    }

  pageviews_timeline
        .data(res)
        .sortGroups('desc')
        .render();
  */


  // Pageviews by browser (pie)

  var chart = new Keen.Dataviz()
  .el('#chart-02')
  .height(280)
  .title('Cybersecurity Incidents by Type')
  .chartType('pie')
  .prepare();

// Fetch data from another API or your own data source:
// Imaginary callback ...
var data = {
  "result": [{
    "color": "Blue",
    "result": 2
  }, {
    "color": "Red",
    "result": 1
  }]
}

chart
  .data(data)
  .render();


  /*
  var pageviews_pie = new Keen.Dataviz()
    .el('#chart-02')
    .type('pie')
    .height(280)
    .title('Pageviews by browser')
    .prepare();

  client
    .query('count', {
      event_collection: 'pageviews',
      group_by: 'user.device_info.browser.family',
      timeframe: {
        start: '2014-05-01T00:00:00.000Z',
        end: '2014-05-05T00:00:00.000Z'
      }
    })
    .then(function(res) {
      pageviews_pie
        .data(res)
        .sortGroups('desc')
        .render();
    })
    .catch(function(err) {
      pageviews_pie.message(err.message)
    });
*/

  // Impressions timeline

  var impressions_timeline = new Keen.Dataviz()
    .el('#chart-03')
    .type('bar')
    .height(280)
    .stacked(true)
    .title('Impressions by advertiser')
    .prepare();

  client
    .query('count', {
      event_collection: 'impressions',
      group_by: 'ad.advertiser',
      interval: 'hourly',
      timeframe: {
        start: '2014-05-04T00:00:00.000Z',
        end: '2014-05-05T00:00:00.000Z'
      }
    })
    .then(function(res) {
      impressions_timeline
        .data(res)
        .sortGroups('desc')
        .render();
    })
    .catch(function(err) {
      impressions_timeline.message(err.message)
    });

  // Impressions by device

  var impressions_by_device = new Keen.Dataviz()
    .el('#chart-04')
    .type('bar')
    .height(280)
    .stacked(true)
    .title('Impressions by device')
    .prepare();

  client
    .query('count', {
      event_collection: 'impressions',
      group_by: 'user.device_info.device.family',
      interval: 'hourly',
      timeframe: {
        start: '2014-05-04T00:00:00.000Z',
        end: '2014-05-05T00:00:00.000Z'
      }
    })
    .then(function(res) {
      impressions_by_device
        .data(res)
        .sortGroups('desc')
        .render();
    })
    .catch(function(err) {
      impressions_by_device.message(err.message)
    });


  // Impressions by country

  var impressions_by_country = new Keen.Dataviz()
    .el('#chart-05')
    .type('bar')
    .height(280)
    .stacked(true)
    .title('Impressions by country')
    .prepare();

  client
    .query('count', {
      event_collection: 'impressions',
      group_by: 'user.geo_info.country',
      interval: 'hourly',
      timeframe: {
        start: '2014-05-04T00:00:00.000Z',
        end: '2014-05-05T00:00:00.000Z'
      }
    })
    .then(function(res) {
      impressions_by_country
        .data(res)
        .sortGroups('desc')
        .render();
    })
    .catch(function(err) {
      impressions_by_country.message(err.message)
    });

});
