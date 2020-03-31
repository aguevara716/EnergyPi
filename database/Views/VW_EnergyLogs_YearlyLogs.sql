DROP VIEW IF EXISTS VW_EnergyLogs_YearlyLogs;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_YearlyLogs
AS
SELECT
	DATE_FORMAT(`Timestamp`, '%Y') AS `Timestamp`,
	SUM(Delta) AS kWh,
	COUNT(*) AS DataPoints
FROM
	EnergyLogs
GROUP BY
	DATE_FORMAT(`Timestamp`, '%Y')
ORDER BY
	DATE_FORMAT(`Timestamp`, '%Y');