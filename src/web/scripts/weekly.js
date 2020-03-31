$(document).ready(function() {
    //energyCurrentWeeksConsumption
    getEnergyLogsCurrentWeekConsumption(function(result) {
        console.log(`Energy - Current Week's Consumption\n${JSON.stringify(result)}`);

        var dataPoints = [];
        result.forEach(element => {
            dataPoints.push({x: new Date(element.Date), y: element.kWh});
        });
        var chart = buildEnergyChart("energyCurrentWeeksConsumption",
                                     "Current Week's Consumption",
                                     "Date",
                                     "kWh",
                                     dataPoints);
        chart.options.data[0].xValueFormatString = "YYYY-MM-DD";
        console.log(JSON.stringify(chart));
        chart.render();
    });

    //energyCurrentWeeksLogs
    getEnergyLogsCurrentWeekLogs(function(result) {
        console.log(`Energy - Current Week's Logs\n${JSON.stringify(result)}`);
    });

    //energyPreviousWeeksConsumption
    getEnergyLogsPreviousWeekConsumption(function(result) {
        console.log(`Energy - Previous Week's Consumption\n${JSON.stringify(result)}`);
    });

    //energyPreviousWeeksLogs
    getEnergyLogsPreviousWeekLogs(function(result) {
        console.log(`Energy - Previous Week's Logs\n${JSON.stringify(result)}`);
    });

    //weatherCurrentWeeksLogs
    //weatherCurrentWeeksStats
    //weatherPreviousWeeksLogs
    //weatherPreviousWeekStats
});
