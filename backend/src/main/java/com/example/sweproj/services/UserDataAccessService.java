package com.example.sweproj.services;

import com.example.sweproj.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public class UserDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    UserDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    int insertUser(User user) {
        String sql = "INSERT INTO USERS (FirstName, LastName, Password, Email, DateOfBirth, Gender, RegistrationDate)" +
                            "VALUES (?, ?, ?, ?, ?, ? ,?)";
        return jdbcTemplate.update(sql, user.getFirstName(), user.getLastName(),
                user.getPassword(), user.getUsername(), user.getDateOfBirth(), user.getGender(), LocalDate.now());
    }

    User loadUserByUsername(String email) {
        String sql = "SELECT * FROM USERS WHERE Email = ?";
        return jdbcTemplate.query(sql,(rs, rowNum) -> {
            User user = new User(rs.getString("Email"), rs.getString("Password"));
            user.setFirstName(rs.getString("FirstName"));
            user.setLastName(rs.getString("LastName"));
            user.setGender(rs.getString("Gender"));
            user.setDateOfBirth(rs.getString("DateOfBirth"));
            return user;
        }, email).get(0);
    }

    int changePassword(String newPasswordEncoded) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String sql = "UPDATE USERS SET Password = ? WHERE Email = ?";
        return jdbcTemplate.update(sql, newPasswordEncoded, user.getUsername());
    }
}
