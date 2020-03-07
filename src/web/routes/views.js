module.exports = {
    getHomePage: (req, res) => {
        res.render("index.ejs", {
            title: "Welcome to Energy Pi"
        });
    },
    getTodayPage: (req, res) => {
        res.render("today.ejs", {
            title: "Today's Readings"
        });
    },
    getWeekPage: (req, res) => {
        res.render("week.ejs", {
            title: "This week's readings"
        });
    },
    getMonthPage: (req, res) => {
        res.render("month.ejs", {
            title: "This month's readings"
        });
    },
    getYearPage: (req, res) => {
        res.render("year.ejs", {
            title: "This year's readings"
        })
    }
};