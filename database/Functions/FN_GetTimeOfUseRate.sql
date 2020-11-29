DROP FUNCTION IF EXISTS FN_GetTimeOfUseRate;

DELIMITER ;;

CREATE FUNCTION FN_GetTimeOfUseRate(`Date` DATETIME)
    RETURNS DECIMAL(6,5)
BEGIN
    SET @dt = '2020-07-16 14:00';
    SET @MONTH = MONTH(@dt);
    SET @DAY = DAY(@dt);
    SET @MINUTE = MINUTE(@dt);
    SET @HOUR = HOUR(@dt);
    SET @isWeekday = FN_IsWeekday(@dt);

    SELECT
        *
    FROM
        TimeOfUseRates
    WHERE
        EffectiveDate <= @dt and
        (
            MonthStart <= @MONTH and
            MonthEnd >= @MONTH
        ) AND
        (
            DayStart <= @DAY and
            DayEnd >= @DAY
        ) AND
        (
            HourStart <= @HOUR AND
            HourEnd >= @HOUR
        ) AND
        (
            MinuteStart <= @MINUTE and
            MinuteEnd >= @MINUTE
        ) AND
        (
            (AffectsWeekdays = 1 AND AffectsWeekends = 1) OR
            (AffectsWeekdays = @isWeekday AND AffectsWeekends = (@isWeekday = 0))
        );

    RETURN @rate;
END;;

DELIMITER ;