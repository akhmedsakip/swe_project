package com.example.sweproj.controllers;

import com.example.sweproj.models.Guest;
import com.example.sweproj.models.ReservationDetailsGroup;
import com.example.sweproj.models.ReservationDetailsRequest;
import com.example.sweproj.models.ReservationRequest;
import com.example.sweproj.services.GuestService;
import com.example.sweproj.services.ReservationService;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reserve")
public class ReservationController {

    @Autowired
    private Gson gson;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ValidationUtil validationUtil;

    ReservationController() {}

    @PostMapping
    ResponseEntity<String> reserveRoom(@RequestBody ReservationDetailsRequest reservationDetailsRequest) {
        List<Message> serverErrors = validationUtil.validate(reservationDetailsRequest.getGuest());
        serverErrors.addAll(validationUtil.validate(reservationDetailsRequest.getReservationRequest(), ReservationDetailsGroup.class));
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            reservationService.reserveRoom(reservationDetailsRequest);
        } catch(Exception error) {
            error.printStackTrace();
            serverErrors.add(new Message("Server error"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully reserved the room")));
    }
}
