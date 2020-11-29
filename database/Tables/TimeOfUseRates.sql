DROP TABLE IF EXISTS TimeOfUseRates;

CREATE TABLE TimeOfUseRates
(
    TimeOfUseRateId INT PRIMARY KEY AUTO_INCREMENT,
    EffectiveDate DATETIME NOT NULL,
    `Name` VARCHAR(200) NOT NULL,
    AffectsWeekdays BIT NOT NULL,
    AffectsWeekends BIT NOT NULL,

    MonthStart INT NOT NULL,
    DayStart INT NOT NULL,
    HourStart INT NOT NULL,
    MinuteStart INT NOT NULL,

    MonthEnd INT NOT NULL,
    DayEnd INT NOT NULL,
    HourEnd INT NOT NULL,
    MinuteEnd INT NOT NULL,

    Rate DECIMAL(6,5)
);

-- off-peak low season (1-01 - 5-31, 0:00 - 7:59, $0.0155)
INSERT INTO TimeOfUseRates
(
    EffectiveDate,
    `Name`,
    AffectsWeekdays,
    AffectsWeekends,
    MonthStart,
    DayStart,
    HourStart,
    MinuteStart,
    MonthEnd,
    DayEnd,
    HourEnd,
    MinuteEnd,
    Rate
)
VALUES
(
    '2020-01-01', -- EffectiveDate,
    'Off-peak low season', -- `Name`,
    1, -- AffectsWeekdays,
    1, -- AffectsWeekends,
    1, -- MonthStart,
    1, -- DayStart,
    0, -- HourStart,
    0, -- MinuteStart,
    5, -- MonthEnd,
    31, -- DayEnd,
    7, -- HourEnd,
    59, -- MinuteEnd,
    0.0155 -- Rate
);
-- peak low season (1-01 - 5-31, 8:00 - 23:59, $0.08130)
INSERT INTO TimeOfUseRates
(
    EffectiveDate,
    `Name`,
    AffectsWeekdays,
    AffectsWeekends,
    MonthStart,
    DayStart,
    HourStart,
    MinuteStart,
    MonthEnd,
    DayEnd,
    HourEnd,
    MinuteEnd,
    Rate
)
VALUES
(
    '2020-01-01', -- EffectiveDate,
    'Peak low season', -- `Name`,
    1, -- AffectsWeekdays,
    1, -- AffectsWeekends,
    1, -- MonthStart,
    1, -- DayStart,
    8, -- HourStart,
    0, -- MinuteStart,
    5, -- MonthEnd,
    31, -- DayEnd,
    23, -- HourEnd,
    59, -- MinuteEnd,
    0.0813 -- Rate
);

-- off-peak high season (6-01 - 9-30, 0:00 - 7:59, $0.0155)
INSERT INTO TimeOfUseRates
(
    EffectiveDate,
    `Name`,
    AffectsWeekdays,
    AffectsWeekends,
    MonthStart,
    DayStart,
    HourStart,
    MinuteStart,
    MonthEnd,
    DayEnd,
    HourEnd,
    MinuteEnd,
    Rate
)
VALUES
(
    '2020-01-01', -- EffectiveDate,
    'Off-peak high season', -- `Name`,
    1, -- AffectsWeekdays,
    1, -- AffectsWeekends,
    6, -- MonthStart,
    1, -- DayStart,
    0, -- HourStart,
    0, -- MinuteStart,
    9, -- MonthEnd,
    30, -- DayEnd,
    7, -- HourEnd,
    59, -- MinuteEnd,
    0.0155 -- Rate
);
-- peak high season (6-01 - 9-30, 8:00 - 23:59, $0.2197)
INSERT INTO TimeOfUseRates
(
    EffectiveDate,
    `Name`,
    AffectsWeekdays,
    AffectsWeekends,
    MonthStart,
    DayStart,
    HourStart,
    MinuteStart,
    MonthEnd,
    DayEnd,
    HourEnd,
    MinuteEnd,
    Rate
)
VALUES
(
    '2020-01-01', -- EffectiveDate,
    'Peak high season', -- `Name`,
    1, -- AffectsWeekdays,
    1, -- AffectsWeekends,
    6, -- MonthStart,
    1, -- DayStart,
    8, -- HourStart,
    0, -- MinuteStart,
    9, -- MonthEnd,
    30, -- DayEnd,
    23, -- HourEnd,
    59, -- MinuteEnd,
    0.2197 -- Rate
);
-- super-peak high season (6-01 - 9-30, weekdays, 14:00 - 17:59, $0.2197)
INSERT INTO TimeOfUseRates
(
    EffectiveDate,
    `Name`,
    AffectsWeekdays,
    AffectsWeekends,
    MonthStart,
    DayStart,
    HourStart,
    MinuteStart,
    MonthEnd,
    DayEnd,
    HourEnd,
    MinuteEnd,
    Rate
)
VALUES
(
    '2020-01-01', -- EffectiveDate,
    'Super-peak high season', -- `Name`,
    1, -- AffectsWeekdays,
    0, -- AffectsWeekends,
    6, -- MonthStart,
    1, -- DayStart,
    14, -- HourStart,
    0, -- MinuteStart,
    9, -- MonthEnd,
    30, -- DayEnd,
    17, -- HourEnd,
    59, -- MinuteEnd,
    0.2197 -- Rate
);

-- off-peak low season (10-01 - 12-31, 0:00 - 7:59, $0.0155)
INSERT INTO TimeOfUseRates
(
    EffectiveDate,
    `Name`,
    AffectsWeekdays,
    AffectsWeekends,
    MonthStart,
    DayStart,
    HourStart,
    MinuteStart,
    MonthEnd,
    DayEnd,
    HourEnd,
    MinuteEnd,
    Rate
)
VALUES
(
    '2020-01-01', -- EffectiveDate,
    'Off-peak low season', -- `Name`,
    1, -- AffectsWeekdays,
    1, -- AffectsWeekends,
    10, -- MonthStart,
    1, -- DayStart,
    0, -- HourStart,
    0, -- MinuteStart,
    12, -- MonthEnd,
    31, -- DayEnd,
    7, -- HourEnd,
    59, -- MinuteEnd,
    0.0155 -- Rate
);
-- peak low season (10-01 - 12-31, 8:00 - 23:59, $0.08130)
INSERT INTO TimeOfUseRates
(
    EffectiveDate,
    `Name`,
    AffectsWeekdays,
    AffectsWeekends,
    MonthStart,
    DayStart,
    HourStart,
    MinuteStart,
    MonthEnd,
    DayEnd,
    HourEnd,
    MinuteEnd,
    Rate
)
VALUES
(
    '2020-01-01', -- EffectiveDate,
    'Peak low season', -- `Name`,
    1, -- AffectsWeekdays,
    1, -- AffectsWeekends,
    10, -- MonthStart,
    1, -- DayStart,
    8, -- HourStart,
    0, -- MinuteStart,
    12, -- MonthEnd,
    31, -- DayEnd,
    23, -- HourEnd,
    59, -- MinuteEnd,
    0.0813 -- Rate
);