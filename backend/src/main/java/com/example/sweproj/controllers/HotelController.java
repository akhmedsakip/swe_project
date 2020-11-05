package com.example.sweproj.controllers;

import com.example.sweproj.models.AvailableRoomTypesRequest;
import com.example.sweproj.models.Hotel;
import com.example.sweproj.models.RoomType;
import com.example.sweproj.services.HotelService;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private Gson gson;

    @Autowired
    private ValidationUtil validationUtil;


    HotelController() {}

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

    @GetMapping("/availableRoomTypes")
    ResponseEntity<String> getAvailableRooms(AvailableRoomTypesRequest info) {
        Gson gson = new Gson();
        List<Message> serverErrors = validationUtil.validate(info);
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            List<RoomType> availableRooms = this.hotelService.getAvailableRooms(info);
            return ResponseEntity.ok().body(gson.toJson(availableRooms));
        } catch(Exception error) {
            error.printStackTrace();
            serverErrors.add(new Message("Error fetching available room types"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
    }

    @GetMapping("/availableHotels")
    ResponseEntity<String> getAvailableHotels(AvailableRoomTypesRequest info) {
        Gson gson = new Gson();
        List<Message> serverErrors = validationUtil.validate(info);
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            List<Hotel> availableHotels = this.hotelService.getAvailableHotels(info);
            return ResponseEntity.ok().body(gson.toJson(availableHotels));
        } catch(Exception error) {
            error.printStackTrace();
            serverErrors.add(new Message("Error fetching available room types"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
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
