package com.example.sweproj.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.example.sweproj.models.HotelService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sweproj.models.Hotel;
import com.example.sweproj.models.User;
import com.example.sweproj.utils.BaseServerError;
import com.example.sweproj.utils.FieldValidationError;
import com.google.gson.Gson;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    private final HotelService hotelService;
    private ArrayList<Hotel> hotels;

    HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    public HotelService getHotelService() {
        return hotelService;
    }

    @GetMapping
    ResponseEntity<String> getHotels(Hotel hotel, BindingResult bindingResult) {
        Gson gson = new Gson();
        String json;

        List<BaseServerError> serverErrors = new ArrayList<>();

        if(bindingResult.hasErrors()) {
            List<FieldError> errors = bindingResult.getFieldErrors();
            for(FieldError error: errors) {
                serverErrors.add(new FieldValidationError(error.getField(), error.getDefaultMessage()));   //
            }
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            hotels = new ArrayList<>(this.hotelService.getHotels());
        } catch(Exception error) {
            serverErrors.add(new BaseServerError("Error fetching hotels"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        json = gson.toJson(hotels);
        return ResponseEntity.ok().body(json);
    }

}
