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
        roomType.hotelID = rs.getInt("HotelID");
        roomType.name = rs.getString("Name");
        roomType.capacity = rs.getString("Capacity");
        roomType.photo = rs.getString("MainPhoto");
        roomType.description = rs.getString("Description");

        return roomType;
    }, hotelID);
    }
}
