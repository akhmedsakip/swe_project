package com.example.sweproj.services;

import com.example.sweproj.models.User;
import com.example.sweproj.models.UserLoginDetails;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserDataAccessService userDataAccessService;

    UserService(UserDataAccessService userDataAccessService) {
        this.userDataAccessService = userDataAccessService;
    }

    public int addUser(User user) {
        return userDataAccessService.insertUser(user);
    }

    public boolean loginUser(UserLoginDetails loginDetails) {
        return userDataAccessService.loginUser(loginDetails);
    }
}
