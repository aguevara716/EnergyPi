DROP VIEW IF EXISTS VW_WeatherLogs_MonthlyStats;

CREATE VIEW IF NOT EXISTS VW_WeatherLogs_MonthlyStats
AS 
SELECT 
     DATE_FORMAT(`Timestamp`,'%Y-%m') AS Month,
    MAX(TemperatureFahrenheit) AS HighestTemperature,
    MIN(TemperatureFahrenheit) AS LowestTemperature,
    AVG(TemperatureFahrenheit) AS AverageTemperature,
    MAX(Humidity) AS HighestHumidity,
    MIN(Humidity) AS LowestHumidity,
    AVG(Humidity) AS AverageHumidity,
    COUNT(*) AS DataPoints
FROM 
    WeatherLogs 
GROUP BY
    DATE_FORMAT(`Timestamp`,'%Y-%m')
ORDER BY
    `Timestamp`;