package com.example.sweproj.services;

import com.example.sweproj.models.ReservationQuery;
import com.example.sweproj.models.RoomType;
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

    List<RoomType> getAvailableRoomTypes(ReservationQuery query) {
        String sql = "SELECT roomtype.Name, roomtype.HotelID, COUNT(roomtype.Name) RoomTypesCount\n" +
                "FROM room\n" +
                "INNER JOIN hotel ON hotel.HotelID = room.HotelID\n" +
                "INNER JOIN roomtype ON roomtype.HotelID = room.HotelID AND room.RoomTypeName = roomtype.Name\n" +
                "LEFT JOIN orderdetails od on room.HotelID = od.RoomHotelID and room.RoomNumber = od.RoomNumber\n" +
                "LEFT JOIN `order` o ON hotel.HotelID = o.HotelID and od.OrderID = o.OrderID\n" +
                "WHERE (o.OrderID IS NULL\n" +
                "    OR NOT\n" +
                "       (o.CheckInDate BETWEEN ? AND ?\n" +
                "       OR\n" +
                "       o.CheckOutDate BETWEEN ? AND ?))\n" +
                "    AND hotel.City = ?\n" +
                "    AND roomtype.Capacity >= ?\n" +
                "GROUP BY roomtype.Name, roomtype.HotelID;";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            RoomType roomType = new RoomType();
            roomType.hotelID = rs.getInt("HotelID");
            roomType.name = rs.getString("Name");
            roomType.freeCount = rs.getInt("RoomTypesCount");
            return roomType;
        }, query.checkInDate, query.checkOutDate, query.checkInDate, query.checkOutDate, query.city, query.numberOfPeople);
    }
}
