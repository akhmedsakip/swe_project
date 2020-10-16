package com.example.sweproj.api.user;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {
    private List<User> database= new ArrayList<>();

    UserController() {
        database.add(new User("Timur", "Rakhimzhan"));
        database.add(new User("Akhmed", "Sakip"));
    }
    @GetMapping
    public List<User> getAllUsers() {
        return database;
    }
}
