package com.example.sweproj.controllers;

import com.example.sweproj.models.User;
import com.example.sweproj.models.UserLoginGroup;
import com.example.sweproj.models.UserRegistrationGroup;
import com.example.sweproj.services.UserService;
import com.example.sweproj.utils.*;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowCredentials = "true")
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

    private final Validator validator;

    UserAuthController() {
        this.validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @PostMapping("/register")
    ResponseEntity<String> addUser(@RequestBody User user) {
        List<Message> serverErrors = validateUser(user, UserRegistrationGroup.class);
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            user.encodePassword(passwordEncoder.encode(user.getPassword()));
            userService.addUser(user);
        } catch(Exception error) {
            serverErrors.add(new Message("Email already exists"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully registered")));
    }

    @PostMapping("/authenticate")
    ResponseEntity<String> authenticate(@RequestBody User user, HttpServletResponse response) {
        List<Message> serverErrors = validateUser(user, UserLoginGroup.class);
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
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


    List<Message> validateUser(User user, Class validationGroup) {
        List<Message> serverErrors = new ArrayList<>();
        for(ConstraintViolation<User> violation: validator.validate(user, validationGroup)) {
            serverErrors.add(new FieldValidationMessage(violation.getPropertyPath().toString(), violation.getMessage()));
        }
        return serverErrors;
    }

}
