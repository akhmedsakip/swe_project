package com.example.sweproj.services;

import com.example.sweproj.models.ReservationQuery;
import com.example.sweproj.models.Room;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationQueryService {
    public final ReservationQueryDataAccessService reservationQueryDataAccessService;

    public ReservationQueryService(ReservationQueryDataAccessService reservationQueryDataAccessService) {
        this.reservationQueryDataAccessService = reservationQueryDataAccessService;
    }

    public List<Room> getAvailableRooms(ReservationQuery query) {
        return reservationQueryDataAccessService.getAvailableRooms(query);
    }
}
