package com.example.sweproj.controllers;

import com.example.sweproj.models.Hotel;
import com.example.sweproj.models.HotelService;
import com.example.sweproj.utils.BaseServerError;
import com.google.gson.Gson;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        List<BaseServerError> serverErrors = new ArrayList<>();
        ArrayList<Hotel> hotels;

        try {
            hotels = new ArrayList<>(this.hotelService.getHotels());
        } catch(Exception error) {
            serverErrors.add(new BaseServerError("Error fetching hotels"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(hotels));
    }

}
