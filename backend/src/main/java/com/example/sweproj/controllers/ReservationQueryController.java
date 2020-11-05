package com.example.sweproj.controllers;

import com.example.sweproj.models.ReservationQuery;
import com.example.sweproj.models.Room;
import com.example.sweproj.models.RoomType;
import com.example.sweproj.models.User;
import com.example.sweproj.services.ReservationQueryService;
import com.example.sweproj.utils.Message;
import com.google.gson.Gson;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/reservation/query")
public class ReservationQueryController {

    private final ReservationQueryService reservationQueryService;

    public ReservationQueryController(ReservationQueryService reservationQueryService) {
        this.reservationQueryService = reservationQueryService;
    }

    @GetMapping
    ResponseEntity<String> getAvailableRooms(@RequestBody ReservationQuery reservationQuery) {
        Gson gson = new Gson();
        List<Message> serverErrors = new ArrayList<>();
        ArrayList<Room> availableRooms;
        try {
            availableRooms = new ArrayList<>(this.reservationQueryService.getAvailableRooms(reservationQuery));
        } catch(Exception error) {
            serverErrors.add(new Message("Error fetching free rooms"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(availableRooms));
    }
}