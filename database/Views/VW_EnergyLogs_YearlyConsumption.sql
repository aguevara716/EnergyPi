DROP VIEW IF EXISTS VW_EnergyLogs_YearlyConsumption;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_YearlyConsumption
AS 
SELECT
   DATE_FORMAT(`Timestamp`,'%Y') AS `Year`,
   SUM(Delta) AS `kWh`,
   COUNT(*) AS `DataPoints`
FROM 
    EnergyLogs
GROUP BY 
    `Year`
ORDER BY
    `Timestamp`;