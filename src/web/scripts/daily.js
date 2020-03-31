$(document).ready(function() {
    var today = new Date().toISOString().split('T')[0];
    $("#date-input").val(today);
    loadDailyData(today);

    $("#submit-btn").on("click", function() {
        var selectedDate = $("#date-input").val();
        loadDailyData(selectedDate);
    });
});

function loadDailyData(selectedDate) {
    console.log(`Loading data for ${selectedDate}`);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            selectedDate: selectedDate
        }),
        url: "/EnergyLogs/getDailyData",
        success: function(result) {
            console.log(JSON.stringify(result));
            var dataPoints = [];
            result.forEach(element => {
                dataPoints.push({ x: new Date(element.Timestamp), y: element.Delta });
            });
            var chart = buildEnergyChart("daily-energy-chart",
                                         "Day's Energy Consumption",
                                         "Timestamp",
                                         "kWh",
                                         dataPoints);
            chart.render();
        }
    });
    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            selectedDate: selectedDate
        }),
        url: "/WeatherLogs/getDailyData",
        success: function(result) {
            console.log(JSON.stringify(result));
            var dataPoints = [];
            result.forEach(element => {
                dataPoints.push({ x: new Date(element.Timestamp), y: element.TemperatureFahrenheit });
            });
            var chart = buildWeatherChart("daily-weather-chart",
                                          "Day's Weather",
                                          "Timestamp",
                                          "Temperature",
                                          dataPoints);
            chart.render();
        }
    });
}