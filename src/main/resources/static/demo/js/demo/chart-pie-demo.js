// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Microsoft YaHei';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["探测区一", "探测区二", "探测区三", "探测区四", "探测区五"],
    datasets: [{
      data: [15, 20, 10, 15, 8],
      backgroundColor: ['#eec02d', '#0077c3', '#02ffea', '#02c0fe', '#0092c3'],
      hoverBackgroundColor: ['#b28906', '#2a9ae2', '#06b5a6', '#018fbd', '#015e7d'],
      hoverBorderColor: "rgba(234, 236, 244, 0.5)",
      borderWidth:0,
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255,1)",
      bodyFontColor: "#858796",
      borderColor: '#0077c3',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 60,
  },
});
