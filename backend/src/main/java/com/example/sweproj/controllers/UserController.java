package com.example.sweproj.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.sweproj.configurations.AuthenticationConstants;
import com.example.sweproj.models.User;
import com.example.sweproj.models.UserLoginGroup;
import com.example.sweproj.models.UserRegistrationGroup;
import com.example.sweproj.services.UserService;
import com.example.sweproj.utils.BaseServerError;
import com.example.sweproj.utils.FieldValidationError;
import com.example.sweproj.utils.Message;
import com.google.gson.Gson;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final Validator validator;

    UserController(UserService userService) {
        this.userService = userService;
        this.validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @PostMapping
    ResponseEntity<String> addUser(@RequestBody User user, BindingResult bindingResult) {
        Gson gson = new Gson();
        List<BaseServerError> serverErrors = validateUser(user, UserRegistrationGroup.class);
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            userService.addUser(user);
        } catch(Exception error) {
            serverErrors.add(new BaseServerError("Email already exists"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully registered")));
    }

    @PostMapping("/login")
    ResponseEntity<String> loginUser(@RequestBody User user, HttpServletResponse response) {
        System.out.println(user.email);
        Gson gson = new Gson();
        List<BaseServerError> serverErrors = validateUser(user, UserLoginGroup.class);
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            if(!userService.isPasswordCorrect(user)) {
                throw new Exception();
            }
        } catch (Exception exception) {
            serverErrors.add(new BaseServerError("Email or password is incorrect"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        String token = JWT.create()
                .withClaim("email", user.email)
                .withExpiresAt(new Date(System.currentTimeMillis() + AuthenticationConstants.EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(AuthenticationConstants.TOKEN_KEY.getBytes()));

        Cookie cookie = new Cookie("jwtToken", token);
        cookie.setMaxAge((int) (AuthenticationConstants.EXPIRATION_TIME / 1000));
        cookie.setHttpOnly(true);
        cookie.setPath("/");
//        cookie.setSecure(true); TODO: https
        response.addCookie(cookie);

        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully authorized")));
    }

     List<BaseServerError> validateUser(User user, Class validationGroup) {
        List<BaseServerError> serverErrors = new ArrayList<>();
        for(ConstraintViolation<User> violation: validator.validate(user, validationGroup)) {
            serverErrors.add(new FieldValidationError(violation.getPropertyPath().toString(), violation.getMessage()));
        }
        return serverErrors;
    }
}
