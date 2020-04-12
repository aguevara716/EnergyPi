DROP VIEW IF EXISTS VW_EnergyLogs_HourlyLogs;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_HourlyLogs
AS
SELECT
	STR_TO_DATE(DATE_FORMAT(`Timestamp`, '%Y-%m-%d %H:00'), '%Y-%m-%d %H:00') AS `Timestamp`,
	SUM(Delta) AS kWh,
	COUNT(*) AS DataPoints
FROM
	EnergyLogs
GROUP BY
	DATE_FORMAT(`Timestamp`, '%Y-%m-%d %H:00')
ORDER BY
	DATE_FORMAT(`Timestamp`, '%Y-%m-%d %H:00');