package com.example.sweproj;

import com.example.sweproj.models.User;
import com.example.sweproj.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

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
        this.deleteHotelReservationProcedure();
        this.insertSeasonWeekDayProcedure();
        this.deleteSeasonProcedure();
        this.insertSeasonProcedure();
        this.createAdminAccounts();
    }
    // CREATION OF TEST ADMINS AND MODERATORS
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    void createAdminAccounts() {
        try {
            for (int i = 1; i <= 4; i++) {
                User admin = new User();
                admin.setFirstName("Test");
                admin.setLastName("Admin");
                admin.setDateOfBirth("2000-01-01");
                admin.setGender("Male");
                admin.setPassword("123123");
                admin.encodePassword(passwordEncoder.encode(admin.getPassword()));
                admin.setEmail("admin_" + i + "@amita.kz");
                userService.addUser(admin);
                User moderator = new User();
                moderator.setFirstName("Test");
                moderator.setLastName("Moderator");
                moderator.setDateOfBirth("2000-01-01");
                moderator.setGender("Male");
                moderator.setPassword("123123");
                moderator.setEmail("moderator_" + i + "@amita.kz");
                moderator.encodePassword(passwordEncoder.encode(moderator.getPassword()));
                userService.addUser(moderator);
            }
        } catch(Exception e) {
        }
    }
    // --------------------------------------

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

    void deleteHotelReservationProcedure() {
        String dropProcedureSql = "DROP PROCEDURE IF EXISTS deleteHotelReservation;";
        String createProcedureSql = "CREATE PROCEDURE deleteHotelReservation(IN _orderId INT, IN _userEmail VARCHAR(45))\n" +
                "BEGIN\n" +
                "    DECLARE EXIT HANDLER FOR SQLEXCEPTION\n" +
                "        BEGIN\n" +
                "            ROLLBACK;\n" +
                "            RESIGNAL;\n" +
                "        END;\n" +
                "\n" +
                "    START TRANSACTION;\n" +
                "    SELECT MAX(O.OrderID)\n" +
                "    INTO _orderId\n" +
                "    FROM `order` O\n" +
                "             INNER JOIN employee EM ON EM.UserEmail = _userEmail AND EM.HotelID = O.HotelID\n" +
                "    WHERE O.OrderID = _orderId;\n" +
                "\n" +
                "    IF _orderId IS NULL THEN\n" +
                "        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access error, trying to delete reservation from another hotel';\n" +
                "    END IF;\n" +
                "\n" +
                "    DELETE O, OD\n" +
                "    FROM order_details OD\n" +
                "             INNER JOIN `order` O on O.OrderID = OD.OrderID and O.HotelID = OD.OrderHotelID\n" +
                "    WHERE O.OrderID = _orderId;\n" +
                "\n" +
                "    COMMIT;\n" +
                "END;";
        jdbcTemplate.execute(dropProcedureSql);
        jdbcTemplate.execute(createProcedureSql);
    }

    void insertSeasonWeekDayProcedure() {
        String dropProcedureSql = "DROP PROCEDURE IF EXISTS insertSeasonWeekDay;";
        String createProcedureSql = "CREATE PROCEDURE insertSeasonWeekDay(IN _seasonId INT, IN _userEmail VARCHAR(45), IN _dayOfWeek VARCHAR(15),\n" +
                "                                  IN _coefficient FLOAT)\n" +
                "BEGIN\n" +
                "    DECLARE EXIT HANDLER FOR SQLEXCEPTION\n" +
                "        BEGIN\n" +
                "            ROLLBACK;\n" +
                "            RESIGNAL;\n" +
                "        END;\n" +
                "\n" +
                "    START TRANSACTION;\n" +
                "\n" +
                "    SELECT MAX(S.SeasonID)\n" +
                "    INTO _seasonId\n" +
                "    FROM season S\n" +
                "             INNER JOIN hotel_works_during_season hwds ON S.SeasonID = hwds.SeasonID\n" +
                "             INNER JOIN employee e ON e.HotelID = hwds.HotelID AND e.UserEmail = _userEmail\n" +
                "    WHERE S.SeasonID = _seasonId;\n" +
                "\n" +
                "    IF _seasonId IS NULL THEN\n" +
                "        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access error, trying to edit season from another hotel';\n" +
                "    end if;\n" +
                "\n" +
                "    IF _coefficient <= 0.01 THEN\n" +
                "        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = 'Coefficient should be at least 0.01';\n" +
                "    end if;\n" +
                "\n" +
                "\n" +
                "    INSERT INTO season_has_day_of_week\n" +
                "        (SeasonID, DayOfWeek, Coefficient)\n" +
                "    VALUES (_seasonId, _dayOfWeek, _coefficient)\n" +
                "    ON DUPLICATE KEY UPDATE SeasonID = _seasonId,\n" +
                "                            DayOfWeek  = _dayOfWeek,\n" +
                "                            Coefficient  = _coefficient;\n" +
                "\n" +
                "    COMMIT;\n" +
                "END;";
        jdbcTemplate.execute(dropProcedureSql);
        jdbcTemplate.execute(createProcedureSql);
    }

    void deleteSeasonProcedure() {
        String dropProcedureSql = "DROP PROCEDURE IF EXISTS deleteSeason;";
        String createProcedureSql = "CREATE PROCEDURE deleteSeason(IN _seasonId INT, IN _userEmail VARCHAR(45))\n" +
                "BEGIN\n" +
                "    DECLARE EXIT HANDLER FOR SQLEXCEPTION\n" +
                "        BEGIN\n" +
                "            ROLLBACK;\n" +
                "            RESIGNAL;\n" +
                "        END;\n" +
                "\n" +
                "    START TRANSACTION;\n" +
                "\n" +
                "    SELECT MAX(S.SeasonID)\n" +
                "    INTO _seasonId\n" +
                "    FROM season S\n" +
                "             INNER JOIN hotel_works_during_season hwds ON S.SeasonID = hwds.SeasonID\n" +
                "             INNER JOIN employee e ON e.HotelID = hwds.HotelID AND e.UserEmail = _userEmail\n" +
                "    WHERE S.SeasonID = _seasonId;\n" +
                "\n" +
                "   IF _seasonId IS NULL THEN\n" +
                "        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access error, trying to delete season from another hotel';\n" +
                "    end if;\n" +
                "\n" +
                "    DELETE FROM hotel_works_during_season hwds WHERE hwds.SeasonID = _seasonId;\n" +
                "\n" +
                "    DELETE FROM season_has_day_of_week shdow WHERE shdow.SeasonID = _seasonId;\n" +
                "\n" +
                "    DELETE\n" +
                "    FROM season\n" +
                "    WHERE SeasonID = _seasonId;" +
                "\n" +
                "    COMMIT;\n" +
                "END;";
        jdbcTemplate.execute(dropProcedureSql);
        jdbcTemplate.execute(createProcedureSql);
    }

    void insertSeasonProcedure() {
        String dropProcedureSql = "DROP PROCEDURE IF EXISTS insertSeason;";
        String createProcedureSql = "CREATE PROCEDURE insertSeason(IN _name VARCHAR(45), IN _startDate DATE, IN _endDate DATE,\n" +
                "                                  IN _advisory TEXT, IN _userEmail VARCHAR(45))\n" +
                "BEGIN\n" +
                "    DECLARE _hotelId INT;\n" +
                "\n" +
                "    DECLARE EXIT HANDLER FOR SQLEXCEPTION\n" +
                "        BEGIN\n" +
                "            ROLLBACK;\n" +
                "            RESIGNAL;\n" +
                "        END;\n" +
                "\n" +
                "    START TRANSACTION;\n" +
                "\n" +
                "    SELECT MAX(e.HotelID)\n" +
                "    INTO _hotelId\n" +
                "    FROM employee e\n" +
                "    WHERE e.UserEmail = _userEmail;\n" +
                "\n" +
                "    IF _hotelId IS NULL THEN\n" +
                "        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access error, you do not work in any hotel';\n" +
                "    end if;\n" +
                "\n" +
                "    IF _endDate <= _startDate THEN\n" +
                "        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = 'End date should be later than start date';\n" +
                "    end if;\n" +
                "\n" +
                "    INSERT INTO season\n" +
                "        (Name, StartDate, EndDate)\n" +
                "    VALUES (_name, _startDate, _endDate);\n" +
                "\n" +
                "    INSERT INTO hotel_works_during_season\n" +
                "        (HotelID, SeasonID, Advisory)\n" +
                "    VALUES (_hotelId, LAST_INSERT_ID(), _advisory);\n" +
                "    COMMIT;\n" +
                "END;";
        jdbcTemplate.execute(dropProcedureSql);
        jdbcTemplate.execute(createProcedureSql);
    }
}
