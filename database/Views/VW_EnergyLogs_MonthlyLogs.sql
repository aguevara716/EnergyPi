DROP VIEW IF EXISTS VW_EnergyLogs_MonthlyLogs;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_MonthlyLogs
AS
SELECT
	DATE_FORMAT(`Timestamp`, '%Y-%m') AS `Timestamp`,
	SUM(Delta) AS kWh,
	COUNT(*) AS DataPoints
FROM
	EnergyLogs
GROUP BY
	DATE_FORMAT(`Timestamp`, '%Y-%m')
ORDER BY
	DATE_FORMAT(`Timestamp`, '%Y-%m');