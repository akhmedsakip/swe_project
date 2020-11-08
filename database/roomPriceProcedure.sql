DROP PROCEDURE IF EXISTS getprice;

CREATE PROCEDURE getprice(IN _hotelId INT, IN _checkInDate DATE, IN _checkOutDate DATE,
                          IN _roomTypeName VARCHAR(45), OUT _totalPrice INT)
BEGIN
    DECLARE _date VARCHAR(20);
    DECLARE _coefficient FLOAT;
    DECLARE _basePrice INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
        END;

    SET _totalPrice = 0;
    SET _date = _checkInDate;

    START TRANSACTION;
    SELECT room_type.BasePricePerDay
    INTO _basePrice
    FROM room_type
    WHERE room_type.Name = _roomTypeName
      AND room_type.HotelID = _hotelId
    LIMIT 1;

    WHILE _date < _checkOutDate
        DO
            SELECT Coefficient
            INTO _coefficient
            FROM hotel_works_during_holiday hwdh
                     INNER JOIN holiday ON holiday.HolidayID = hwdh.HolidayID
            WHERE _date BETWEEN holiday.StartDate AND holiday.EndDate
              AND hwdh.HotelID = _hotelId LIMIT 1;

            IF _coefficient IS NULL THEN
                SELECT shdow.Coefficient
                INTO _coefficient
                FROM hotel_works_during_season hwds
                         INNER JOIN season on hwds.SeasonID = season.SeasonID
                         INNER JOIN season_has_day_of_week shdow on season.SeasonID = shdow.SeasonID
                         INNER JOIN day_of_week dow ON shdow.DayOfWeek = dow.Day
                WHERE _date BETWEEN season.StartDate AND season.EndDate
                  AND dow.Day = DAYNAME(_date)
                  AND hwds.HotelID = _hotelId LIMIT 1;
            END IF;

            IF _coefficient IS NULL THEN
                SET _coefficient = 1;
            END IF;

            SET _totalPrice = _totalPrice + CEIL(_basePrice * ROUND(_coefficient, 4));
            SET _date = DATE_ADD(_date, INTERVAL 1 DAY);
        END WHILE;
    COMMIT;
END;

CALL getprice(1, '2021-01-08', '2021-01-09', 'Standard', @totalPrice);

SELECT @totalPrice;
