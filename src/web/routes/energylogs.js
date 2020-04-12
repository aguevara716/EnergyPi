module.exports = {
    executeSqlQuery: (objectName, startDate, endDate) => {
        let query = `SELECT * FROM ${objectName} WHERE Timestamp >= '${startDate}' AND Timestamp < ${endDate}`;
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getDayData: (req, res) => {
        let startDate = new Date(req.body.selectedDate);
        let startDateString = startDate.toISOString().split('T')[0];

        let endDate = new Date(startDate.setDate(startDate.getDate() + 1));
        let endDateString = endDate.toISOString().split('T')[0];

        let graphType = req.body.selectedGraphType;
        var table = "";
        if (graphType === "raw")
            table = "EnergyLogs";
        else if (graphType === "hourly")
            table = "VW_EnergyLogs_HourlyLogs"
        else if (graphType === "tou")
            table = ""

        let query = `SELECT * FROM ${table} WHERE Timestamp >= '${startDateString}' AND Timestamp < '${endDateString}'`;
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getHourlyLogs: (req, res) => {
        let startDate = new Date(req.body.startDate);
        let startDateString = startDate.toISOString().split('T')[0];
        let endDate = new Date(req.body.endDate);
        let endDateString = endDate.toISOString().split('T')[0];
        let query = `SELECT * FROM VW_EnergyLogs_HourlyLogs WHERE Timestamp >= '${startDateString}' AND Timestamp < '${endDateString}'`;
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    },
    getDailyLogs: (req, res) => {
        let startDate = new Date(req.body.startDate);
        let startDateString = startDate.toISOString().split('T')[0];
        let endDate = new Date(req.body.endDate);
        let endDateString = endDate.toISOString().split('T')[0];
        let objectName = "VW_EnergyLogs_DailyLogs";
        this.executeSqlQuery(objectName, startDateString, endDateString);
        let query = `SELECT * FROM VW_EnergyLogs_DailyLogs WHERE Timestamp >= '${startDateString}' AND Timestamp < '${endDateString}'`;
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });
    }
    // TODO get monthly, get yearly
};