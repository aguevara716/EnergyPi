function executeAjaxGet(url, callback) {
    $.ajax({
        type: "GET",
        url: url,
        success: callback
    });
}

/**ENERGY LOGS**/
// Today
function getEnergyLogsTodaysHourlyConsumption(callback) {
    executeAjaxGet("/EnergyLogs/getTodaysHourlyConsumption", callback);
}

function getEnergyLogsTodaysLogs(callback) {
    executeAjaxGet("/EnergyLogs/getTodaysLogs", callback);
}

// Hour
function getEnergyLogsHourlyConsumption(callback) {
    executeAjaxGet("/EnergyLogs/getHourlyConsumption", callback);
}

// Day
function getEnergyLogsDailyConsumption(callback) {
    executeAjaxGet("/EnergyLogs/getDayConsumption", callback);
}

// Week
function getEnergyLogsCurrentWeekConsumption(callback) {
    executeAjaxGet("/EnergyLogs/getCurrentWeekConsumption", callback);
}

function getEnergyLogsCurrentWeekLogs(callback) {
    executeAjaxGet("/EnergyLogs/getCurrentWeekLogs", callback);
}

function getEnergyLogsPreviousWeekConsumption(callback) {
    executeAjaxGet("/EnergyLogs/getPreviousWeekConsumption", callback);
}

function getEnergyLogsPreviousWeekLogs(callback) {
    executeAjaxGet("/EnergyLogs/getPreviousWeekLogs", callback);
}

// Month
function getEnergyLogsMonthlyConsumption(callback) {
    executeAjaxGet("/EnergyLogs/getMothlyConsumption", callback);
}

// Year
function getEnergyLogsYearlyConsumption(callback) {
    executeAjaxGet("/EnergyLogs/getYearlyConsumption", callback);
}

/**WEATHER LOGS**/
// Today
function getWeatherLogsTodaysLogs(callback) {
    executeAjaxGet("/WeatherLogs/getTodaysLogs", callback);
}

// Day
function getWeatherLogsDailyStats(callback) {
    executeAjaxGet("/WeatherLogs/getDayStats", callback);
}

// Week
function getWeatherLogsCurrentWeekLogs(callback) {
    executeAjaxGet("/WeatherLogs/getCurrentWeekLogs", callback);
}

function getWeatherLogsCurrentWeekStats(callback) {
    executeAjaxGet("/WeatherLogs/getCurrentWeekStats", callback);
}

function getWeatherLogsPreviousWeekLogs(callback) {
    executeAjaxGet("/WeatherLogs/getPreviousWeekLogs", callback);
}

function getWeatherLogsPreviousWeekStats(callback) {
    executeAjaxGet("/WeatherLogs/getPreviousWeekStats", callback);
}

// Month
function getWeatherLogsCurrentMonthLogs(callback) {
    executeAjaxGet("/WeatherLogs/getCurrentMonthLogs", callback);
}

function getWeatherLogsMonthlyStats(callback) {
    executeAjaxGet("/WeatherLogs/getMonthlyStats", callback);
}

// Year
function getWeatherLogsYearlyStats(callback) {
    executeAjaxGet("/WeatherLogs/getYearlyStats", callback);
}
