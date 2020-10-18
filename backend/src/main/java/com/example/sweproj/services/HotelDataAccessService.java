package com.example.sweproj.services;

import com.example.sweproj.models.Hotel;
import javax.validation.Valid;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class HotelDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    HotelDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    int insertHotel(@Valid Hotel hotel) {
        String sql = "INSERT INTO Hotels (Name, NumberOfFloors, NumberOfRooms, NumberOfFreeRooms, Country, City, Street, ZIPCode)" +
                            "VALUES (?, ?, ?, ?, ?, ? ,?, ?)";

        return jdbcTemplate.update(sql, hotel.name, hotel.numberOfFloors, hotel.numberOfRooms, hotel.numberOfFreeRooms, hotel.country, hotel.city, hotel.street, hotel.zipCode);
    }
    
    int getHotels() {
        String sql = "SELECT * FROM Hotels";

        return jdbcTemplate.update(sql);
    }
    
    
}
