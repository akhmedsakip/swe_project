package com.example.sweproj.controllers;

import com.example.sweproj.models.Hotel;
import com.example.sweproj.services.HotelService;
import com.example.sweproj.utils.Message;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private Gson gson;


    HotelController(HotelService hotelService) {
    }

    @GetMapping
    ResponseEntity<String> getHotels() {
        List<Message> serverErrors = new ArrayList<>();
        try {
            List<Hotel> hotels = this.hotelService.getHotels();
            return ResponseEntity.ok().body(gson.toJson(hotels));
        } catch(Exception error) {
            serverErrors.add(new Message("Error fetching hotels"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
    }

    @GetMapping("/cities")
    ResponseEntity<String> getCities() {
        List<Message> serverErrors = new ArrayList<>();
        try {
            List<String> cities = this.hotelService.getCities();
            return ResponseEntity.ok().body(gson.toJson(cities));
        } catch(Exception error) {
            serverErrors.add(new Message("Error fetching cities"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
    }

}
