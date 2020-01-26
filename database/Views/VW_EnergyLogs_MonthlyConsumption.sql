DROP VIEW IF EXISTS VW_EnergyLogs_MonthlyConsumption;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_MonthlyConsumption
AS
SELECT
   DATE_FORMAT(`Timestamp`, '%Y-%m') AS `Month`,
   SUM(`Delta`) AS `kWh`,
   COUNT(*) AS `DataPoints`
FROM 
    `EnergyLogs` 
GROUP BY 
    'Month'
ORDER BY
    `Timestamp`;