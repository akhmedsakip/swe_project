package com.example.sweproj.services;

import com.example.sweproj.models.ReservationQuery;
import com.example.sweproj.models.Room;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ReservationQueryDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    ReservationQueryDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<Room> getAvailableRooms(ReservationQuery query) {
        String sql = "SELECT room.RoomNumber, room.HotelID\n" +
                "FROM (SELECT room.RoomNumber, room.HotelID\n" +
                "        FROM orderdetails\n" +
                "        INNER JOIN `order` ON `order`.OrderID = orderdetails.OrderID AND `order`.HotelID = orderdetails.OrderHotelID\n" +
                "        INNER JOIN room ON room.RoomNumber = orderdetails.RoomNumber AND room.HotelID = orderdetails.RoomHotelID\n" +
                "        WHERE\n" +
                "                (`order`.CheckInDate BETWEEN ? AND ?\n" +
                "                OR\n" +
                "                `order`.CheckOutDate BETWEEN ? AND ?)) derived\n" +
                "RIGHT JOIN room ON room.RoomNumber = derived.RoomNumber AND room.HotelID = derived.HotelID\n" +
                "INNER JOIN roomtype on room.RoomTypeHotelID = roomtype.HotelID and room.RoomTypeName = roomtype.Name\n" +
                "INNER JOIN hotel on hotel.HotelID = room.HotelID\n" +
                "WHERE derived.RoomNumber IS NULL\n" +
                "  AND hotel.City = ?\n" +
                "  AND roomtype.Capacity >= ?";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Room room = new Room();
            room.hotelID = rs.getInt("HotelID");
            room.roomNumber = rs.getString("RoomNumber");
            return room;
        }, query.checkInDate, query.checkOutDate, query.checkInDate, query.checkOutDate, query.city, query.numberOfPeople);
    }
}
