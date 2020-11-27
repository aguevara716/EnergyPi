DROP VIEW IF EXISTS VW_WeatherLogs_YearlyStats;

CREATE VIEW IF NOT EXISTS VW_WeatherLogs_YearlyStats
AS 
SELECT
    DATE_FORMAT(`Timestamp`, '%Y') AS Year,
    MAX(TemperatureFahrenheit) AS HighestTemperature,
    MIN(TemperatureFahrenheit) AS LowestTemperature,
    AVG(TemperatureFahrenheit) AS AverageTemperature,
    MAX(Humidity) AS HighestHumidity,
    MIN(Humidity) AS LowestHumidity,
    AVG(Humidity) AS AverageHumidity,
    COUNT(*) AS DataPoints
FROM 
    WeatherLogs 
group by 
    DATE_FORMAT(`Timestamp`,'%Y')
ORDER BY
    `Timestamp`;