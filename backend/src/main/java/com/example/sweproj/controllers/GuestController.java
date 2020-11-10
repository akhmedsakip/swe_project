package com.example.sweproj.controllers;

import com.example.sweproj.models.*;
import com.example.sweproj.services.GuestService;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/guests")
public class GuestController {

    @Autowired
    private Gson gson;

    @Autowired
    private GuestService guestService;

    @Autowired
    private ValidationUtil validationUtil;

    GuestController() {}

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
}