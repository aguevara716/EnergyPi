DROP TABLE IF EXISTS StandardRate;

CREATE TABLE StandardRate
(
    StandardRateId INT PRIMARY KEY AUTO_INCREMENT,
    EffectiveDate DATETIME,
    Threshold DECIMAL(5,2),
    LowRate DECIMAL(6,5),
    HighRate DECIMAL(6,5)
);

INSERT INTO StandardRate
(
    EffectiveDate,
    Threshold,
    LowRate,
    HighRate
)
VALUES
(
    '2020-01-01 0:00', -- EffectiveDate
    250.00, -- Threshold
    0.11125, -- LowRate
    0.21788 -- HighRate
);