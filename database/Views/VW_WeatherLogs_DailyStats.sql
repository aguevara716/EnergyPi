DROP VIEW IF EXISTS VW_WeatherLogs_DailyStats;

CREATE VIEW IF NOT EXISTS VW_WeatherLogs_DailyStats
AS 
SELECT
    DATE_FORMAT(`Timestamp`,'%Y-%m-%d') AS `Date`,
    MAX(TemperatureFahrenheit) AS HighestTemperature,
    MIN(TemperatureFahrenheit) AS LowestTemperature,
    AVG(TemperatureFahrenheit) AS AverageTemperature,
    MAX(Humidity) AS HighestHumidity,
    MIN(Humidity) AS LowestHuidity,
    AVG(Humidity) AS AverageHumidity,
    COUNT(*) AS DataPoints
FROM
    WeatherLogs
GROUP BY
    DATE_FORMAT(`Timestamp`,'%Y-%m-%d') 
ORDER BY 
    DATE_FORMAT(`Timestamp`,'%Y-%m-%d');