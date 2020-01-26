DROP TABLE IF EXISTS WeatherLogs;

CREATE TABLE WeatherLogs
(
    WeatherLogId INT PRIMARY KEY AUTO_INCREMENT,
    `Timestamp` DATETIME NOT NULL,
    TemperatureFahrenheit DECIMAL(5,2),
    Humidity DECIMAL(3,2)
);
