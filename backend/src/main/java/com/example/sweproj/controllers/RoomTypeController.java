package com.example.sweproj.controllers;

import com.example.sweproj.models.RoomType;
import com.example.sweproj.services.RoomTypeService;
import com.example.sweproj.utils.BaseServerError;
import com.google.gson.Gson;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/roomTypes")
public class RoomTypeController {

    private final RoomTypeService roomTypeService;

    RoomTypeController(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    @GetMapping
    ResponseEntity<String> getRoomTypes(@RequestParam(value = "hotelId") Integer hotelId) {
        Gson gson = new Gson();
        List<BaseServerError> serverErrors = new ArrayList<>();
        ArrayList<RoomType> roomTypes;
        try {
            roomTypes = new ArrayList<>(this.roomTypeService.getRoomTypes(hotelId));
        } catch(Exception error) {
            serverErrors.add(new BaseServerError("There are no room-types"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(roomTypes));
    }
}
