package com.example.sweproj.controllers;
import com.example.sweproj.models.User;
import com.example.sweproj.services.UserService;
import com.example.sweproj.utils.BaseServerError;
import com.example.sweproj.utils.FieldValidationError;
import com.google.gson.Gson;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping
    ResponseEntity<String> addUser(@Valid @RequestBody User user, BindingResult bindingResult) {
        Gson gson = new Gson();
        List<BaseServerError> serverErrors = new ArrayList<>();
        if(bindingResult.hasErrors()) {
            List<FieldError> errors = bindingResult.getFieldErrors();
            for(FieldError error: errors) {
                serverErrors.add(new FieldValidationError(error.getField(), error.getDefaultMessage()));   //
            }
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            userService.addUser(user);
        } catch(Exception error) {
            serverErrors.add(new BaseServerError("Email already exists"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body("{message: 'Successfully registered'}");
    }
}
