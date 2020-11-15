
DROP FUNCTION IF EXISTS getPrice;

CREATE FUNCTION getPrice(_hotelId INT, _checkInDate DATE, _checkOutDate DATE,
                         _roomTypeName VARCHAR(45))
    RETURNS INT
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _resultN INT;
    SET _resultN=5;
    RETURN _resultN;
END;
