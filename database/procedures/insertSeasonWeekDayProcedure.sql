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

CALL insertSeasonWeekDay(1, 'akhmed.sakip@nu.edu.kz', 'Monday', 1.9);