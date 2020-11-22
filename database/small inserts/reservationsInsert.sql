DROP PROCEDURE IF EXISTS reserve;

CREATE PROCEDURE reserve(IN _gender VARCHAR(10), IN _firstName VARCHAR(30),
                         IN _lastName VARCHAR(30), IN _phoneNumber VARCHAR(45), IN _hotelId INT, IN _orderPrice INT,
                         IN _checkInDate VARCHAR(20), IN _checkOutDate VARCHAR(20),
                         IN _paymentMethod VARCHAR(45), IN _roomTypeName varchar(45), IN _userEmail VARCHAR(45))
BEGIN
    DECLARE _personId INT;
    DECLARE _roomNumber VARCHAR(10);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;

    START TRANSACTION;
    SELECT PersonID
    INTO _personId
    FROM guest
             INNER JOIN person ON person.PersonID = GuestID
    WHERE person.PhoneNumber = _phoneNumber
    LIMIT 1;

    IF _personId IS NULL THEN
        INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
        VALUES (_gender,
                _firstName,
                _lastName,
                _phoneNumber);
        SELECT LAST_INSERT_ID() INTO _personId;
        INSERT INTO guest (GuestID) VALUE (_personId);
    END IF;

    INSERT INTO `order` (HotelID, OrderPrice, OrderDateTime, CheckInDate, CheckOutDate, OrderStatus, PaymentMethod,
                         UserEmail)
    VALUES (_hotelId,
            _orderPrice,
            NOW(),
            _checkInDate,
            _checkOutDate,
            'Reserved',
            _paymentMethod,
            _userEmail);

    SELECT DISTINCT room.RoomNumber
    INTO _roomNumber
    FROM room
             INNER JOIN hotel ON hotel.HotelID = room.HotelID
             INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name
             LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber
             LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID
    WHERE (O.OrderID IS NULL
        OR NOT EXISTS (SELECT `order`.CheckOutDate
            FROM `order`
                     INNER JOIN order_details d on `order`.OrderID = d.OrderID and `order`.HotelID = d.OrderHotelID
            WHERE d.RoomNumber = room.RoomNumber
              AND (`order`.CheckInDate BETWEEN _checkInDate AND DATE_SUB(_checkOutDate, INTERVAL 1 DAY) OR
                   `order`.CheckOutDate BETWEEN DATE_ADD(_checkInDate, INTERVAL 1 DAY) AND _checkOutDate)))
      AND hotel.HotelID = _hotelId
      AND room_type.Name = _roomTypeName
    LIMIT 1;

    IF _roomNumber IS NULL OR _checkOutDate <= _checkInDate THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'There is no free room';
    end if;

    INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID, RoomNumber,
                               GuestID)
    VALUES (TRUE,
            LAST_INSERT_ID(),
            _hotelId,
            _hotelId,
            _roomTypeName,
            _hotelId,
            _roomNumber,
            _personId);
    COMMIT;
END;

DROP FUNCTION IF EXISTS getPrice;

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
END;

# INSERT RESERVATIONS FOR HOTEL 1

CALL reserve('Male','Akhmed', 'Sakip', '+77776666642', 1,
    (SELECT getPrice(1, '2021-01-01', '2021-01-03', 'Standard')),
    '2021-01-01', '2021-01-03', 'Cash', 'Standard',
    'admin_1@amita.kz');

CALL reserve('Male','Timur', 'Rakhimzhan', '+77001111111', 1,
    (SELECT getPrice(1, '2021-02-01', '2021-02-10', 'Standard')),
    '2021-02-01', '2021-02-10', 'Cash', 'Standard',
    'admin_1@amita.kz');

CALL reserve('Male','Islam', 'Orazbek', '+77002222222', 1,
    (SELECT getPrice(1, '2021-03-01', '2021-03-02', 'Standard')),
    '2021-03-01', '2021-03-02', 'Cash', 'Standard',
    'admin_1@amita.kz');

CALL reserve('Male','Madi', 'Karsybekov', '+77003333333', 1,
    (SELECT getPrice(1, '2021-05-05', '2021-06-28', 'Luxe')),
    '2021-05-05', '2021-06-28', 'Cash', 'Luxe',
    'admin_1@amita.kz');

CALL reserve('Female','Ayazhan', 'Yerikkyzy', '+77004444444', 1,
    (SELECT getPrice(1, '2021-12-25', '2021-12-30', 'Luxe')),
    '2021-12-25', '2021-12-30', 'Cash', 'Luxe',
    'admin_1@amita.kz');

# -------------------------------------
# INSERT RESERVATIONS FOR HOTEL 2

CALL reserve('Male','Akhmed', 'Sakip', '+77776666642', 2,
    (SELECT getPrice(2, '2021-01-01', '2021-01-03', 'Standard')),
    '2021-01-01', '2021-01-03', 'Cash', 'Standard',
    'admin_2@amita.kz');

CALL reserve('Male','Timur', 'Rakhimzhan', '+77001111111', 2,
    (SELECT getPrice(2, '2021-02-01', '2021-02-10', 'Standard')),
    '2021-02-01', '2021-02-10', 'Cash', 'Standard',
    'admin_2@amita.kz');

CALL reserve('Male','Islam', 'Orazbek', '+77002222222', 2,
    (SELECT getPrice(2, '2021-03-01', '2021-03-02', 'Standard')),
    '2021-03-01', '2021-03-02', 'Cash', 'Standard',
    'admin_2@amita.kz');

CALL reserve('Male','Madi', 'Karsybekov', '+77003333333', 2,
    (SELECT getPrice(2, '2021-05-05', '2021-06-28', 'Luxe')),
    '2021-05-05', '2021-06-28', 'Cash', 'Luxe',
    'admin_2@amita.kz');

CALL reserve('Female','Ayazhan', 'Yerikkyzy', '+77004444444', 2,
    (SELECT getPrice(2, '2021-12-25', '2021-12-30', 'Luxe')),
    '2021-12-25', '2021-12-30', 'Cash', 'Luxe',
    'admin_2@amita.kz');

# -------------------------------------
# INSERT RESERVATIONS FOR HOTEL 3

CALL reserve('Male','Akhmed', 'Sakip', '+77776666642', 3,
    (SELECT getPrice(3, '2021-01-01', '2021-01-03', 'Standard')),
    '2021-01-01', '2021-01-03', 'Cash', 'Standard',
    'admin_3@amita.kz');

CALL reserve('Male','Timur', 'Rakhimzhan', '+77001111111', 3,
    (SELECT getPrice(3, '2021-02-01', '2021-02-10', 'Standard')),
    '2021-02-01', '2021-02-10', 'Cash', 'Standard',
    'admin_3@amita.kz');

CALL reserve('Male','Islam', 'Orazbek', '+77002222222', 3,
    (SELECT getPrice(3, '2021-03-01', '2021-03-02', 'Standard')),
    '2021-03-01', '2021-03-02', 'Cash', 'Standard',
    'admin_3@amita.kz');

CALL reserve('Male','Madi', 'Karsybekov', '+77003333333', 3,
    (SELECT getPrice(3, '2021-05-05', '2021-06-28', 'Luxe')),
    '2021-05-05', '2021-06-28', 'Cash', 'Luxe',
    'admin_3@amita.kz');

CALL reserve('Female','Ayazhan', 'Yerikkyzy', '+77004444444', 3,
    (SELECT getPrice(3, '2021-12-25', '2021-12-30', 'Luxe')),
    '2021-12-25', '2021-12-30', 'Cash', 'Luxe',
    'admin_3@amita.kz');

# -------------------------------------
# INSERT RESERVATIONS FOR HOTEL 4

CALL reserve('Male','Akhmed', 'Sakip', '+77776666642', 4,
    (SELECT getPrice(4, '2021-01-01', '2021-01-03', 'Standard')),
    '2021-01-01', '2021-01-03', 'Cash', 'Standard',
    'admin_4@amita.kz');

CALL reserve('Male','Timur', 'Rakhimzhan', '+77001111111', 4,
    (SELECT getPrice(4, '2021-02-01', '2021-02-10', 'Standard')),
    '2021-02-01', '2021-02-10', 'Cash', 'Standard',
    'admin_4@amita.kz');

CALL reserve('Male','Islam', 'Orazbek', '+77002222222', 4,
    (SELECT getPrice(4, '2021-03-01', '2021-03-02', 'Standard')),
    '2021-03-01', '2021-03-02', 'Cash', 'Standard',
    'admin_4@amita.kz');

CALL reserve('Male','Madi', 'Karsybekov', '+77003333333', 4,
    (SELECT getPrice(4, '2021-05-05', '2021-06-28', 'Luxe')),
    '2021-05-05', '2021-06-28', 'Cash', 'Luxe',
    'admin_4@amita.kz');

CALL reserve('Female','Ayazhan', 'Yerikkyzy', '+77004444444', 4,
    (SELECT getPrice(4, '2021-12-25', '2021-12-30', 'Luxe')),
    '2021-12-25', '2021-12-30', 'Cash', 'Luxe',
    'admin_4@amita.kz');

# -------------------------------------