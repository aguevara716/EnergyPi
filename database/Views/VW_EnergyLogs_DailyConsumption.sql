DROP VIEW IF EXISTS VW_EnergyLogs_DailyConsumption;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_DailyConsumption
AS
SELECT
    DATE_FORMAT(`Timestamp`, '%Y-%m-%d') AS `Date`,
    SUM(Delta) AS `kWh`,
    COUNT(*) AS `DataPoints`
FROM
    EnergyLogs
GROUP BY
    DAYOFMONTH(`Timestamp`)
ORDER BY
    `Date`;