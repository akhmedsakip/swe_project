package com.example.sweproj.services;

import com.auth0.jwt.algorithms.Algorithm;
import com.example.sweproj.models.User;
import com.example.sweproj.models.UserLoginDetails;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import javax.validation.Valid;
import java.time.LocalDate;

@Repository
public class UserDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    UserDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    int insertUser(@Valid User user) {
        String sql = "INSERT INTO Users (FirstName, LastName, Password, Email, DateOfBirth, Age, Gender, RegistrationDate)" +
                            "VALUES (?, ?, ?, ?, ?, ? ,?, ?)";
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String encryptedPassword = encoder.encode(user.password);

        return jdbcTemplate.update(sql, user.firstName, user.lastName, encryptedPassword, user.email, user.dateOfBirth, user.getAge(), user.getGender(), LocalDate.now());
    }

    boolean loginUser(@Valid UserLoginDetails loginDetails) {
        String sql = "SELECT Password FROM Users WHERE Email = ?";
        PasswordEncoder encoder = new BCryptPasswordEncoder();

        String realPassword = jdbcTemplate.queryForObject(sql, new Object[]{loginDetails.email}, String.class);

        return encoder.matches(loginDetails.password, realPassword);
    }
}
