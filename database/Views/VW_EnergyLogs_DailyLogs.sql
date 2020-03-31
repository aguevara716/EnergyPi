DROP VIEW IF EXISTS VW_EnergyLogs_DailyLogs;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_DailyLogs
AS
SELECT
	DATE_FORMAT(`Timestamp`, '%Y-%m-%d') AS `Timestamp`,
	SUM(Delta) AS kWh,
	COUNT(*) AS DataPoints
FROM
	EnergyLogs
GROUP BY
	DATE_FORMAT(`Timestamp`, '%Y-%m-%d')
ORDER BY
	DATE_FORMAT(`Timestamp`, '%Y-%m-%d');