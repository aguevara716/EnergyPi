CREATE OR REPLACE VIEW VW_EnergyLogs_CurrentWeekConsumption
AS
SELECT
	*
FROM
	VW_EnergyLogs_DailyConsumption
WHERE
	`Date` >= FIRST_DAY_OF_WEEK(CURDATE()) AND
	`Date` < FIRST_DAY_OF_NEXT_WEEK(CURDATE());