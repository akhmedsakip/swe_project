### 1

DROP FUNCTION IF EXISTS getRoomPrice;

CREATE FUNCTION getRoomPrice(_hotelId INT, _checkInDate DATE, _checkOutDate DATE,
                             _roomTypeName VARCHAR(45))
    RETURNS FLOAT
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _date DATE;
    DECLARE _coefficient FLOAT;
    DECLARE _basePrice INT;
    DECLARE _totalPrice FLOAT;

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

            SET _totalPrice = _totalPrice + _basePrice * _coefficient;
            SET _date = DATE_ADD(_date, INTERVAL 1 DAY);
            SET _coefficient = NULL;
        END WHILE;
    RETURN _totalPrice;
END;

# a

SELECT DISTINCT room_type.Name,
                getRoomPrice(1, '2020-12-15', '2020-12-17',
                             room_type.Name) / DATEDIFF('2020-12-17', '2020-12-15') AveragePricePerNight
FROM room
         INNER JOIN hotel ON hotel.HotelID = room.HotelID
         INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name
         LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber
         LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID
WHERE (O.OrderID IS NULL
    OR NOT EXISTS(SELECT `order`.CheckOutDate
                  FROM `order`
                           INNER JOIN order_details d
                                      on `order`.OrderID = d.OrderID and `order`.HotelID = d.OrderHotelID
                  WHERE d.RoomNumber = room.RoomNumber
                    AND (`order`.CheckInDate BETWEEN '2020-12-15' AND DATE_SUB('2020-12-17', INTERVAL 1 DAY) OR
                         `order`.CheckOutDate BETWEEN DATE_ADD('2020-12-15', INTERVAL 1 DAY) AND '2020-12-17')))
  AND hotel.HotelID = 1
  AND room_type.Capacity >= 1;

#--

# b

DROP PROCEDURE IF EXISTS addRoomToOrder;

CREATE PROCEDURE addRoomToOrder(IN _orderId INT, IN _personId INT,
                                IN _roomTypeName varchar(45), IN _numberOfPeople INT)
BEGIN
    DECLARE _capacity INT;
    DECLARE _roomNumber VARCHAR(10);
    DECLARE _checkInDate DATE;
    DECLARE _checkOutDate DATE;
    DECLARE _hotelId INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;

    START TRANSACTION;

    SELECT CheckInDate, CheckOutDate, HotelID
    INTO _checkInDate, _checkOutDate, _hotelId
    FROM `order`
    WHERE OrderID = _orderId;

    SELECT Capacity
    INTO _capacity
    FROM room_type
    WHERE HotelID = _hotelId
      AND Name = _roomTypeName;

    IF _numberOfPeople > _capacity OR _numberOfPeople < 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The room type can not accommodate that amount of people';
    END IF;

    IF _personId IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No such person';
    END IF;

    SELECT DISTINCT room.RoomNumber
    INTO _roomNumber
    FROM room
             INNER JOIN hotel ON hotel.HotelID = room.HotelID
             INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name
             LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber
             LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID
    WHERE (O.OrderID IS NULL
        OR NOT EXISTS(SELECT `order`.CheckOutDate
                      FROM `order`
                               INNER JOIN order_details d
                                          on `order`.OrderID = d.OrderID and `order`.HotelID = d.OrderHotelID
                      WHERE d.RoomNumber = room.RoomNumber
                        AND (`order`.CheckInDate BETWEEN _checkInDate AND DATE_SUB(_checkOutDate, INTERVAL 1 DAY) OR
                             `order`.CheckOutDate BETWEEN DATE_ADD(_checkInDate, INTERVAL 1 DAY) AND _checkOutDate)))
      AND hotel.HotelID = _hotelId
      AND room_type.Name = _roomTypeName
    LIMIT 1;

    IF _roomNumber IS NULL OR _checkOutDate <= _checkInDate THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'There is no free room';
    END IF;

    INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID, RoomNumber,
                               GuestID, StaysInRoom, NumberOfPeople)
    VALUES (TRUE,
            _orderId,
            _hotelId,
            _hotelId,
            _roomTypeName,
            _hotelId,
            _roomNumber,
            _personId,
            FALSE,
            _numberOfPeople);
    COMMIT;
END;

INSERT INTO `order` (HotelID, OrderDateTime, CheckInDate, CheckOutDate, OrderStatus, PaymentMethod,
                     UserEmail, PayerID)
VALUES (1,
        NOW(),
        '2020-12-15',
        '2020-12-17',
        'Reserved',
        'Cash',
        'mona.rizvi@nu.edu.kz',
        1);

CALL addRoomToOrder(1, 1, 'Double', 3);

CALL addRoomToOrder(1, 1, 'Double', 4);

CALL addRoomToOrder(1, 1, 'Single', 2);

#--

# c

SELECT SUM(RoomPrice)
FROM (SELECT DISTINCT OD.RoomNumber,
                      SC.DiscountCoefficient,
                      ROUND(getRoomPrice(O.HotelID, O.CheckInDate,
                                         O.CheckOutDate, OD.RoomType) * SC.DiscountCoefficient, 2) RoomPrice
      FROM `order` O
               INNER JOIN order_details OD ON O.OrderID = OD.OrderID
               INNER JOIN guest G ON O.PayerID = G.GuestID
               LEFT OUTER JOIN special_category SC ON G.SpecialCategoryID = SC.SpecialCategoryID
      WHERE O.OrderID = 1) room_prices;

#--

#------------


# 2

# a

SELECT room.*
FROM room
         INNER JOIN hotel ON hotel.HotelID = room.HotelID
         INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name
         INNER JOIN `order` O1 ON O1.OrderID = 2
         LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber
         LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID
WHERE (O.OrderID IS NULL
    OR NOT EXISTS(SELECT `order`.CheckOutDate
                  FROM `order`
                           INNER JOIN order_details d
                                      on `order`.OrderID = d.OrderID and `order`.HotelID = d.OrderHotelID
                  WHERE d.RoomNumber = room.RoomNumber
                    AND (`order`.CheckInDate BETWEEN O1.CheckInDate AND DATE_SUB(O1.CheckOutDate, INTERVAL 1 DAY) OR
                         `order`.CheckOutDate BETWEEN DATE_ADD(O1.CheckInDate, INTERVAL 1 DAY) AND O1.CheckOutDate))
    OR O.OrderID = O1.OrderID)
  AND hotel.HotelID = 2
  AND room_type.Name = 'Double'
  AND room.LastCleanDate = O1.CheckInDate;

# --

## DO NOT INCLUDE IN REPORT
INSERT INTO `order` (HotelID, OrderDateTime, CheckInDate, CheckOutDate, OrderStatus, PaymentMethod,
                     UserEmail, PayerID)
VALUES (2,
        NOW(),
        '2020-12-15',
        '2020-12-17',
        'Reserved',
        'Cash',
        'jon.smith@some.email',
        2);

CALL addRoomToOrder(2, 2, 'Double', 3);
## ----

# b

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'SomeFemaleName', 'Smith', '+77011111111');

INSERT INTO guest (GuestID)
VALUES (LAST_INSERT_ID());

DELETE
FROM order_details
WHERE OrderID = 2
  AND OrderHotelID = 2;

UPDATE `order`
SET OrderStatus = 'Active'
WHERE OrderID = 2
  AND HotelID = 2;

INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID,
                           RoomNumber, GuestID, StaysInRoom, NumberOfPeople)
VALUES (TRUE, 2, 2, 2, 'Double', 2, '1.04', 2, TRUE, null);

INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID,
                           RoomNumber, GuestID, StaysInRoom, NumberOfPeople)
VALUES (FALSE, 2, 2, 2, 'Double', 2, '1.04', 3, TRUE, null);

# --

#------------

# 3

SELECT DISTINCT p.FirstName, p.LastName, p.City, p.CountryCode, p.ZIPCode, p.Street, p.PhoneNumber
FROM `order` allOrders
         INNER JOIN order_details details ON allOrders.OrderID = details.OrderID
         INNER JOIN guest ON details.GuestID = guest.GuestID
         INNER JOIN person p ON guest.GuestID = p.PersonID
WHERE details.StaysInRoom = TRUE
  AND '2020-10-15' BETWEEN DATE_ADD(allOrders.CheckInDate, INTERVAL 1 DAY) AND allOrders.CheckOutDate
  AND details.RoomNumber = '311'
  AND allOrders.HotelID = 1;

#------------

# 4

# b

## DO NOT INCLUDE IN REPORT
DELETE
FROM order_details
WHERE OrderID = 1
  AND OrderHotelID = 1;

UPDATE `order`
SET OrderStatus = 'Active'
WHERE OrderID = 1
  AND HotelID = 1;

INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID,
                           RoomNumber, GuestID, StaysInRoom, NumberOfPeople)
VALUES (TRUE, 1, 1, 1, 'Single', 1, '1.01', 1, TRUE, null);

INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID,
                           RoomNumber, GuestID, StaysInRoom, NumberOfPeople)
VALUES (FALSE, 1, 1, 1, 'Single', 1, '1.01', 7, TRUE, null);

INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID,
                           RoomNumber, GuestID, StaysInRoom, NumberOfPeople)
VALUES (FALSE, 1, 1, 1, 'Double', 1, '1.03', 3, TRUE, null);

INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID,
                           RoomNumber, GuestID, StaysInRoom, NumberOfPeople)
VALUES (FALSE, 1, 1, 1, 'Double', 1, '1.03', 4, TRUE, null);

INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID,
                           RoomNumber, GuestID, StaysInRoom, NumberOfPeople)
VALUES (FALSE, 1, 1, 1, 'Double', 1, '1.03', 5, TRUE, null);

INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID,
                           RoomNumber, GuestID, StaysInRoom, NumberOfPeople)
VALUES (FALSE, 1, 1, 1, 'Double', 1, '1.04', 6, TRUE, null);

INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID,
                           RoomNumber, GuestID, StaysInRoom, NumberOfPeople)
VALUES (FALSE, 1, 1, 1, 'Double', 1, '1.04', 8, TRUE, null);

INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID,
                           RoomNumber, GuestID, StaysInRoom, NumberOfPeople)
VALUES (FALSE, 1, 1, 1, 'Double', 1, '1.04', 9, TRUE, null);

INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID,
                           RoomNumber, GuestID, StaysInRoom, NumberOfPeople)
VALUES (FALSE, 1, 1, 1, 'Double', 1, '1.04', 10, TRUE, null);
# --

DROP PROCEDURE IF EXISTS addServiceToServiceOrder;

CREATE PROCEDURE addServiceToServiceOrder(IN _hotelId INT, IN _serviceId INT, IN _quantity INT, IN _guestId INT,
                                          IN _roomNumber VARCHAR(10))
BEGIN
    DECLARE _isPersonal BOOL;
    DECLARE _orderId INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;

    START TRANSACTION;

    IF NOT _quantity > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Quantity ';
    END IF;


    SELECT ST.IsPersonal, service.OrderID
    FROM service
             INNER JOIN service_type ST
                        on service.ServiceTypeHotelID = ST.HotelID and service.ServiceType = ST.ServiceName
    WHERE ServiceID = _serviceId
    INTO _isPersonal, _orderId;

    IF _isPersonal IS TRUE THEN
        IF _guestId IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Service is personal, however, guest id is null';
        end if;
        INSERT INTO service_made_for_guest (HotelID, OrderID, ServiceID, GuestID, Quantity)
            VALUE (_hotelId, _orderId, _serviceId, _guestId, _quantity);
    ELSE
        IF _roomNumber IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Service is dedicated for room, however, room id is null';
        end if;
        INSERT INTO service_made_for_room (ServiceID, ServiceHotelID, OrderID, RoomHotelID, RoomNumber, Quantity)
            VALUE (_serviceId, _hotelId, _orderId, _hotelId, _roomNumber, _quantity);
    END IF;
    COMMIT;
END;

INSERT INTO service (HotelID, OrderID, ServiceDateTime, ServiceTypeHotelID, ServiceType)
    VALUE (1, 1, NOW(), 1, 'breakfast');

INSERT INTO service (HotelID, OrderID, ServiceDateTime, ServiceTypeHotelID, ServiceType)
    VALUE (1, 1, NOW(), 1, 'Refill the refrigerator');

CALL addServiceToServiceOrder(1, 1, 2, 7, NULL);
CALL addServiceToServiceOrder(1, 1, 1, 1, NULL);

CALL addServiceToServiceOrder(1, 2, 1, NULL, '1.01');

## ----

# c

UPDATE `order` O
SET O.PaidServicesTotal = IFNULL((SELECT SUM(ST.Price * IFNULL(SMFR.Quantity, SMFG.Quantity))
                           FROM service S
                                    INNER JOIN service_type ST
                                               ON S.ServiceTypeHotelID = st.HotelID AND S.ServiceType = st.ServiceName
                                    LEFT OUTER JOIN service_made_for_room SMFR ON S.ServiceID = SMFR.ServiceID AND
                                                                                  S.HotelID = SMFR.ServiceHotelID AND
                                                                                  S.OrderID = SMFR.OrderID
                                    LEFT OUTER JOIN service_made_for_guest SMFG
                                                    ON S.HotelID = SMFG.HotelID AND S.OrderID = SMFG.OrderID AND
                                                       S.ServiceID = SMFG.ServiceID
                           WHERE S.OrderID = O.OrderID), 0),
    O.OrderPrice        = (SELECT SUM(RoomPrice)
                           FROM (SELECT DISTINCT OD.RoomNumber,
                                                 SC.DiscountCoefficient,
                                                 ROUND(getRoomPrice(O_inner.HotelID, O_inner.CheckInDate,
                                                                    O_inner.CheckOutDate, OD.RoomType) *
                                                       SC.DiscountCoefficient, 2) RoomPrice
                                 FROM `order` O_inner
                                          INNER JOIN order_details OD ON O_inner.OrderID = OD.OrderID
                                          INNER JOIN guest G ON O_inner.PayerID = G.GuestID
                                          LEFT OUTER JOIN special_category SC ON G.SpecialCategoryID = SC.SpecialCategoryID
                                 WHERE O_inner.OrderID = O.OrderID) room_prices) + O.PaidServicesTotal
WHERE O.OrderID = 1
  AND O.HotelID = 1;

UPDATE `order`
SET PaymentDateTime = NOW()
WHERE OrderID = 1
  AND HotelID = 1;

UPDATE `order`
SET OrderStatus = 'Past'
WHERE OrderID = 1
  AND HotelID = 1;

## ----

#------------------

# 5

## DO NOT INCLUDE IN REPORT
INSERT INTO `order` (HotelID, OrderDateTime, CheckInDate, CheckOutDate, OrderStatus, PaymentMethod,
                     UserEmail, PayerID)
VALUES (1,
        NOW(),
        '2020-12-15',
        '2020-12-17',
        'Reserved',
        'Cash',
        'mona.rizvi@nu.edu.kz',
        1);

CALL addRoomToOrder(3, 1, 'Single', 2);
## ----

UPDATE guest G
    INNER JOIN (SELECT GuestID, IFNULL(SUM(OrderPrice), 0) TotalSpent
                FROM (SELECT G.GuestID, O.OrderPrice
                      FROM guest G
                               INNER JOIN `order` O ON O.PayerID = G.GuestID
                      WHERE O.OrderDateTime >= '2020-01-01 00:00:00'
                      GROUP BY O.OrderID) GuestOrders
                GROUP BY GuestID) GuestTotals ON GuestTotals.GuestID = G.GuestID
SET G.SpecialCategoryID = (CASE
                               WHEN TotalSpent >= 1000 AND SpecialCategoryID = 1 THEN 2
                               ELSE SpecialCategoryID
    END);

#------------
