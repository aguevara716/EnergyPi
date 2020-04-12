$(document).ready(function() {
    var today = new Date().toISOString().split('T')[0];
    $("#date-input").val(today);
    var selectedGraphType = $("#graph-type-select").val();
    loadDayData(today, selectedGraphType);

    $("#submit-btn").on("click", function() {
        var selectedDate = $("#date-input").val();
        var selectedGraphType = $("#graph-type-select").val();
        loadDayData(selectedDate, selectedGraphType);
    });
});

function loadDayData(selectedDate, selectedGraphType) {
    console.log(`Loading ${selectedGraphType} data for ${selectedDate}`);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            selectedDate: selectedDate,
            selectedGraphType: selectedGraphType
        }),
        url: "/EnergyLogs/getDayData",
        success: function(result) {
            console.log(JSON.stringify(result));
            var dataPoints = populateDataPoints(result, selectedGraphType);
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