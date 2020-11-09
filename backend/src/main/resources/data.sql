# getPrice

DELIMITER $$

DROP FUNCTION IF EXISTS getPrice $$

CREATE FUNCTION getPrice(_hotelId INT, _checkInDate DATE, _checkOutDate DATE,
                         _roomTypeName VARCHAR(45))
    RETURNS INT
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _date VARCHAR(20);
    DECLARE _coefficient FLOAT;
    DECLARE _basePrice INT;
    DECLARE _totalPrice INT;

    SET _totalPrice = 0;
    SET _date = _checkInDate;

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
              AND hwdh.HotelID = _hotelId
            LIMIT 1;

            IF _coefficient IS NULL THEN
                SELECT shdow.Coefficient
                INTO _coefficient
                FROM hotel_works_during_season hwds
                         INNER JOIN season on hwds.SeasonID = season.SeasonID
                         INNER JOIN season_has_day_of_week shdow on season.SeasonID = shdow.SeasonID
                         INNER JOIN day_of_week dow ON shdow.DayOfWeek = dow.Day
                WHERE _date BETWEEN season.StartDate AND season.EndDate
                  AND dow.Day = DAYNAME(_date)
                  AND hwds.HotelID = _hotelId
                LIMIT 1;
            END IF;

            IF _coefficient IS NULL THEN
                SET _coefficient = 1;
            END IF;

            SET _totalPrice = _totalPrice + CEIL(_basePrice * ROUND(_coefficient, 4));
            SET _date = DATE_ADD(_date, INTERVAL 1 DAY);
        END WHILE;
    RETURN _totalPrice;
END $$

DELIMITER ;

# ------- reserve

# DROP PROCEDURE IF EXISTS reserve;
#
# CREATE PROCEDURE reserve(IN _gender VARCHAR(10), IN _firstName VARCHAR(30),
#                          IN _lastName VARCHAR(30), IN _phoneNumber VARCHAR(45), IN _hotelId INT, IN _orderPrice INT,
#                          IN _orderDateTime VARCHAR(20), IN _checkInDate VARCHAR(20), IN _checkOutDate VARCHAR(20),
#                          IN _paymentMethod VARCHAR(45), IN _roomTypeName varchar(45), IN _userEmail VARCHAR(45))
# BEGIN
#     DECLARE _personId INT;
#     DECLARE _roomNumber VARCHAR(10);
#
#     DECLARE EXIT HANDLER FOR SQLEXCEPTION
#         BEGIN
#             ROLLBACK;
#             RESIGNAL;
#         END;
#
#     START TRANSACTION;
#     SELECT PersonID
#     INTO _personId
#     FROM guest
#              INNER JOIN person ON person.PersonID = GuestID
#     WHERE person.PhoneNumber = _phoneNumber
#     LIMIT 1;
#
#     IF _personId IS NULL THEN
#         INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
#         VALUES (_gender,
#                 _firstName,
#                 _lastName,
#                 _phoneNumber);
#         SELECT LAST_INSERT_ID() INTO _personId;
#         INSERT INTO guest (GuestID) VALUE (_personId);
#     END IF;
#
#     INSERT INTO `order` (HotelID, OrderPrice, OrderDateTime, CheckInDate, CheckOutDate, OrderStatus, PaymentMethod,
#                          UserEmail)
#     VALUES (_hotelId,
#             _orderPrice,
#             _orderDateTime,
#             _checkInDate,
#             _checkOutDate,
#             'Reserved',
#             _paymentMethod,
#             _userEmail);
#
#     SELECT DISTINCT room.RoomNumber
#     INTO _roomNumber
#     FROM room
#              INNER JOIN hotel ON hotel.HotelID = room.HotelID
#              INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name
#              LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber
#              LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID
#     WHERE (O.OrderID IS NULL
#         OR (SELECT `order`.CheckOutDate
#             FROM `order`
#                      INNER JOIN order_details d on `order`.OrderID = d.OrderID and `order`.HotelID = d.OrderHotelID
#             WHERE d.RoomNumber = room.RoomNumber
#               AND (`order`.CheckInDate BETWEEN _checkInDate AND _checkOutDate OR
#                    `order`.CheckOutDate BETWEEN _checkInDate AND _checkOutDate)) IS NULL)
#       AND hotel.HotelID = _hotelId
#       AND room_type.Name = _roomTypeName
#     LIMIT 1;
#
#     IF _roomNumber IS NULL OR _checkOutDate <= _checkInDate THEN
#         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'There is no free room';
#     end if;
#
#     INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID, RoomNumber,
#                                GuestID)
#     VALUES (TRUE,
#             LAST_INSERT_ID(),
#             _hotelId,
#             _hotelId,
#             _roomTypeName,
#             _hotelId,
#             _roomNumber,
#             _personId);
#     COMMIT;
# END;

# -----