const express = require("express");
const mysql = require("mysql");
const app = express();
const port = process.env.PORT || 3000;

const views = require("./routes/views");
const energyLogs = require("./routes/energylogs");
const weatherLogs = require("./routes/weatherlogs");

const db = mysql.createConnection({
    host: "serverpi.local",
    user: "energypi",
    password: "energy",
    database: "energypi"
});

db.connect((err) => {
    if (err) throw err;
    console.log(`Connected to database ${global.db.database}`);
});
global.db = db;

// Configuration
app.use(express.static("scripts"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// UI
app.get("/", views.getHomePage);
app.get("/today", views.getTodayPage);
app.get("/week", views.getWeekPage);
app.get("/month", views.getMonthPage);
app.get("/year", views.getYearPage);

// EnergyLogs
app.get("/EnergyLogs/getCurrentMonthLogs", energyLogs.getCurrentMonthLogs);
app.get("/EnergyLogs/getCurrentWeekConsumption", energyLogs.getCurrentWeekConsumption);
app.get("/EnergyLogs/getCurrentWeekLogs", energyLogs.getCurrentWeekLogs);
app.get("/EnergyLogs/getDailyConsumption", energyLogs.getDailyConsumption);
app.get("/EnergyLogs/getHourlyConsumption", energyLogs.getHourlyConsumption);
app.get("/EnergyLogs/getMonthlyConsumption", energyLogs.getMonthlyConsumption);
app.get("/EnergyLogs/getPreviousWeekConsumption", energyLogs.getPreviousWeekConsumption);
app.get("/EnergyLogs/getPreviousWeekLogs", energyLogs.getPreviousWeekLogs);
app.get("/EnergyLogs/getTodaysHourlyConsumption", energyLogs.getTodaysHourlyConsumption);
app.get("/EnergyLogs/getTodaysLogs", energyLogs.getTodaysLogs);
app.get("/EnergyLogs/getYearlyConsumption", energyLogs.getYearlyConsumption);

// WeatherLogs
app.get("/WeatherLogs/getCurrentMonthLogs", weatherLogs.getCurrentMonthLogs);
app.get("/WeatherLogs/getCurrentWeekLogs", weatherLogs.getCurrentWeekLogs);
app.get("/WeatherLogs/getCurrentWeekStats", weatherLogs.getCurrentWeekStats);
app.get("/WeatherLogs/getDailyStats", weatherLogs.getDailyStats);
app.get("/WeatherLogs/getMonthlyStats", weatherLogs.getMonthlyStats);
app.get("/WeatherLogs/getPreviousWeekLogs", weatherLogs.getPreviousWeekLogs);
app.get("/WeatherLogs/getPreviousWeekStats", weatherLogs.getPreviousWeekStats);
app.get("/WeatherLogs/getTodaysLogs", weatherLogs.getTodaysLogs);
app.get("/WeatherLogs/getYearlyStats", weatherLogs.getYearlyStats);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
