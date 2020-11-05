package com.example.sweproj.controllers;

import com.example.sweproj.models.AvailableRoomTypesRequest;
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
        System.out.println("a");
        try {
            roomTypes = new ArrayList<>(this.roomTypeService.getRoomTypes(hotelId));
        } catch(Exception error) {
            serverErrors.add(new Message("There are no room-types"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(roomTypes));
    }

    @GetMapping("/available")
    ResponseEntity<String> getAvailableRooms(AvailableRoomTypesRequest info) {
        Gson gson = new Gson();
        List<Message> serverErrors = validationUtil.validate(info);
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            List<RoomType> availableRooms = this.roomTypeService.getAvailableRooms(info);
            return ResponseEntity.ok().body(gson.toJson(availableRooms));
        } catch(Exception error) {
            error.printStackTrace();
            serverErrors.add(new Message("Error fetching available room types"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
    }
}
