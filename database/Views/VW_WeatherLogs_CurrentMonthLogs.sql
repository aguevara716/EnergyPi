DROP VIEW IF EXISTS VW_WeatherLogs_CurrentMonthLogs;

CREATE VIEW IF NOT EXISTS VW_WeatherLogs_CurrentMonthLogs
AS 
SELECT
   *
FROM 
    WeatherLogs
where 
    `Timestamp` >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND 
    `Timestamp` < DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH),'%Y-%m-01')
ORDER BY
    `Timestamp`;