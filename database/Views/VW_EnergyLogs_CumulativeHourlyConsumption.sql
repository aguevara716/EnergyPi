DROP VIEW IF EXISTS VW_EnergyLogs_CumulativeHourlyConsumption;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_CumulativeHourlyConsumption
AS
(
    WITH HourlyConsumption AS
    (
        SELECT
            DATE(`Timestamp`) AS `Date`,
            DATE_FORMAT(`Timestamp`, '%Y-%m-%d %H:00') AS `Hour`,
            SUM(Delta) AS Consumption,
            COUNT(0) AS `DataPoints`
        FROM
            EnergyLogs
        GROUP BY
            `Hour`
    )
    SELECT
        `Date`,
        `Hour` AS TimeStart,
        DATE_FORMAT(DATE_ADD(`Hour`, INTERVAL 1 HOUR), '%Y-%m-%d %H:00') AS TimeEnd,
        Consumption,
        SUM(Consumption) OVER (ORDER BY `Hour`) AS CumulativeConsumption,
        `DataPoints`
    FROM
        `HourlyConsumption`
)
