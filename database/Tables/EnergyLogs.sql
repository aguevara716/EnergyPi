DROP TABLE IF EXISTS EnergyLogs;

CREATE TABLE EnergyLogs
(
    EnergyLogId INT PRIMARY KEY AUTO_INCREMENT,
    `Timestamp` DATETIME NOT NULL,
    TotalConsumption DECIMAL(12,2),
    Delta DECIMAL(12,2),
    PowerDraw DECIMAL(12,2),
    MeterBroadcast VARCHAR(250)
);
