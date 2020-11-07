DROP PROCEDURE IF EXISTS reserve;

CREATE PROCEDURE reserve(IN _gender VARCHAR(10), IN _firstname VARCHAR(30),
                         IN _lastname VARCHAR(30), IN _phonenumber VARCHAR(45), IN _hotelid INT, IN _orderprice INT,
                         IN _orderdatetime VARCHAR(20), IN _checkindate VARCHAR(20), IN _checkoutdate VARCHAR(20),
                         IN _paymentmethod VARCHAR(45), IN _roomtypename varchar(45))
BEGIN
    DECLARE _personid INT;
    DECLARE _roomnumber VARCHAR(10);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
        END;

    SET _personid = 0;
    SET _roomnumber = NULL;

    START TRANSACTION;
    SELECT personid
    INTO _personid
    FROM guest
             INNER JOIN person ON person.personid = guestid
    WHERE person.phonenumber = _phonenumber
    LIMIT 1;

    IF _personid < 1 THEN
        INSERT INTO person (gender, firstname, lastname, phonenumber)
        VALUES (_gender,
                _firstname,
                _lastname,
                _phonenumber);
        SELECT LAST_INSERT_ID() INTO _personid;
        INSERT INTO guest (guestid) VALUE (_personid);
    END IF;

    INSERT INTO `order` (hotelid, orderprice, orderdatetime, checkindate, checkoutdate, orderstatus, paymentmethod)
    VALUES (_hotelid,
            _orderprice,
            _orderdatetime,
            _checkindate,
            _checkoutdate,
            'Created',
            _paymentmethod);

    SELECT room.roomnumber
    INTO _roomnumber
    FROM room
             INNER JOIN hotel ON hotel.hotelid = room.hotelid
             INNER JOIN roomtype ON roomtype.hotelid = room.hotelid AND room.roomtypename = roomtype.name
             LEFT JOIN orderdetails od on room.hotelid = od.roomhotelid and room.roomnumber = od.roomnumber
             LEFT JOIN `order` o ON hotel.hotelid = o.hotelid and od.orderid = o.orderid
    WHERE (o.orderid IS NULL
        OR NOT
               (o.checkindate BETWEEN _checkindate AND _checkoutdate
                   OR
                o.checkoutdate BETWEEN _checkindate AND _checkoutdate))
      AND hotel.hotelid = _hotelid
      AND roomtype.name >= _roomtypename
    LIMIT 1;

    INSERT INTO orderdetails (ispayer, orderid, orderhotelid, roomtypehotelid, roomtype, roomhotelid, roomnumber,
                              guestid)
    VALUES (TRUE,
            LAST_INSERT_ID(),
            _hotelid,
            _hotelid,
            _roomtypename,
            _hotelid,
            _roomnumber,
            _personid);
    COMMIT;
END;

CALL reserve('Male', 'Timur', 'Rakhimzhan',
             '+77028606010', 210, 50,
             '2020-06-05', '2020-06-11', '2020-06-20',
             'Cash', 'Luxe');