package com.example.sweproj.models;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HotelDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    HotelDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<Hotel> getHotels() {
        String sql = "SELECT * FROM Hotels";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Hotel hotel = new Hotel();
            hotel.hotelID = rs.getString("HotelID");
            hotel.name = rs.getString("Name");
            hotel.numberOfFloors = rs.getString("NumberOfFloors");
            hotel.numberOfRooms = rs.getString("NumberOfRooms");
            hotel.numberOfFreeRooms = rs.getString("NumberOfFreeRooms");
            hotel.country = rs.getString("Country");
            hotel.city = rs.getString("City");
            hotel.street = rs.getString("Street");
            hotel.zipCode = rs.getString("ZIPCode");
            hotel.mainHotelPicture = rs.getString("MainHotelPicture");
            return hotel;
        });
    }
    
    
}
