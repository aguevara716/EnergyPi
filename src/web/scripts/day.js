$(document).ready(function() {
    var today = new Date().toISOString().split('T')[0];
    $("#date-input").val(today);
    loadDayData(today);

    $("#submit-btn").on("click", function() {
        var selectedDate = $("#date-input").val();
        loadDayData(selectedDate);
    });
});

function loadDayData(selectedDate) {
    console.log(`Loading data for ${selectedDate}`);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            selectedDate: selectedDate
        }),
        url: "/EnergyLogs/getDayData",
        success: function(result) {
            console.log(JSON.stringify(result));
            var dataPoints = [];
            result.forEach(element => {
                dataPoints.push({ x: new Date(element.Timestamp), y: element.Delta });
            });
            var chart = buildEnergyChart("daily-energy-chart",
                                         "Energy Consumption",
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
        url: "/WeatherLogs/getDayData",
        success: function(result) {
            console.log(JSON.stringify(result));
            var dataPoints = [];
            result.forEach(element => {
                dataPoints.push({ x: new Date(element.Timestamp), y: element.TemperatureFahrenheit });
            });
            var chart = buildWeatherChart("daily-weather-chart",
                                          "Weather",
                                          "Timestamp",
                                          "Temperature",
                                          dataPoints);
            chart.render();
        }
    });
}