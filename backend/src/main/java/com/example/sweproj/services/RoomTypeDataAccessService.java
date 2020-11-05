package com.example.sweproj.services;

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
            roomType.setHotelID(rs.getInt("HotelID"));
            roomType.setName(rs.getString("Name"));
            roomType.setCapacity(rs.getString("Capacity"));
            roomType.setPhoto(rs.getString("MainPhoto"));
            roomType.setDescription(rs.getString("Description"));
            return roomType;
        }, hotelID);
    }

    RoomType getRoomType(int hotelID, String roomTypeName) {
        String sql = "SELECT * FROM ROOMTYPE WHERE HotelID = ? AND Name = ?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            RoomType roomType = new RoomType();
            roomType.setHotelID(rs.getInt("HotelID"));
            roomType.setName(rs.getString("Name"));
            roomType.setCapacity(rs.getString("Capacity"));
            roomType.setPhoto(rs.getString("MainPhoto"));
            roomType.setDescription(rs.getString("Description"));
            return roomType;
        }, hotelID, roomTypeName).get(0);
    }
}
