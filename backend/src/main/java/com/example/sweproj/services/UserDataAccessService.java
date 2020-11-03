package com.example.sweproj.services;

import com.example.sweproj.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public class UserDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    UserDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    int insertUser(User user) {
        String sql = "INSERT INTO Users (FirstName, LastName, Password, Email, DateOfBirth, Age, Gender, RegistrationDate)" +
                            "VALUES (?, ?, ?, ?, ?, ? ,?, ?)";
        return jdbcTemplate.update(sql, user.firstName, user.lastName, user.password, user.email, user.dateOfBirth, user.getAge(), user.getGender(), LocalDate.now());
    }

    String selectPasswordByEmail(User user) {
        String sql = "SELECT Password FROM Users WHERE Email = ?";
        return jdbcTemplate.queryForObject(sql, String.class, user.getUsername());
    }

    User loadUserByUsername(String email) {
        String sql = "SELECT * FROM Users WHERE Email = ?";
        return jdbcTemplate.query(sql,(rs, rowNum) -> {
            User user = new User(rs.getString("Email"), rs.getString("Password"));
            user.setFirstName(rs.getString("FirstName"));
            user.setLastName(rs.getString("LastName"));
            user.setGender(rs.getString("Gender"));
            user.setDateOfBirth(rs.getString("DateOfBirth"));
            return user;
        }, email).get(0);
    }
}
