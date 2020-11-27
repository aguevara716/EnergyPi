DROP VIEW IF EXISTS VW_WeatherLogs_TodaysLogs;

CREATE VIEW IF NOT EXISTS VW_WeatherLogs_TodaysLogs
AS 
SELECT
    *
FROM
    WeatherLogs
WHERE
    `Timestamp` >= CURDATE() and 
    `Timestamp` < DATE_ADD(CURDATE(), INTERVAL 1 DAY)
ORDER BY
    `Timestamp`;