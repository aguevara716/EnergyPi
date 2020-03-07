$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "/EnergyLogs/getTodaysHourlyConsumption",
        success: function(result) {
            console.log(JSON.stringify(result));
            var dataPoints = [];
            result.forEach(element => {
                dataPoints.push({ x: new Date(element.Hour), y: element.kWh });
            });
            var chart = new CanvasJS.Chart("chartContainer", {
                title: {
                    text: "Today's Hourly Consumption"
                },
                axisX: {
                    includeZero: false,
                    title: "Time",
                    gridThickness: 1
                },
                axisY: {
                    includeZero: true,
                    title: "kWh",
                    gridThickness: 1
                },
                data: [
                    {
                        type: "line",
                        xValueFormatString: "HH:mm",
                        yValueFormatString: "##.## kWh",
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();
        }
    });
});