$(document).ready(function() {
    getEnergyLogsTodaysHourlyConsumption(function(result) {
        console.log(JSON.stringify(result));

        var dataPoints = [];
        result.forEach(element => {
            dataPoints.push({ x: new Date(element.Hour), y: element.kWh });
        });
        var chart = buildEnergyChart("energyTodaysHourlyConsumption", 
                                     "Hourly Consumption", 
                                     "Time", 
                                     "kWh", 
                                     dataPoints);
        chart.render();
    });

    getWeatherLogsTodaysLogs(function(result) {
        console.log(JSON.stringify(result));

        var dataPoints = [];
        result.forEach(element => {
            dataPoints.push({x: new Date(element.Timestamp), y: element.TemperatureFahrenheit});
        });
        var chart = buildWeatherChart("weatherTodaysLogs", "Weather", "Time", "°F", dataPoints);
        chart.render();
    });
});
