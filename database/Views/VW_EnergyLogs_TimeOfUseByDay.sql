WITH TouConsumption AS
(
    SELECT
        `Timestamp`,
        DATE(`Timestamp`) AS `Date`,
        (
            DATE_FORMAT(`Timestamp`, '%m-%d') >= '06-01' AND 
            DATE_FORMAT(`Timestamp`, '%m-%d') < '10-01' 
        ) AS IsHighSeason,
        (
            HOUR(`Timestamp`) >= 8 AND 
            HOUR(`Timestamp`) < 24 
        ) AS IsPeakHour,
        (
            WEEKDAY(`Timestamp`) < 5 AND 
            HOUR(`Timestamp`) >= 14 AND 
            HOUR(`Timestamp`) <= 18 AND 
            DATE_FORMAT(`Timestamp`, '%m-%d') >= '06-01' AND 
            DATE_FORMAT(`Timestamp`, '%m-%d') < '10-01' 
        ) AS IsSuperPeakHour,
        SUM(Delta) AS Consumption,
        COUNT(0) AS `DataPoints`
    FROM
        EnergyLogs
    GROUP BY
        DATE_FORMAT(`Timestamp`, '%Y-%m'),
        IsHighSeason,
        IsPeakHour,
        IsSuperPeakHour
)
SELECT 
    *
--     `Date`,
--     CASE WHEN IsHighSeason = 0
--         THEN CASE WHEN IsPeakHour = 0
--             THEN 'Off-Peak Low Season'
--             ELSE 'Peak Low Season'
--         END
--         ELSE CASE WHEN IsPeakHour = 0
--             THEN 'Off-Peak High Season'
--             ELSE CASE WHEN IsSuperPeakHour = 0
--                 THEN 'Peak High Season'
--                 ELSE 'Super-Peak High Season'
--             END
--         END
--     END AS 'Period',
--     Consumption,
--     DataPoints
FROM
    TouConsumption
WHERE
    `Timestamp` >= '2020-01-01' and
    `Timestamp` < '2020-11-25'