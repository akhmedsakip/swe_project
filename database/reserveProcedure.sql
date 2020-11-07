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

    SET _personId = 0;
    SET _roomNumber = NULL;

    START TRANSACTION;
    SELECT PersonID INTO _personId FROM GUEST
        INNER JOIN PERSON ON PERSON.PersonID = GuestID
        WHERE PERSON.PhoneNumber = _phoneNumber LIMIT 1;

    IF _personId < 1 THEN
        INSERT INTO PERSON (Gender, FirstName, LastName, PhoneNumber) VALUES (
        _gender,
        _firstName,
        _lastName,
        _phoneNumber
       );
        SELECT LAST_INSERT_ID() INTO _personId;
        INSERT INTO GUEST (GuestID) VALUE (_personId);
    END IF;

    INSERT INTO `ORDER` (HotelID, OrderPrice, OrderDateTime, CheckInDate, CheckOutDate, OrderStatus, PaymentMethod) VALUES (
    _hotelId,
    _orderPrice,
    _orderDateTime,
    _checkInDate,
    _checkOutDate,
    'Created',
    _paymentMethod
   );

    SELECT ROOM.RoomNumber INTO _roomNumber
    FROM ROOM
    INNER JOIN HOTEL ON HOTEL.HotelID = ROOM.HotelID
    INNER JOIN ROOMTYPE ON ROOMTYPE.HotelID = ROOM.HotelID AND ROOM.RoomTypeName = ROOMTYPE.Name
    LEFT JOIN ORDERDETAILS OD on ROOM.HotelID = OD.RoomHotelID and ROOM.RoomNumber = OD.RoomNumber
    LEFT JOIN `ORDER` O ON HOTEL.HotelID = O.HotelID and OD.OrderID = O.OrderID
    WHERE (O.OrderID IS NULL
        OR NOT
           (O.CheckInDate BETWEEN _checkInDate AND _checkOutDate
           OR
           O.CheckOutDate BETWEEN _checkInDate AND _checkOutDate))
        AND HOTEL.HotelID = _hotelId
        AND ROOMTYPE.Name >= _roomTypeName LIMIT 1;

    INSERT INTO ORDERDETAILS (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID, RoomNumber, GuestID) VALUES (
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
    '+77028606010', 210, 50,
    '2020-06-05', '2020-06-11', '2020-06-20',
    'Cash', 'Luxe');

