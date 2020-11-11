DROP PROCEDURE IF EXISTS reserve;

CREATE PROCEDURE reserve(IN _gender VARCHAR(10), IN _firstName VARCHAR(30),
                         IN _lastName VARCHAR(30), IN _phoneNumber VARCHAR(45), IN _hotelId INT, IN _orderPrice INT,
                         IN _orderDateTime VARCHAR(20), IN _checkInDate VARCHAR(20), IN _checkOutDate VARCHAR(20),
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
            _orderDateTime,
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
              AND (`order`.CheckInDate BETWEEN _checkInDate AND _checkOutDate OR
                   `order`.CheckOutDate BETWEEN _checkInDate AND _checkOutDate)))
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


# SELECT DISTINCT *
# FROM room
#          INNER JOIN hotel ON hotel.HotelID = room.HotelID
#          INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name
#          LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber
#          LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID
# WHERE (O.OrderID IS NULL
#     OR (SELECT `order`.CheckOutDate
#         FROM `order`
#                  INNER JOIN order_details d on `order`.OrderID = d.OrderID and `order`.HotelID = d.OrderHotelID
#         WHERE d.RoomType = 'Standard'
#           AND (`order`.CheckInDate BETWEEN '2022-11-01' AND '2022-12-10' OR
#                `order`.CheckOutDate BETWEEN '2022-11-01' AND '2022-12-10')) IS NULL)
#   AND hotel.HotelID = 1
#   AND room_type.Name = 'Standard';
#
# CALL reserve('Male', 'Timur', 'Rakhimzhan',
#     '+77028606010', 1, 50,
#     '2020-06-05', '2020-06-11', '2020-06-20',
#     'Cash', 'Standard', 'akhmed.sakip@nu.edu.kz');

# INSERT INTO hotel_feature (Name) VALUE ('Test');
# INSERT INTO hotel_has_hotel_feature (HotelID, HotelFeatureName) VALUES(5, 'Hello');

# SELECT * FROM room WHERE RoomTypeName='Test';

#
# SELECT DISTINCT room.RoomNumber
# FROM room
#          INNER JOIN hotel ON hotel.HotelID = room.HotelID
#          INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name
#          LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber
#          LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID
# WHERE (O.OrderID IS NULL
#     OR (SELECT `order`.CheckOutDate
#         FROM `order`
#                  INNER JOIN order_details d on `order`.OrderID = d.OrderID and `order`.HotelID = d.OrderHotelID
#         WHERE d.RoomNumber = room.RoomNumber
#           AND (`order`.CheckInDate BETWEEN '2020-11-01' AND '2022-11-10' OR
#                `order`.CheckOutDate BETWEEN '2020-11-01' AND '2022-11-10')) IS NULL)
#   AND hotel.HotelID = 1
#   AND room_type.Name = 'Standard';
#
#
SELECT COUNT(DISTINCT room.RoomNumber) RoomTypesCount, room_type.*
FROM room
INNER JOIN hotel ON hotel.HotelID = room.HotelID
INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name
LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber
LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID
WHERE (O.OrderID IS NULL
    OR NOT EXISTS (SELECT `order`.CheckOutDate
        FROM `order`
                 INNER JOIN order_details d on `order`.OrderID = d.OrderID and `order`.HotelID = d.OrderHotelID
        WHERE d.RoomType = room.RoomTypeName
          AND (`order`.CheckInDate BETWEEN '2020-11-01' AND '2020-12-10' OR
               `order`.CheckOutDate BETWEEN '2020-11-01' AND '2020-12-10')))
    AND hotel.HotelID = 1
    AND room_type.Capacity >= 1
GROUP BY RoomTypeName, room.HotelID;