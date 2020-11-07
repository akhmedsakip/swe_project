package com.example.sweproj.services;

import com.example.sweproj.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public class UserDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    UserDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    int insertUser(User user) {
        String sql = "INSERT INTO 'user' (FirstName, LastName, Password, Email, DateOfBirth, Gender, RegistrationDate)" +
                            "VALUES (?, ?, ?, ?, ?, ? ,?)";
        return jdbcTemplate.update(sql, user.getFirstName(), user.getLastName(),
                user.getPassword(), user.getUsername(), user.getDateOfBirth(), user.getGender(), LocalDate.now());
    }

    User loadUserByUsername(String email) {
        String sql = "SELECT * FROM 'user' WHERE Email = ?";
        List<User> users = jdbcTemplate.query(sql,(rs, rowNum) -> {
            User user = new User(rs.getString("Email"), rs.getString("Password"));
            user.setFirstName(rs.getString("FirstName"));
            user.setLastName(rs.getString("LastName"));
            user.setGender(rs.getString("Gender"));
            user.setDateOfBirth(rs.getString("DateOfBirth"));
            return user;
        }, email);

        if(users.size() == 0) {
            return null;
        }
        return users.get(0);
    }

    int editUser(User newUser) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String sql = "UPDATE 'user' SET FirstName = ?, LastName = ?,DateOfBirth = ?, Gender = ? WHERE Email = ?";
        return jdbcTemplate.update(sql, newUser.getFirstName(), newUser.getLastName(),
                newUser.getDateOfBirth(), newUser.getGender(), user.getUsername());
    }

    int changePassword(String newPasswordEncoded) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String sql = "UPDATE 'user' SET Password = ? WHERE Email = ?";
        return jdbcTemplate.update(sql, newPasswordEncoded, user.getUsername());
    }
}
