package com.example.sweproj.controllers;

import com.example.sweproj.models.RoomType;
import com.example.sweproj.services.RoomTypeService;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        System.out.println("a");
        try {
            roomTypes = new ArrayList<>(this.roomTypeService.getRoomTypes(hotelId));
        } catch(Exception error) {
            serverErrors.add(new Message("There are no room-types"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(roomTypes));
    }
}
