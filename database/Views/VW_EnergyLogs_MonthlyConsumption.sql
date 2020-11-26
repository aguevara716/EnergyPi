DROP VIEW IF EXISTS VW_EnergyLogs_MonthlyConsumption;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_MonthlyConsumption
AS
(
    WITH MonthlyConsumption AS
    (
        SELECT
            DATE_FORMAT(`Timestamp`, '%Y-%m-01') AS `Month`,
            SUM(Delta) AS kWh,
            COUNT(0) AS DataPoints
        FROM
            EnergyLogs
        GROUP BY
            `Month`
    )
    SELECT
        `Month`,
        DataPoints,
        kWh,
        CASE WHEN kWh <= 250
            THEN kWh * 0.11125
            ELSE ((250 * 0.11125) + ((kWh - 250) * 0.21788))
        END AS 'Cost'
    FROM
        MonthlyConsumption
    ORDER BY
        `Month`
)