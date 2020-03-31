module.exports = {
    getHomePage: (req, res) => {
        res.render("index.ejs", {
            title: "Welcome to Energy Pi"
        });
    },
    getDayResultsPage: (req, res) => {
        res.render("day.ejs", {
            title: "Readings by day"
        });
    },
    getWeeklyResultsPage: (req, res) => {
        res.render("weekly.ejs", {
            title: "Readings by week"
        });
    },
    getMonthlyResultsPage: (req, res) => {
        res.render("monthly.ejs", {
            title: "Readings by month"
        });
    },
    getYearlyResultsPage: (req, res) => {
        res.render("yearly.ejs", {
            title: "Readings by year"
        })
    },
    getCustomViewPage: (req, res) => {
        res.render("custom_view.ejs", {
            title: "Custom View Data"
        })
    }
};