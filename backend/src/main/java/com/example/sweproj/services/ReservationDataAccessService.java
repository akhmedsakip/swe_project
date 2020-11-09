package com.example.sweproj.services;

import com.example.sweproj.controllers.RoomTypeController;
import com.example.sweproj.models.ReservationDetailsRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public class ReservationDataAccessService {
    private final JdbcTemplate jdbcTemplate;
    private final RoomTypeService roomTypeService;

    public ReservationDataAccessService(RoomTypeController roomTypeController, JdbcTemplate jdbcTemplate, RoomTypeService roomTypeService) {
        this.jdbcTemplate = jdbcTemplate;
        this.roomTypeService = roomTypeService;
    }

    public int reserveRoom(ReservationDetailsRequest info, String userEmail) {
        String sql = "CALL reserve(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        System.out.println(userEmail);

        int roomTotalPrice = roomTypeService.getTotalPrice(info.getReservationRequest()); // TODO transfer to controller

        return jdbcTemplate.update(sql, info.getGuest().getGender(), info.getGuest().getFirstName(),
                info.getGuest().getLastName(), info.getGuest().getPhoneNumber(), info.getReservationRequest().getHotelId(),
                roomTotalPrice, LocalDate.now(), info.getReservationRequest().getCheckInDate(),
                info.getReservationRequest().getCheckOutDate(), "Cash", info.getReservationRequest().getRoomTypeName(),
                userEmail);
    }
}
