DROP PROCEDURE IF EXISTS deleteSeason;

CREATE PROCEDURE deleteSeason(IN _seasonId INT, IN _userEmail VARCHAR(45))
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
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access error, trying to delete season from another hotel';
    end if;

    DELETE FROM hotel_works_during_season hwds WHERE hwds.SeasonID = _seasonId;

    DELETE FROM season_has_day_of_week shdow WHERE shdow.SeasonID = _seasonId;

    DELETE
    FROM season
    WHERE SeasonID = _seasonId;

    COMMIT;
END;

CALL deleteSeason(19, 'admin_1@amita.kz');