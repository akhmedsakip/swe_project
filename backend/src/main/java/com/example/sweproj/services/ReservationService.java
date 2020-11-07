package com.example.sweproj.services;

import com.example.sweproj.models.ReservationDetailsRequest;
import com.example.sweproj.models.ReservationRequest;
import com.example.sweproj.models.RoomType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {
    private final ReservationDataAccessService reservationDataAccessService;

    public ReservationService(ReservationDataAccessService reservationDataAccessService) {
        this.reservationDataAccessService = reservationDataAccessService;
    }

    public int reserveRoom(ReservationDetailsRequest reservationDetailsRequest) {
        return this.reservationDataAccessService.reserveRoom(reservationDetailsRequest);
    }
}
