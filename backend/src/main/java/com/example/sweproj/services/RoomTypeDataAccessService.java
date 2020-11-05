package com.example.sweproj.services;

import com.example.sweproj.models.ReservationQuery;
import com.example.sweproj.models.RoomType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoomTypeDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    RoomTypeDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<RoomType> getRoomTypes(int hotelID) {
    String sql = "SELECT * FROM ROOMTYPE WHERE HotelID = ?";
    return jdbcTemplate.query(sql, (rs, rowNum) -> {
        RoomType roomType = new RoomType();
        roomType.hotelID = rs.getInt("HotelID");
        roomType.name = rs.getString("Name");
        roomType.capacity = rs.getString("Capacity");
        roomType.photo = rs.getString("MainPhoto");
        roomType.description = rs.getString("Description");

        return roomType;
    }, hotelID);
    }

    List<RoomType> getAvailableRoomTypes(ReservationQuery query) {
        String sql = "SELECT ROOMTYPE.Name, ROOMTYPE.HotelID, COUNT(ROOMTYPE.Name) RoomTypesCount\n" +
                "FROM ROOM\n" +
                "INNER JOIN HOTEL ON HOTEL.HotelID = ROOM.HotelID\n" +
                "INNER JOIN ROOMTYPE ON ROOMTYPE.HotelID = ROOM.HotelID AND ROOM.RoomTypeName = ROOMTYPE.Name\n" +
                "LEFT JOIN ORDERDETAILS OD on ROOM.HotelID = OD.RoomHotelID and ROOM.RoomNumber = OD.RoomNumber\n" +
                "LEFT JOIN `ORDER` O ON HOTEL.HotelID = O.HotelID and OD.OrderID = O.OrderID\n" +
                "WHERE (O.OrderID IS NULL\n" +
                "    OR NOT\n" +
                "       (O.CheckInDate BETWEEN ? AND ?\n" +
                "       OR\n" +
                "       O.CheckOutDate BETWEEN ? AND ?))\n" +
                "    AND HOTEL.City = ?\n" +
                "    AND ROOMTYPE.Capacity >= ?\n" +
                "GROUP BY ROOMTYPE.Name, ROOMTYPE.HotelID;";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            RoomType roomType = new RoomType();
            roomType.hotelID = rs.getInt("HotelID");
            roomType.name = rs.getString("Name");
            roomType.freeCount = rs.getInt("RoomTypesCount");
            return roomType;
        }, query.checkInDate, query.checkOutDate, query.checkInDate, query.checkOutDate, query.city, query.numberOfPeople);
    }
}
