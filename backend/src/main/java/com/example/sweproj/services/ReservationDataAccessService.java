package com.example.sweproj.services;

import com.example.sweproj.models.ReservationDetailsRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public class ReservationDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    public ReservationDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int reserveRoom(ReservationDetailsRequest info) {
        String sql1 = "DROP PROCEDURE IF EXISTS reserve;\n";
        String sql2 = "CREATE PROCEDURE reserve(IN _gender VARCHAR(10), IN _firstName VARCHAR(30),\n" +
                " IN _lastName VARCHAR(30), IN _phoneNumber VARCHAR(45), IN _hotelId INT, IN _orderPrice INT,\n" +
                " IN _orderDateTime VARCHAR(20), IN _checkInDate VARCHAR(20), IN _checkOutDate VARCHAR(20),\n" +
                " IN _paymentMethod VARCHAR(45), IN _roomTypeName varchar(45))\n" +
                "BEGIN\n" +
                "    DECLARE _personId INT;\n" +
                "    DECLARE _roomNumber VARCHAR(10);\n" +
                "\n" +
                "    DECLARE EXIT HANDLER FOR SQLEXCEPTION\n" +
                "    BEGIN\n" +
                "        ROLLBACK;\n" +
                "    END;\n" +
                "\n" +
                "    SET _personId = 0;\n" +
                "    SET _roomNumber = NULL;\n" +
                "\n" +
                "    START TRANSACTION;\n" +
                "    SELECT PersonID INTO _personId FROM guest\n" +
                "        INNER JOIN person ON person.PersonID = GuestID\n" +
                "        WHERE person.PhoneNumber = _phoneNumber LIMIT 1;\n" +
                "\n" +
                "    IF _personId < 1 THEN\n" +
                "        INSERT INTO person (Gender, FirstName, LastName, PhoneNumber) VALUES (\n" +
                "        _gender,\n" +
                "        _firstName,\n" +
                "        _lastName,\n" +
                "        _phoneNumber\n" +
                "       );\n" +
                "        SELECT LAST_INSERT_ID() INTO _personId;\n" +
                "        INSERT INTO guest (GuestID) VALUE (_personId);\n" +
                "    END IF;\n" +
                "\n" +
                "    INSERT INTO `order` (HotelID, OrderPrice, OrderDateTime, CheckInDate, CheckOutDate, OrderStatus, PaymentMethod) VALUES (\n" +
                "    _hotelId,\n" +
                "    _orderPrice,\n" +
                "    _orderDateTime,\n" +
                "    _checkInDate,\n" +
                "    _checkOutDate,\n" +
                "    'Reserved',\n" +
                "    _paymentMethod\n" +
                "   );\n" +
                "\n" +
                "    SELECT room.RoomNumber INTO _roomNumber\n" +
                "    FROM room\n" +
                "    INNER JOIN hotel ON hotel.HotelID = room.HotelID\n" +
                "    INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name\n" +
                "    LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber\n" +
                "    LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID\n" +
                "    WHERE (O.OrderID IS NULL\n" +
                "        OR NOT\n" +
                "           (O.CheckInDate BETWEEN _checkInDate AND _checkOutDate\n" +
                "           OR\n" +
                "           O.CheckOutDate BETWEEN _checkInDate AND _checkOutDate))\n" +
                "        AND hotel.HotelID = _hotelId\n" +
                "        AND room_type.Name >= _roomTypeName LIMIT 1;\n" +
                "\n" +
                "    INSERT INTO order_details (IsPayer, OrderID, OrderHotelID, RoomTypeHotelID, RoomType, RoomHotelID, RoomNumber, GuestID) VALUES (\n" +
                "    TRUE,\n" +
                "    LAST_INSERT_ID(),\n" +
                "    _hotelId,\n" +
                "    _hotelId,\n" +
                "    _roomTypeName,\n" +
                "    _hotelId,\n" +
                "    _roomNumber,\n" +
                "    _personId);\n" +
                "    COMMIT;\n" +
                "END;\n";
        String sql3 = "CALL reserve(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        jdbcTemplate.execute(sql1);
        jdbcTemplate.execute(sql2);

        return jdbcTemplate.update(sql3, info.getGuest().getGender(), info.getGuest().getFirstName(),
                info.getGuest().getLastName(), info.getGuest().getPhoneNumber(), info.getReservationRequest().getHotelId(),
                100, LocalDate.now(), info.getReservationRequest().getCheckInDate(),
                info.getReservationRequest().getCheckOutDate(), "Cash", info.getReservationRequest().getRoomTypeName());
    }
}
