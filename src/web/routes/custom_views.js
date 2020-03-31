module.exports = {
    getCustomViewData: (req, res) => {
        console.log("Body: " + JSON.stringify(req.body));

        let view = req.body.view;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        let query = `SELECT * FROM ${view} WHERE Timestamp >= '${startDate}' AND Timestamp <= '${endDate}'`;
        console.log(`Executing query: ${query}`);
        db.query(query, (err, result) => {
            if (err) throw err;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        });

    }
};
