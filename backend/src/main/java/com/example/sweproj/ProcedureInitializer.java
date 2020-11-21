package com.example.sweproj;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
public class ProcedureInitializer {
    private final JdbcTemplate jdbcTemplate;

    ProcedureInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    void initializeProcedures() {
        this.createPriceProcedure();
        this.createReservationProcedure();
        this.insertWorkingDayProcedure();
        this.deleteWorkingDayProcedure();
    }

    void createPriceProcedure() {
        String dropProcedureSql = "DROP FUNCTION IF EXISTS getPrice;";
        String createProcedureSql = "CREATE FUNCTION getPrice(_hotelId INT, _checkInDate DATE, _checkOutDate DATE,\n" +
                "                             _roomTypeName VARCHAR(45))\n" +
                "    RETURNS INT\n" +
                "    READS SQL DATA\n" +
                "    DETERMINISTIC\n" +
                "BEGIN\n" +
                "    DECLARE _date VARCHAR(20);\n" +
                "    DECLARE _coefficient FLOAT;\n" +
                "    DECLARE _basePrice INT;\n" +
                "    DECLARE _totalPrice INT;\n" +
                "\n" +
                "    SET _totalPrice = 0;\n" +
                "    SET _date = _checkInDate;\n" +
                "\n" +
                "    SELECT room_type.BasePricePerDay\n" +
                "    INTO _basePrice\n" +
                "    FROM room_type\n" +
                "    WHERE room_type.Name = _roomTypeName\n" +
                "      AND room_type.HotelID = _hotelId\n" +
                "    LIMIT 1;\n" +
                "\n" +
                "    WHILE _date < _checkOutDate\n" +
                "        DO\n" +
                "            SELECT Coefficient\n" +
                "            INTO _coefficient\n" +
                "            FROM hotel_works_during_holiday hwdh\n" +
                "                     INNER JOIN holiday ON holiday.HolidayID = hwdh.HolidayID\n" +
                "            WHERE _date BETWEEN holiday.StartDate AND holiday.EndDate\n" +
                "              AND hwdh.HotelID = _hotelId\n" +
                "            LIMIT 1;\n" +
                "\n" +
                "            IF _coefficient IS NULL THEN\n" +
                "                SELECT shdow.Coefficient\n" +
                "                INTO _coefficient\n" +
                "                FROM hotel_works_during_season hwds\n" +
                "                         INNER JOIN season on hwds.SeasonID = season.SeasonID\n" +
                "                         INNER JOIN season_has_day_of_week shdow on season.SeasonID = shdow.SeasonID\n" +
                "                         INNER JOIN day_of_week dow ON shdow.DayOfWeek = dow.Day\n" +
                "                WHERE _date BETWEEN season.StartDate AND season.EndDate\n" +
                "                  AND dow.Day = DAYNAME(_date)\n" +
                "                  AND hwds.HotelID = _hotelId\n" +
                "                LIMIT 1;\n" +
                "            END IF;\n" +
                "\n" +
                "            IF _coefficient IS NULL THEN\n" +
                "                SET _coefficient = 1;\n" +
                "            END IF;\n" +
                "\n" +
                "            SET _totalPrice = _totalPrice + CEIL(_basePrice * ROUND(_coefficient, 4));\n" +
                "            SET _date = DATE_ADD(_date, INTERVAL 1 DAY);\n" +
                "        END WHILE;\n" +
                "    RETURN _totalPrice;\n" +
                "END;";
        jdbcTemplate.execute(dropProcedureSql);
        jdbcTemplate.execute(createProcedureSql);
    }

    void createReservationProcedure() {
        String dropProcedureSql = "DROP PROCEDURE IF EXISTS reserve;";
        String createProcedureSql = "CREATE PROCEDURE reserve(IN _gender VARCHAR(10), IN _firstName VARCHAR(30),\n" +
                "                         IN _lastName VARCHAR(30), IN _phoneNumber VARCHAR(45), IN _hotelId INT, IN _orderPrice INT,\n" +
                "                         IN _checkInDate VARCHAR(20), IN _checkOutDate VARCHAR(20),\n" +
                "                         IN _paymentMethod VARCHAR(45), IN _roomTypeName varchar(45), IN _userEmail VARCHAR(45))\n" +
                "BEGIN\n" +
                "    DECLARE _personId INT;\n" +
                "    DECLARE _roomNumber VARCHAR(10);\n" +
                "\n" +
                "    DECLARE EXIT HANDLER FOR SQLEXCEPTION\n" +
                "        BEGIN\n" +
                "            ROLLBACK;\n" +
                "            RESIGNAL;\n" +
                "        END;\n" +
                "\n" +
                "    START TRANSACTION;\n" +
                "    SELECT PersonID\n" +
                "    INTO _personId\n" +
                "    FROM guest\n" +
                "             INNER JOIN person ON person.PersonID = GuestID\n" +
                "    WHERE person.PhoneNumber = _phoneNumber\n" +
                "    LIMIT 1;\n" +
                "\n" +
                "    IF _personId IS NULL THEN\n" +
                "        INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)\n" +
                "        VALUES (_gender,\n" +
                "                _firstName,\n" +
                "                _lastName,\n" +
                "                _phoneNumber);\n" +
                "        SELECT LAST_INSERT_ID() INTO _personId;\n" +
                "        INSERT INTO guest (GuestID) VALUE (_personId);\n" +
                "    END IF;\n" +
                "\n" +
                "    INSERT INTO `order` (HotelID, OrderPrice, OrderDateTime, CheckInDate, CheckOutDate, OrderStatus, PaymentMethod,\n" +
                "                         UserEmail)\n" +
                "    VALUES (_hotelId,\n" +
                "            _orderPrice,\n" +
                "            NOW(),\n" +
                "            _checkInDate,\n" +
                "            _checkOutDate,\n" +
                "            'Reserved',\n" +
                "            _paymentMethod,\n" +
                "            _userEmail);\n" +
                "\n" +
                "    SELECT DISTINCT room.RoomNumber\n" +
                "    INTO _roomNumber\n" +
                "    FROM room\n" +
                "             INNER JOIN hotel ON hotel.HotelID = room.HotelID\n" +
                "             INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name\n" +
                "             LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber\n" +
                "             LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID\n" +
                "    WHERE (O.OrderID IS NULL\n" +
                "        OR NOT EXISTS (SELECT `order`.CheckOutDate\n" +
                "            FROM `order`\n" +
                "                     INNER JOIN order_details d on `order`.OrderID = d.OrderID and `order`.HotelID = d.OrderHotelID\n" +
                "            WHERE d.RoomNumber = room.RoomNumber\n" +
                "              AND (`order`.CheckInDate BETWEEN _checkInDate AND DATE_SUB(_checkOutDate, INTERVAL 1 DAY) OR\n" +
                "                   `order`.CheckOutDate BETWEEN DATE_ADD(_checkInDate, INTERVAL 1 DAY) AND _checkOutDate)))\n" +
                "      AND hotel.HotelID = _hotelId\n" +
                "      AND room_type.Name = _roomTypeName\n" +
                "    LIMIT 1;\n" +
                "\n" +
                "    IF _roomNumber IS NULL OR _checkOutDate <= _checkInDate THEN\n" +
                "        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'There is no free room';\n" +
                "    end if;\n" +
                "\n" +
                "    INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID, RoomNumber,\n" +
                "                               GuestID)\n" +
                "    VALUES (TRUE,\n" +
                "            LAST_INSERT_ID(),\n" +
                "            _hotelId,\n" +
                "            _hotelId,\n" +
                "            _roomTypeName,\n" +
                "            _hotelId,\n" +
                "            _roomNumber,\n" +
                "            _personId);\n" +
                "    COMMIT;\n" +
                "END;";
        jdbcTemplate.execute(dropProcedureSql);
        jdbcTemplate.execute(createProcedureSql);
    }

    void insertWorkingDayProcedure() {
        String dropProcedureSql = "DROP PROCEDURE IF EXISTS insertWorkingDay;";
        String createProcedureSql = "CREATE PROCEDURE insertWorkingDay(IN _employeeId INT, IN _userEmail VARCHAR(45), IN _dayOfWeek VARCHAR(15),\n" +
                "                                  IN _startTime TIME,\n" +
                "                                  IN _endTime TIME)\n" +
                "BEGIN\n" +
                "    DECLARE EXIT HANDLER FOR SQLEXCEPTION\n" +
                "        BEGIN\n" +
                "            ROLLBACK;\n" +
                "            RESIGNAL;\n" +
                "        END;\n" +
                "\n" +
                "    START TRANSACTION;\n" +
                "    SELECT MAX(E.EmployeeID)\n" +
                "    INTO _employeeId\n" +
                "    FROM employee E\n" +
                "             INNER JOIN employee EM ON EM.UserEmail = _userEmail AND EM.HotelID = E.HotelID\n" +
                "    WHERE E.EmployeeID = _employeeId;\n" +
                "\n" +
                "    IF _employeeId IS NULL THEN\n" +
                "        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access error, trying to edit someone from another hotel';\n" +
                "    end if;\n" +
                "\n" +
                "    IF _endTime <= _startTime THEN\n" +
                "        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = 'End time should be later than start time';\n" +
                "    end if;\n" +
                "\n" +
                "\n" +
                "    INSERT INTO employee_works_on_day_of_week\n" +
                "        (EmployeeID, DayOfWeek, StartTime, EndTime)\n" +
                "    VALUES (_employeeId, _dayOfWeek, _startTime, _endTime)\n" +
                "    ON DUPLICATE KEY UPDATE EmployeeID = _employeeId,\n" +
                "                            DayOfWeek  = _dayOfWeek,\n" +
                "                            StartTime  = _startTime,\n" +
                "                            EndTime    = _endTime;\n" +
                "\n" +
                "    COMMIT;\n" +
                "END;";
        jdbcTemplate.execute(dropProcedureSql);
        jdbcTemplate.execute(createProcedureSql);
    }

    void deleteWorkingDayProcedure() {
        String dropProcedureSql = "DROP PROCEDURE IF EXISTS deleteWorkingDay;";
        String createProcedureSql = "CREATE PROCEDURE deleteWorkingDay(IN _employeeId INT, IN _userEmail VARCHAR(45), IN _dayOfWeek VARCHAR(15))\n" +
                "BEGIN\n" +
                "    DECLARE EXIT HANDLER FOR SQLEXCEPTION\n" +
                "        BEGIN\n" +
                "            ROLLBACK;\n" +
                "            RESIGNAL;\n" +
                "        END;\n" +
                "\n" +
                "    START TRANSACTION;\n" +
                "    SELECT MAX(E.EmployeeID)\n" +
                "    INTO _employeeId\n" +
                "    FROM employee E\n" +
                "             INNER JOIN employee EM ON EM.UserEmail = _userEmail AND EM.HotelID = E.HotelID\n" +
                "    WHERE E.EmployeeID = _employeeId;\n" +
                "\n" +
                "    IF _employeeId IS NULL THEN\n" +
                "        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access error, trying to edit someone from another hotel';\n" +
                "    END IF;\n" +
                "\n" +
                "\n" +
                "    DELETE\n" +
                "    FROM employee_works_on_day_of_week\n" +
                "    WHERE EmployeeID = _employeeId\n" +
                "      AND DayOfWeek = _dayOfWeek;\n" +
                "    COMMIT;\n" +
                "END;";
        jdbcTemplate.execute(dropProcedureSql);
        jdbcTemplate.execute(createProcedureSql);
    }
}
