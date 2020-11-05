package com.example.sweproj.controllers;

import com.example.sweproj.models.ChangePasswordRequest;
import com.example.sweproj.models.User;
import com.example.sweproj.models.UserEditGroup;
import com.example.sweproj.services.UserService;
import com.example.sweproj.utils.CookieUtil;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private Gson gson;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private CookieUtil cookieUtil;

    @Autowired
    private ValidationUtil validationUtil;

    UserController() {}

    @GetMapping
    ResponseEntity<String> getUser() {
        Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(gson.toJson(user));
    }

    @PutMapping
    ResponseEntity<String> editUser(@RequestBody User newUser) {
        List<Message> serverErrors = validationUtil.validate(newUser, UserEditGroup.class);
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            userService.editUser(newUser);
        } catch (DuplicateKeyException ignored) {
            serverErrors.add(new Message("Email already exists"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        } catch (Exception error) {
            serverErrors.add(new Message("Server error"));
            error.printStackTrace();
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok(gson.toJson(new Message("Successfully edited")));
    }

    @PutMapping("/changePassword")
    ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, HttpServletRequest request, HttpServletResponse response) {
        List<Message> serverErrors = validationUtil.validate(changePasswordRequest);
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        String oldPassword = changePasswordRequest.getOldPassword();
        String newPassword = changePasswordRequest.getNewPassword();

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!passwordEncoder.matches(oldPassword, user.getPassword())) {
            serverErrors.add(new Message("Old password is incorrect"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            userService.changePassword(passwordEncoder.encode(newPassword));
        } catch(Exception error) {
            error.printStackTrace();
            return ResponseEntity.status(500).body(gson.toJson(new Message("Server error")));
        }
        return ResponseEntity.ok(gson.toJson(new Message("Successfully changed password")));
    }
}
