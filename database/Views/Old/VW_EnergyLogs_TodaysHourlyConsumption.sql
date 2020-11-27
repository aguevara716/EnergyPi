DROP VIEW IF EXISTS VW_EnergyLogs_TodaysHourlyConsumption;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_TodaysHourlyConsumption
AS
SELECT
	DATE_FORMAT(`Timestamp`, '%Y-%m-%d %H:00') AS `Hour`,
	SUM(Delta) AS kWh,
	COUNT(*) AS DataPoints
FROM
	EnergyLogs
WHERE
	`Timestamp` >= CURDATE() AND
	`Timestamp` < DATE_ADD(CURDATE(), INTERVAL 1 DAY)
GROUP BY
	`HOUR`;
    