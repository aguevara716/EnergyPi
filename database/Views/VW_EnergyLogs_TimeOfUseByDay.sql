DROP VIEW IF EXISTS VW_EnergyLogs_TimeOfUseByDay;

CREATE VIEW IF NOT EXISTS VW_EnergyLogs_TimeOfUseByDay
AS
(
    SELECT
        `Timestamp`,
        DATE(`Timestamp`) AS `Date`,
        
        @isHighSeason := (
            -- High season = Jun 1 to Oct 1
            DATE_FORMAT(`Timestamp`, '%m-%d') >= '06-01' AND 
            DATE_FORMAT(`Timestamp`, '%m-%d') < '10-01' 
        ) AS IsHighSeason,
        
        @isSuperPeakHour := (
            -- Super peak hours = weekdays from 1400 to 1800 during high season
            WEEKDAY(`Timestamp`) < 5 AND 
            HOUR(`Timestamp`) >= 14 AND 
            HOUR(`Timestamp`) < 18 AND 
            @isHighSeason = 1
        ) AS IsSuperPeakHour,
        
        @isPeakHour := (
            -- Peak hours = 0800 to 2359, excluding weekdays from 1400 to 1800 during high season
            HOUR(`Timestamp`) >= 8 AND 
            HOUR(`Timestamp`) < 24 AND
            @isSuperPeakHour = 0
        ) AS IsPeakHour,
        
        CASE WHEN @isHighSeason = 0 AND @isPeakHour = 0 AND @isSuperPeakHour = 0
            THEN 'Off-peak low season'
            ELSE CASE WHEN @isHighSeason = 0 AND @isPeakHour = 1 AND @isSuperPeakHour = 0
                THEN 'Peak low season'
                ELSE CASE WHEN @isHighSeason = 1 AND @isPeakHour = 0 AND @isSuperPeakHour = 0
                    THEN 'Off-peak high season'
                    ELSE CASE WHEN @isHighSeason = 1 AND @isPeakHour = 1 AND @isSuperPeakHour = 0
                        THEN 'Peak high season'
                        ELSE CASE WHEN @isHighSeason = 1 AND @isPeakHour = 0 AND @isSuperPeakHour = 1
                            THEN 'Super-peak high season'
                            ELSE 'Unkonwn'
                        END
                    END
                END
            END
        END AS RatePeriod,
        
        SUM(Delta) AS Consumption,
        COUNT(0) AS `DataPoints`
    FROM
        EnergyLogs
    GROUP BY
        DATE_FORMAT(`Timestamp`, '%Y-%m-%d %H:00'),
        IsHighSeason,
        IsPeakHour,
        IsSuperPeakHour
)