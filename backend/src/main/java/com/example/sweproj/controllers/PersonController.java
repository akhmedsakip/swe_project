package com.example.sweproj.controllers;

import com.example.sweproj.dto.EditPersonByOrderRequest;
import com.example.sweproj.dto.ReservationDetailsRequest;
import com.example.sweproj.dto.ReservationRequest;
import com.example.sweproj.models.Person;
import com.example.sweproj.models.User;
import com.example.sweproj.services.PersonService;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.example.sweproj.validation.groups.ReservationDetailsGroup;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

    @Autowired
    private Gson gson;

    @Autowired
    private PersonService personService;

    @Autowired
    private ValidationUtil validationUtil;

    PersonController() {}

//    @PostMapping
//    ResponseEntity<String> addGuest(@RequestBody Guest newGuest) {
//        List<Message> serverErrors = validationUtil.validate(newGuest);
//        if(serverErrors.size() > 0) {
//            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
//        }
//        try {
//            guestService.addGuest(newGuest);
//        } catch(DuplicateKeyException ignored) {
//            serverErrors.add(new Message("Person with this phone number already exists"));
//            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
//        } catch(Exception error) {
//            serverErrors.add(new Message("Server error"));
//            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
//        }
//        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully added")));
//    }

    @PostMapping("/panel")
    ResponseEntity<String> editPersonByOrder(@RequestBody EditPersonByOrderRequest editPersonByOrderRequest) {
        List<Message> serverErrors = new ArrayList<>();
        Person person = editPersonByOrderRequest.getPerson();
        int orderId = editPersonByOrderRequest.getOrderId();
        if(person == null) {
            serverErrors.add(new Message("Person details should not be empty"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        serverErrors.addAll(validationUtil.validate(editPersonByOrderRequest.getPerson()));
        serverErrors.addAll(validationUtil.validate(editPersonByOrderRequest));
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            if (this.personService.editPersonByOrder(person, orderId) < 1) {
                serverErrors.add(new Message("Error editing the person. Most probably, you are trying to edit" +
                        " person details of an order of another hotel."));
                return ResponseEntity.status(400).body(gson.toJson(serverErrors));
            }
        } catch(DuplicateKeyException duplicateKeyException) {
            duplicateKeyException.printStackTrace();
            serverErrors.add(new Message("Person with this phone number already exists!"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        } catch(Exception error) {
            error.printStackTrace();
            serverErrors.add(new Message("Server error"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully edited payer details of order " + orderId)));
    }
}