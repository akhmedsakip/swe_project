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
        String sql = "SELECT * FROM RoomTypes WHERE HotelID = " + hotelID;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            RoomType roomType= new RoomType();
            roomType.hotelID = rs.getString("HotelID");
            roomType.roomTypeID = rs.getString("RoomTypeID");
            roomType.name = rs.getString("RoomTypeName");
            roomType.capacity = rs.getString("RoomCapacity");
            roomType.photo = rs.getString("Photo");
            roomType.description = rs.getString("Description");

            return roomType;
        });
    }
}
