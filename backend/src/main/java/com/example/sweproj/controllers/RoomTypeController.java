package com.example.sweproj.controllers;

import com.example.sweproj.models.RoomType;
import com.example.sweproj.services.RoomTypeService;
import com.example.sweproj.utils.BaseServerError;
import com.google.gson.Gson;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
public class RoomTypeController {

    private final RoomTypeService roomTypeService;

    RoomTypeController(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    @GetMapping("/room-types")
    ResponseEntity<String> getRoomTypes(@RequestParam("hotelID") int hotelID, BindingResult bindingResult) {
        Gson gson = new Gson();
        List<BaseServerError> serverErrors = new ArrayList<>();
        ArrayList<RoomType> roomTypes;
        try {
            roomTypes = new ArrayList<>(this.roomTypeService.getRoomTypes(hotelID));
        } catch(Exception error) {
            serverErrors.add(new BaseServerError("There are no room-types"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(roomTypes));
    }
}
