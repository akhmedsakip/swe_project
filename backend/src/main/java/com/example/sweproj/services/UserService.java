package com.example.sweproj.services;

import com.example.sweproj.models.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserDataAccessService userDataAccessService;
    private final PasswordEncoder encoder;

    UserService(UserDataAccessService userDataAccessService) {
        this.userDataAccessService = userDataAccessService;
        this.encoder = new BCryptPasswordEncoder();
    }

    public int addUser(User user) {
        user.encodePassword(this.encoder.encode(user.password));
        return userDataAccessService.insertUser(user);
    }

    public boolean isPasswordCorrect(User user) {
        String password = userDataAccessService.selectPasswordByEmail(user);
        return this.encoder.matches(user.password, password);
    }
}
