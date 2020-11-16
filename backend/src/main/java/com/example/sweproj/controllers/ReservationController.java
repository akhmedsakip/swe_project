package com.example.sweproj.controllers;

import com.example.sweproj.dto.ReservationDetailsRequest;
import com.example.sweproj.dto.ReservationRequest;
import com.example.sweproj.models.*;
import com.example.sweproj.services.ReservationService;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.example.sweproj.validation.groups.ReservationDetailsGroup;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Security;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private Gson gson;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ValidationUtil validationUtil;

    ReservationController() {}

    @PostMapping("/reserve")
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

    @DeleteMapping
    ResponseEntity<String> deleteReservations(@RequestBody Map<String, Integer> requestBody) {
        List<Message> serverErrors = new ArrayList<>();
        Integer orderId = requestBody.get("orderId");

        if(orderId <= 0) {
            serverErrors.add(new Message("Invalid format of order id"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        int deletedCount = this.reservationService.deleteReservation(orderId, user.getEmail());
        if(deletedCount == 0) {
            serverErrors.add(new Message("Error deleting reservation"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully deleted room")));
    }

    @GetMapping
    ResponseEntity<List<Reservation>> getReservations() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Reservation> reservations = this.reservationService.getReservations(user.getEmail());
        return ResponseEntity.ok().body(reservations);
    }
}
