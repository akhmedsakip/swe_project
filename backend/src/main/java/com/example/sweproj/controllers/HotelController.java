package com.example.sweproj.controllers;

import com.example.sweproj.models.Hotel;
import com.example.sweproj.services.HotelService;
import com.example.sweproj.utils.Message;
import com.google.gson.Gson;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    private final HotelService hotelService;

    HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping
    ResponseEntity<String> getHotels() {
        Gson gson = new Gson();
        List<Message> serverErrors = new ArrayList<>();
        ArrayList<Hotel> hotels;

        try {
            hotels = new ArrayList<>(this.hotelService.getHotels());
        } catch(Exception error) {
            serverErrors.add(new Message("Error fetching hotels"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(hotels));
    }

    @RequestMapping("/{hotelId}")
    @GetMapping
    ResponseEntity<String> getHotel(@PathVariable(value = "hotelId") Integer hotelId) {
        Gson gson = new Gson();
        List<Message> serverErrors = new ArrayList<>();
        Hotel hotel;

        try {
            hotel = this.hotelService.getHotel(hotelId);
        } catch(Exception error) {
            serverErrors.add(new Message("Error fetching hotel"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(hotel));
    }
}
