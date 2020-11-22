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

# INSERT MANAGER OF HOTEL ID 1
UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'admin_1@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Admin', '+70000000000');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000000'), CURDATE(), 1, 'admin_1@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'admin_1@amita.kz'), 'Manager');
# ---------------------------------

# INSERT DESK CLERK OF HOTEL ID 1
UPDATE user
SET Role = 'ROLE_MODERATOR'
WHERE Email = 'moderator_1@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Moderator', '+70000000001');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000001'), CURDATE(), 1, 'moderator_1@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'moderator_1@amita.kz'), 'Desk Clerk');
# ---------------------------------

# INSERT MANAGER OF HOTEL ID 2
UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'admin_2@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Admin', '+70000000002');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000002'), CURDATE(), 2, 'admin_2@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'admin_2@amita.kz'), 'Manager');
# ---------------------------------

# INSERT DESK CLERK OF HOTEL ID 2
UPDATE user
SET Role = 'ROLE_MODERATOR'
WHERE Email = 'moderator_2@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Moderator', '+70000000003');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000003'), CURDATE(), 2, 'moderator_2@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'moderator_2@amita.kz'), 'Desk Clerk');
# ---------------------------------

# INSERT MANAGER OF HOTEL ID 3
UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'admin_3@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Admin', '+70000000004');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000004'), CURDATE(), 3, 'admin_3@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'admin_3@amita.kz'), 'Manager');
# ---------------------------------

# INSERT DESK CLERK OF HOTEL ID 3
UPDATE user
SET Role = 'ROLE_MODERATOR'
WHERE Email = 'moderator_3@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Moderator', '+70000000005');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000005'), CURDATE(), 3, 'moderator_3@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'moderator_3@amita.kz'), 'Desk Clerk');
# ---------------------------------

# INSERT MANAGER OF HOTEL ID 4
UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'admin_4@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Admin', '+70000000006');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000006'), CURDATE(), 4, 'admin_4@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'admin_4@amita.kz'), 'Manager');
# ---------------------------------

# INSERT DESK CLERK OF HOTEL ID 4
UPDATE user
SET Role = 'ROLE_MODERATOR'
WHERE Email = 'moderator_4@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Moderator', '+70000000007');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000007'), CURDATE(), 4, 'moderator_4@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'moderator_4@amita.kz'), 'Desk Clerk');
# ---------------------------------



# INSERT HOTEL 1 EMPLOYEES

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Clyve', 'Edmundson', '+77760000000');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000000'), CURDATE(), 1);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Tad', 'Pinches', '+77760000001');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000001'), CURDATE(), 1);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Desk Clerk');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Sapphira', 'Davidova', '+77760000002');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000002'), CURDATE(), 1);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Housekeeping Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Betta', 'Tobin', '+77760000003');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000003'), CURDATE(), 1);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Cleaner');

# ------------------------

# INSERT HOTEL 2 EMPLOYEES

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Clyve', 'Edmundson', '+77760000004');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000004'), CURDATE(), 2);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Tad', 'Pinches', '+77760000005');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000005'), CURDATE(), 2);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Desk Clerk');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Sapphira', 'Davidova', '+77760000006');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000006'), CURDATE(), 2);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Housekeeping Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Betta', 'Tobin', '+77760000007');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000007'), CURDATE(), 2);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Cleaner');

# ------------------------

# INSERT HOTEL 3 EMPLOYEES

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Clyve', 'Edmundson', '+77760000008');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000008'), CURDATE(), 3);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Tad', 'Pinches', '+77760000009');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000009'), CURDATE(), 3);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Desk Clerk');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Sapphira', 'Davidova', '+77760000010');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000010'), CURDATE(), 3);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Housekeeping Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Betta', 'Tobin', '+77760000011');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000011'), CURDATE(), 3);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Cleaner');

# ------------------------

# INSERT HOTEL 4 EMPLOYEES

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Clyve', 'Edmundson', '+77760000012');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000012'), CURDATE(), 4);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Tad', 'Pinches', '+77760000013');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000013'), CURDATE(), 4);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Desk Clerk');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Sapphira', 'Davidova', '+77760000014');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000014'), CURDATE(), 4);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Housekeeping Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Betta', 'Tobin', '+77760000015');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000015'), CURDATE(), 4);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Cleaner');

# ------------------------

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