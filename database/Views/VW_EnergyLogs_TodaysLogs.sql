DROP VIEW IF EXISTS VW_EnergyLogs_TodaysLogs;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_TodaysLogs
AS 
SELECT
   *
FROM 
    EnergyLogs
where 
    `Timestamp` >= CURDATE() and 
    `Timestamp` < DATE_ADD(CURDATE(), INTERVAL 1 DAY)
ORDER BY
    `Timestamp`;