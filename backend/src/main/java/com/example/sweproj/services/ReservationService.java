package com.example.sweproj.services;

import com.example.sweproj.models.ReservationDetailsRequest;
import com.example.sweproj.models.ReservationRequest;
import com.example.sweproj.models.RoomType;
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
}
