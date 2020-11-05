package com.example.sweproj.controllers;

import com.example.sweproj.models.RoomType;
import com.example.sweproj.services.RoomTypeService;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/roomTypes")
public class RoomTypeController {

    @Autowired
    private RoomTypeService roomTypeService;

    @Autowired
    private ValidationUtil validationUtil;


    RoomTypeController(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    @GetMapping
    ResponseEntity<String> getRoomTypes(@RequestParam(value = "hotelId") Integer hotelId) {
        Gson gson = new Gson();
        List<Message> serverErrors = new ArrayList<>();
        ArrayList<RoomType> roomTypes;
        try {
            roomTypes = new ArrayList<>(this.roomTypeService.getRoomTypes(hotelId));
        } catch(Exception error) {
            serverErrors.add(new Message("There are no room-types"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(roomTypes));
    }

    @RequestMapping("/{roomTypeName}")
    @GetMapping
    ResponseEntity<String> getRoomType(@RequestParam(value = "hotelId") Integer hotelId, @PathVariable(value = "roomTypeName") String roomTypeName) {
        Gson gson = new Gson();
        List<Message> serverErrors = new ArrayList<>();
        RoomType roomType;
        try {
            roomType = this.roomTypeService.getRoomType(hotelId, roomTypeName);
        } catch(Exception error) {
            serverErrors.add(new Message("There are no room-types"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(roomType));
    }
}
