package com.example.sweproj.services;

import com.example.sweproj.controllers.RoomTypeController;
import com.example.sweproj.models.ReservationDetailsRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public class ReservationDataAccessService {
    private final JdbcTemplate jdbcTemplate;
    private final RoomTypeService roomTypeService;

    public ReservationDataAccessService(RoomTypeController roomTypeController, JdbcTemplate jdbcTemplate, RoomTypeService roomTypeService) {
        this.jdbcTemplate = jdbcTemplate;
        this.roomTypeService = roomTypeService;
    }

    public int reserveRoom(ReservationDetailsRequest info) {
        String sql1 = "DROP PROCEDURE IF EXISTS reserve;\n";
        String sql2 = "CREATE PROCEDURE reserve(IN _gender VARCHAR(10), IN _firstName VARCHAR(30),\n" +
                "                         IN _lastName VARCHAR(30), IN _phoneNumber VARCHAR(45), IN _hotelId INT, IN _orderPrice INT,\n" +
                "                         IN _orderDateTime VARCHAR(20), IN _checkInDate VARCHAR(20), IN _checkOutDate VARCHAR(20),\n" +
                "                         IN _paymentMethod VARCHAR(45), IN _roomTypeName varchar(45))\n" +
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
                "    INSERT INTO `order` (HotelID, OrderPrice, OrderDateTime, CheckInDate, CheckOutDate, OrderStatus, PaymentMethod)\n" +
                "    VALUES (_hotelId,\n" +
                "            _orderPrice,\n" +
                "            _orderDateTime,\n" +
                "            _checkInDate,\n" +
                "            _checkOutDate,\n" +
                "            'Reserved',\n" +
                "            _paymentMethod);\n" +
                "\n" +
                "    SELECT DISTINCT room.RoomNumber\n" +
                "    INTO _roomNumber\n" +
                "    FROM room\n" +
                "             INNER JOIN hotel ON hotel.HotelID = room.HotelID\n" +
                "             INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name\n" +
                "             LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber\n" +
                "             LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID\n" +
                "    WHERE (O.OrderID IS NULL\n" +
                "        OR (SELECT `order`.CheckOutDate\n" +
                "            FROM `order`\n" +
                "                     INNER JOIN order_details d on `order`.OrderID = d.OrderID and `order`.HotelID = d.OrderHotelID\n" +
                "            WHERE d.RoomNumber = room.RoomNumber\n" +
                "              AND (`order`.CheckInDate BETWEEN _checkInDate AND _checkOutDate OR\n" +
                "                   `order`.CheckOutDate BETWEEN _checkInDate AND _checkOutDate)) IS NULL)\n" +
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
        String sql3 = "CALL reserve(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        jdbcTemplate.execute(sql1);
        jdbcTemplate.execute(sql2);

        int roomTotalPrice = roomTypeService.getTotalPrice(info.getReservationRequest());

        return jdbcTemplate.update(sql3, info.getGuest().getGender(), info.getGuest().getFirstName(),
                info.getGuest().getLastName(), info.getGuest().getPhoneNumber(), info.getReservationRequest().getHotelId(),
                roomTotalPrice, LocalDate.now(), info.getReservationRequest().getCheckInDate(),
                info.getReservationRequest().getCheckOutDate(), "Cash", info.getReservationRequest().getRoomTypeName());
    }
}
