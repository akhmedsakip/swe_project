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

CALL insertSeason('Winter', '2021-01-01', '2021-02-20', 'Hello',
    'akhmed.sakip@nu.edu.kz');