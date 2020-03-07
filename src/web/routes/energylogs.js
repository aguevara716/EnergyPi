module.exports = {
    getCurrentMonthLogs: (req, res) => {
        let query = "SELECT * FROM VW_EnergyLogs_CurrentMonthLogs";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getCurrentWeekConsumption: (req, res) => {
        let query = "SELECT * FROM VW_EnergyLogs_CurrentWeekConsumption";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getCurrentWeekLogs: (req, res) => {
        let query = "SELECT * FROM VW_EnergyLogs_CurrentWeekLogs";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getDailyConsumption: (req, res) => {
        let query = "SELECT * FROM VW_EnergyLogs_DailyConsumption";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getHourlyConsumption: (req, res) => {
        let query = "SELECT * FROM VW_EnergyLogs_HourlyConsumption";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getMonthlyConsumption: (req, res) => {
        let query = "SELECT * FROM VW_EnergyLogs_MonthlyConsumption";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getPreviousWeekConsumption: (req, res) => {
        let query = "SELECT * FROM VW_EnergyLogs_PreviousWeekConsumption";
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getPreviousWeekLogs: (req, res) => {
        let query = "SELECT * FROM VW_EnergyLogs_PreviousWeekLogs";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getTodaysHourlyConsumption: (req, res) => {
        let query = "SELECT * FROM VW_EnergyLogs_TodaysHourlyConsumption";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getTodaysLogs: (req, res) => {
        let query = "SELECT * FROM VW_EnergyLogs_TodaysLogs";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getYearlyConsumption: (req, res) => {
        let query = "SELECT * FROM VW_EnergyLogs_YearlyConsumption";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    }
};