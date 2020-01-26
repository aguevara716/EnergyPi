DROP VIEW IF EXISTS VW_EnergyLogs_HourlyConsumption;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_HourlyConsumption
AS
SELECT
    DATE_FORMAT(`Timestamp`, '%Y-%m-%d %H:00') AS `Timestamp`,
    SUM(Delta) AS `kWh`,
    COUNT(*) AS `DataPoints`
FROM
    EnergyLogs
GROUP BY
    HOUR(`TIMESTAMP`)
ORDER BY
    `TIMESTAMP`;