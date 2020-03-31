module.exports = {
    getDailyData: (req, res) => {
        let startDate = new Date(req.body.selectedDate);
        let startDateString = startDate.toISOString().split('T')[0];
        let endDate = new Date(startDate.setDate(startDate.getDate() + 1));
        let endDateString = endDate.toISOString().split('T')[0];
        let query = `SELECT * FROM WeatherLogs WHERE Timestamp >= '${startDateString}' AND Timestamp <= '${endDateString}'`;
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        })
    },
    getCurrentMonthLogs: (req, res) => {
        let query = "SELECT * FROM VW_WeatherLogs_CurrentMonthLogs";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getCurrentWeekLogs: (req, res) => {
        let query = "SELECT * FROM VW_WeatherLogs_CurrentWeekLogs";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getCurrentWeekStats: (req, res) => {
        let query = "SELECT * FROM VW_WeatherLogs_CurrentWeekStats";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getDailyStats: (req, res) => {
        let query = "SELECT * FROM VW_WeatherLogs_DailyStats";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getMonthlyStats: (req, res) => {
        let query = "SELECT * FROM VW_WeatherLogs_MonthlyStats";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getPreviousWeekLogs: (req, res) => {
        let query = "SELECT * FROM VW_WeatherLogs_PreviousWeekLogs";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getPreviousWeekStats: (req, res) => {
        let query = "SELECT * FROM VW_WeatherLogs_PreviousWeekStats";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getTodaysLogs: (req, res) => {
        let query = "SELECT * FROM VW_WeatherLogs_TodaysLogs";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getYearlyStats: (req, res) => {
        let query = "SELECT * FROM VW_WeatherLogs_YearlyStats";
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    }
};