DROP VIEW IF EXISTS VW_EnergyLogs_CumulativeDailyConsumption

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_CumulativeDailyConsumption
AS
(
    WITH DailyConsumption AS
    (
        SELECT
            DATE(`Timestamp`) AS `Date`,
            SUM(Delta) AS Consumption,
            COUNT(0) AS `DataPoints`
        FROM
            EnergyLogs
        GROUP BY
            `Date`
    )
    SELECT
        `Date`,
        Consumption,
        SUM(Consumption) OVER (ORDER BY `Date`) AS CumulativeConsumption,
        `DataPoints`
    FROM
        `DailyConsumption`
)
