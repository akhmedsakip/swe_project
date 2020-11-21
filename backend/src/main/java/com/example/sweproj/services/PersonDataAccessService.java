package com.example.sweproj.services;

import com.example.sweproj.models.Person;
import com.example.sweproj.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class PersonDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    public PersonDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    Person mapFromDB(ResultSet rs) throws SQLException {
        Person person = new Person();
        person.setPersonId(rs.getInt("PersonID"));
        person.setFirstName(rs.getString("FirstName"));
        person.setLastName(rs.getString("LastName"));
        person.setPhoneNumber(rs.getString("PhoneNumber"));
        person.setIdentificationID(rs.getString("IdentificationID"));
        person.setIdentificationTypeId(rs.getInt("IdentificationTypeID"));
        person.setGender(rs.getString("Gender"));
        person.setDateOfBirth(rs.getString("DateOfBirth"));
        person.setCountryCode(rs.getString("CountryCode"));
        person.setCity(rs.getString("City"));
        person.setStreet(rs.getString("Street"));
        person.setZipCode(rs.getString("ZIPCode"));
        return person;
    }

    int editPersonByOrder(Person person, int orderId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "UPDATE person P\n" +
                "    INNER JOIN order_details OD ON OD.GuestID = P.PersonID AND OD.IsPayer IS TRUE\n" +
                "    INNER JOIN employee E ON E.HotelID = OD.OrderHotelID\n" +
                "SET FirstName = ?,\n" +
                "    LastName = ?,\n" +
                "    PhoneNumber = ?,\n" +
                "    Gender = ?\n" +
                "WHERE OD.OrderID = ?\n" +
                "  AND E.UserEmail = ?;";

        return jdbcTemplate.update(sql, person.getFirstName(), person.getLastName(), person.getPhoneNumber(),
                person.getGender(), orderId, user.getEmail());
    }
}
