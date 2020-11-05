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
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

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
        } catch () {

        }

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
            return ResponseEntity.status(400).body(gson.toJson(new Message("Old password is incorrect")));
        }
        int updated = userService.changePassword(passwordEncoder.encode(newPassword));
        if(updated != 1) {
            return ResponseEntity.status(500).body(gson.toJson(new Message("Database error")));
        }
        Optional<Cookie> cookie = cookieUtil.deletedTokenCookie(request.getCookies());
        cookie.ifPresent(response::addCookie);
        return ResponseEntity.ok(gson.toJson(new Message("Successfully changed password")));
    }
}
