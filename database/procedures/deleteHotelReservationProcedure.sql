DROP PROCEDURE IF EXISTS deleteHotelReservation;

CREATE PROCEDURE deleteHotelReservation(IN _orderId INT, IN _userEmail VARCHAR(45))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;

    START TRANSACTION;
    SELECT MAX(O.OrderID)
    INTO _orderId
    FROM `order` O
             INNER JOIN employee EM ON EM.UserEmail = _userEmail AND EM.HotelID = O.HotelID
    WHERE O.OrderID = _orderId;

    IF _orderId IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access error, trying to delete reservation from another hotel';
    END IF;

    DELETE O, OD
    FROM order_details OD
             INNER JOIN `order` O on O.OrderID = OD.OrderID and O.HotelID = OD.OrderHotelID
    WHERE O.OrderID = _orderId;

    COMMIT;
END;

CALL deleteHotelReservation(5, 'akhmed.sakip@nu.edu.kz');