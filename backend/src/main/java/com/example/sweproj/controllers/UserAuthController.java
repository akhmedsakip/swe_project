package com.example.sweproj.controllers;

import com.example.sweproj.models.AuthenticationRequest;
import com.example.sweproj.models.User;
import com.example.sweproj.models.UserRegisterGroup;
import com.example.sweproj.services.UserService;
import com.example.sweproj.utils.CookieUtil;
import com.example.sweproj.utils.JwtUtil;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/")
public class UserAuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CookieUtil cookieUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Gson gson;

    @Autowired
    private ValidationUtil validationUtil;

    UserAuthController() {}

    @PostMapping("/register")
    ResponseEntity<String> addUser(@RequestBody User user) {
        List<Message> serverErrors = validationUtil.validate(user, UserRegisterGroup.class);
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            user.encodePassword(passwordEncoder.encode(user.getPassword()));
            userService.addUser(user);
        } catch(DuplicateKeyException ignored) {
            serverErrors.add(new Message("Email already exists"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        } catch(Exception error) {
            serverErrors.add(new Message("Server error"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully registered")));
    }

    @PostMapping("/authenticate")
    ResponseEntity<String> authenticate(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) {
        List<Message> serverErrors = validationUtil.validate(authenticationRequest);
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        UserDetails user = new User(authenticationRequest.getEmail(), authenticationRequest.getPassword());
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        } catch(AuthenticationException ignored) {
            serverErrors.add(new Message("Email or password pair is incorrect"));
            return ResponseEntity.status(401).body(gson.toJson(serverErrors));
        }
        String token = jwtUtil.generateToken(user);
        Cookie cookie = cookieUtil.createCookieWithToken(token);
        response.addCookie(cookie);
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully authorized")));
    }

    @PostMapping("/logout")
    ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Optional<Cookie> cookie = cookieUtil.deletedTokenCookie(request.getCookies());
        cookie.ifPresent(response::addCookie);
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully logout")));
    }

}
