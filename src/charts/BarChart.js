'use strict';

var Highcharts = require( 'highcharts/highstock' );

Highcharts.setOptions({
  lang: {
    rangeSelectorZoom: '',
    thousandsSep: ','
  }
});

var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];

function BarChart( props ) {
  // var mostRecentMonthOfDataAvailable = props.data.unadjusted[props.data.unadjusted.length - 1][0];
  // var sixMonthsAgo = (60 * 60 * 24 * 365 * 1000 / 2);
  // var projectedDate = mostRecentMonthOfDataAvailable - sixMonthsAgo;
  // props.data.projectedDate = projectedDate;

var projDateText = 'April 2016';

  var options = {
    title: {
        text: props.title
    },
    description: props.description,
    credits: false,
    rangeSelector : {
      inputEnabled:false
    },
    chart: {
      width: 650,
      height: 500
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 1,
        groupPadding: 0,
        shadow: false,
        grouping: false
      }
    },
    xAxis: {
      tickInterval: 12,
      plotLines: [{
        color: '#75787b',
        width: 1,
        value: 1462075200000,
        label: {
          text: 'Values after April 2016 <br>are projected',
          align: 'left',
          verticalAlign: 'top',
          rotation: 0,
          x: -100,
          y: -20
        }
      }],
      // labels: {
      //   autoRotation: false,
      //   formatter: function() {
      //     var date = new Date( this.value );
      //     return months[ date.getMonth() ] + ' ' + date.getFullYear();
      //   },
      //   style: {
      //     'color': '#75787b',
      //     'font-size': '16px'
      //   },
      //   y: 30
      // }
      // plotLines: [{
      //   className: 'bar-chart_projected-line',
      //   color: '#75787b',
      //   label: {
      //     align: 'left',
      //     rotation: 0,
      //     style: {
      //       'color': '#75787b',
      //       'font-size': '16px'
      //     },
      //     text: 'Values after ' + projDateText + ' are projected',
      //     textAlign: 'right',
      //     // useHTML: true,
      //     y: -30
      //   },
      //   width: 2,
      //   value: props.data.length - 6.5
      // }]
    },
    yAxis: {
      opposite: false,
      title: {
        text: 'Year-over-year change (%)',
        style: {
          'color': '#75787b',
          'font-size': '16px'
        }
      }
    },
    navigator: {
        maskFill: 'rgba(0, 0, 0, 0.05)',
        handles: {
            backgroundColor: '#fff',
            borderColor: '#000'
        },
        series: {
            color: '#addc91',
            lineWidth: 2
        }
    },
    series: [ {
        type: 'column',
        data: props.data,
        name: 'Year-over-year change (%)',
        tooltip: {
          valueDecimals: 2
        },
        zoneAxis: 'x',
        zones: [
          {
            color: '#2CB34A',
            value: Date.UTC( 2016, 4, 1 ) // FIX THIS
          },
          {
            color: '#addc91',
          }
        ]
      } ]
  }

  Highcharts.stockChart( props.selector, options);
}

module.exports = BarChart;
