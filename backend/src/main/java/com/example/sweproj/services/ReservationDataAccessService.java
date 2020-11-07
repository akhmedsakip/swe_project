package com.example.sweproj.services;

import com.example.sweproj.models.ReservationDetailsRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ReservationDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    public ReservationDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int reserveRoom(ReservationDetailsRequest reservationDetailsRequest) {
        return 0;
    }
}
