package com.example.sweproj.services;

import com.example.sweproj.dto.HotelReservationDetailsResponse;
import com.example.sweproj.dto.ReservationDetailsRequest;
import com.example.sweproj.models.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private ReservationDataAccessService reservationDataAccessService;

    public int reserveRoom(ReservationDetailsRequest reservationDetailsRequest, String userEmail) {
        return this.reservationDataAccessService.reserveRoom(reservationDetailsRequest, userEmail);
    }

    public List<Reservation> getReservations(String email) {
        return this.reservationDataAccessService.getReservations(email);
    }

    public int deleteReservation(int orderId, String email) {
        return this.reservationDataAccessService.deleteReservation(orderId, email);
    }

    public List<HotelReservationDetailsResponse> getHotelReservations() {
        return this.reservationDataAccessService.getHotelReservations();
    }
}
