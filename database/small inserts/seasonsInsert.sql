DROP PROCEDURE IF EXISTS insertSeason;

CREATE PROCEDURE insertSeason(IN _name VARCHAR(45), IN _startDate DATE, IN _endDate DATE,
                                  IN _advisory TEXT, IN _userEmail VARCHAR(45))
BEGIN
    DECLARE _hotelId INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;

    START TRANSACTION;

    SELECT MAX(e.HotelID)
    INTO _hotelId
    FROM employee e
    WHERE e.UserEmail = _userEmail;

    IF _hotelId IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access error, you do not work in any hotel';
    end if;

    IF _endDate <= _startDate THEN
        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = 'End date should be later than start date';
    end if;

    INSERT INTO season
        (Name, StartDate, EndDate)
    VALUES (_name, _startDate, _endDate);

    INSERT INTO hotel_works_during_season
        (HotelID, SeasonID, Advisory)
    VALUES (_hotelId, LAST_INSERT_ID(), _advisory);
    COMMIT;
END;

DROP PROCEDURE IF EXISTS insertSeasonWeekDay;

CREATE PROCEDURE insertSeasonWeekDay(IN _seasonId INT, IN _userEmail VARCHAR(45), IN _dayOfWeek VARCHAR(15),
                                  IN _coefficient FLOAT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;

    START TRANSACTION;

    SELECT MAX(S.SeasonID)
    INTO _seasonId
    FROM season S
             INNER JOIN hotel_works_during_season hwds ON S.SeasonID = hwds.SeasonID
             INNER JOIN employee e ON e.HotelID = hwds.HotelID AND e.UserEmail = _userEmail
    WHERE S.SeasonID = _seasonId;

    IF _seasonId IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access error, trying to edit season from another hotel';
    end if;

    IF _coefficient <= 0.01 THEN
        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = 'Coefficient should be at least 0.01';
    end if;


    INSERT INTO season_has_day_of_week
        (SeasonID, DayOfWeek, Coefficient)
    VALUES (_seasonId, _dayOfWeek, _coefficient)
    ON DUPLICATE KEY UPDATE SeasonID = _seasonId,
                            DayOfWeek  = _dayOfWeek,
                            Coefficient  = _coefficient;

    COMMIT;
END;



# HOTEL 1

CALL insertSeason('Winter', '2020-12-01', '2021-02-28', '',
    'admin_1@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Winter' AND hwds.HotelID = 1 LIMIT 1), 'admin_1@amita.kz',
    'Saturday', 1.25);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Winter' AND hwds.HotelID = 1 LIMIT 1), 'admin_1@amita.kz',
    'Sunday', 1.5);

CALL insertSeason('Spring', '2020-03-01', '2021-05-31', '',
    'admin_1@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Spring' AND hwds.HotelID = 1 LIMIT 1), 'admin_1@amita.kz',
    'Wednesday', 1.05);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Spring' AND hwds.HotelID = 1 LIMIT 1), 'admin_1@amita.kz',
    'Thursday', 1.12);

CALL insertSeason('Summer', '2021-06-01', '2021-08-31', '',
    'admin_1@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Summer' AND hwds.HotelID = 1 LIMIT 1), 'admin_1@amita.kz',
    'Monday', 1.1);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Summer' AND hwds.HotelID = 1 LIMIT 1), 'admin_1@amita.kz',
    'Sunday', 0.9);

CALL insertSeason('Fall', '2021-09-01', '2021-11-30', '',
    'admin_1@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Fall' AND hwds.HotelID = 1 LIMIT 1), 'admin_1@amita.kz',
    'Friday', 1.08);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Fall' AND hwds.HotelID = 1 LIMIT 1), 'admin_1@amita.kz',
    'Saturday', 0.95);

#-----

# HOTEL 2

CALL insertSeason('Winter', '2020-12-01', '2021-02-28', '',
    'admin_2@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Winter' AND hwds.HotelID = 2 LIMIT 1), 'admin_2@amita.kz',
    'Saturday', 1.25);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Winter' AND hwds.HotelID = 2 LIMIT 1), 'admin_2@amita.kz',
    'Sunday', 1.5);

CALL insertSeason('Spring', '2020-03-01', '2021-05-31', '',
    'admin_2@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Spring' AND hwds.HotelID = 2 LIMIT 1), 'admin_2@amita.kz',
    'Wednesday', 1.05);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Spring' AND hwds.HotelID = 2 LIMIT 1), 'admin_2@amita.kz',
    'Thursday', 1.12);

CALL insertSeason('Summer', '2021-06-01', '2021-08-31', '',
    'admin_2@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Summer' AND hwds.HotelID = 2 LIMIT 1), 'admin_2@amita.kz',
    'Monday', 1.1);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Summer' AND hwds.HotelID = 2 LIMIT 1), 'admin_2@amita.kz',
    'Sunday', 0.9);

CALL insertSeason('Fall', '2021-09-01', '2021-11-30', '',
    'admin_2@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Fall' AND hwds.HotelID = 2 LIMIT 1), 'admin_2@amita.kz',
    'Friday', 1.08);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Fall' AND hwds.HotelID = 2 LIMIT 1), 'admin_2@amita.kz',
    'Saturday', 0.95);

#-----

# HOTEL 3

CALL insertSeason('Winter', '2020-12-01', '2021-02-28', '',
    'admin_3@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Winter' AND hwds.HotelID = 3 LIMIT 1), 'admin_3@amita.kz',
    'Saturday', 1.25);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Winter' AND hwds.HotelID = 3 LIMIT 1), 'admin_3@amita.kz',
    'Sunday', 1.5);

CALL insertSeason('Spring', '2020-03-01', '2021-05-31', '',
    'admin_3@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Spring' AND hwds.HotelID = 3 LIMIT 1), 'admin_3@amita.kz',
    'Wednesday', 1.05);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Spring' AND hwds.HotelID = 3 LIMIT 1), 'admin_3@amita.kz',
    'Thursday', 1.12);

CALL insertSeason('Summer', '2021-06-01', '2021-08-31', '',
    'admin_3@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Summer' AND hwds.HotelID = 3 LIMIT 1), 'admin_3@amita.kz',
    'Monday', 1.1);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Summer' AND hwds.HotelID = 3 LIMIT 1), 'admin_3@amita.kz',
    'Sunday', 0.9);

CALL insertSeason('Fall', '2021-09-01', '2021-11-30', '',
    'admin_3@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Fall' AND hwds.HotelID = 3 LIMIT 1), 'admin_3@amita.kz',
    'Friday', 1.08);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Fall' AND hwds.HotelID = 3 LIMIT 1), 'admin_3@amita.kz',
    'Saturday', 0.95);

#-----

# HOTEL 4

CALL insertSeason('Winter', '2020-12-01', '2021-02-28', '',
    'admin_4@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Winter' AND hwds.HotelID = 4 LIMIT 1), 'admin_4@amita.kz',
    'Saturday', 1.25);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Winter' AND hwds.HotelID = 4 LIMIT 1), 'admin_4@amita.kz',
    'Sunday', 1.5);

CALL insertSeason('Spring', '2020-03-01', '2021-05-31', '',
    'admin_4@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Spring' AND hwds.HotelID = 4 LIMIT 1), 'admin_4@amita.kz',
    'Wednesday', 1.05);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Spring' AND hwds.HotelID = 4 LIMIT 1), 'admin_4@amita.kz',
    'Thursday', 1.12);

CALL insertSeason('Summer', '2021-06-01', '2021-08-31', '',
    'admin_4@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Summer' AND hwds.HotelID = 4 LIMIT 1), 'admin_4@amita.kz',
    'Monday', 1.1);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Summer' AND hwds.HotelID = 4 LIMIT 1), 'admin_4@amita.kz',
    'Sunday', 0.9);

CALL insertSeason('Fall', '2021-09-01', '2021-11-30', '',
    'admin_4@amita.kz');
CALL insertSeasonWeekDay(
    (SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Fall' AND hwds.HotelID = 4 LIMIT 1), 'admin_4@amita.kz',
    'Friday', 1.08);
CALL insertSeasonWeekDay((SELECT season.SeasonID FROM season
    INNER JOIN hotel_works_during_season hwds on season.SeasonID = hwds.SeasonID
    WHERE name = 'Fall' AND hwds.HotelID = 4 LIMIT 1), 'admin_4@amita.kz',
    'Saturday', 0.95);

#-----