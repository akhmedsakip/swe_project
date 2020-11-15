package com.example.sweproj.controllers;

import com.example.sweproj.models.*;
import com.example.sweproj.services.ReservationService;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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
        List<Message> serverErrors = new ArrayList<>();
        Guest guest = reservationDetailsRequest.getGuest();
        ReservationRequest reservationRequest = reservationDetailsRequest.getReservationRequest();
        if(guest == null || reservationRequest == null) {
            serverErrors.add(new Message("Guest and reservation detail should not be empty"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        serverErrors.addAll(validationUtil.validate(reservationDetailsRequest.getGuest()));
        serverErrors.addAll(validationUtil.validate(reservationDetailsRequest.getReservationRequest(), ReservationDetailsGroup.class));
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userEmail = user.getEmail();
        try {
            reservationService.reserveRoom(reservationDetailsRequest, userEmail);
        } catch(DataIntegrityViolationException error) {
            serverErrors.add(new Message("Such hotel does not exists"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        } catch(UncategorizedSQLException error) {
            serverErrors.add(new Message("All rooms are already booked"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        } catch(Exception error) {
            error.printStackTrace();
            serverErrors.add(new Message("Server error"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully reserved the room")));
    }
}
