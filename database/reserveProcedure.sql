DROP PROCEDURE IF EXISTS reserve;

CREATE PROCEDURE reserve(IN _gender VARCHAR(10), IN _firstName VARCHAR(30),
 IN _lastName VARCHAR(30), IN _phoneNumber VARCHAR(45), IN _hotelId INT, IN _orderPrice INT,
 IN _orderDateTime VARCHAR(20), IN _checkInDate VARCHAR(20), IN _checkOutDate VARCHAR(20),
 IN _paymentMethod VARCHAR(45), IN _roomTypeName varchar(45))
BEGIN
    DECLARE _personId INT;
    DECLARE _roomNumber VARCHAR(10);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    SET _personId = NULL;
    SET _roomNumber = NULL;

    START TRANSACTION;
    SELECT PersonID INTO _personId FROM guest
        INNER JOIN person ON person.PersonID = GuestID
        WHERE person.PhoneNumber = _phoneNumber LIMIT 1;

    IF _personId IS NULL THEN
        INSERT INTO person (Gender, FirstName, LastName, PhoneNumber) VALUES (
        _gender,
        _firstName,
        _lastName,
        _phoneNumber
       );
        SELECT LAST_INSERT_ID() INTO _personId;
        INSERT INTO guest (GuestID) VALUE (_personId);
    END IF;

    INSERT INTO `order` (HotelID, OrderPrice, OrderDateTime, CheckInDate, CheckOutDate, OrderStatus, PaymentMethod) VALUES (
    _hotelId,
    _orderPrice,
    _orderDateTime,
    _checkInDate,
    _checkOutDate,
    'Reserved',
    _paymentMethod
   );

    SELECT room.RoomNumber INTO _roomNumber
    FROM room
    INNER JOIN hotel ON hotel.HotelID = room.HotelID
    INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name
    LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber
    LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID
    WHERE (O.OrderID IS NULL
        OR NOT
           (O.CheckInDate BETWEEN _checkInDate AND _checkOutDate
           OR
           O.CheckOutDate BETWEEN _checkInDate AND _checkOutDate))
        AND hotel.HotelID = _hotelId
        AND room_type.Name >= _roomTypeName LIMIT 1;

    INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID, RoomNumber, GuestID) VALUES (
    TRUE,
    LAST_INSERT_ID(),
    _hotelId,
    _hotelId,
    _roomTypeName,
    _hotelId,
    _roomNumber,
    _personId);
    COMMIT;
END;

CALL reserve('Male', 'Timur', 'Rakhimzhan',
    '+77028606010', 1, 50,
    '2020-06-05', '2020-06-11', '2020-06-20',
    'Cash', 'Luxe');