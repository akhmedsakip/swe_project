package com.example.sweproj.services;

import com.example.sweproj.models.Person;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class PersonDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    public PersonDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Person mapFromDB(ResultSet rs) throws SQLException {
        Person person = new Person();
        person.setPersonId(rs.getInt("PersonID"));
        person.setFirstName(rs.getString("FirstName"));
        person.setLastName(rs.getString("LastName"));
        person.setPhoneNumber(rs.getString("PhoneNumber"));
        person.setIdentificationID(rs.getString("IdentificationID"));
        person.setIdentificationTypeID(rs.getInt("IdentificationTypeID"));
        person.setGender(rs.getString("Gender"));
        person.setDateOfBirth(rs.getString("DateOfBirth"));
        person.setCountryCode(rs.getString("CountryCode"));
        person.setCity(rs.getString("City"));
        person.setStreet(rs.getString("Street"));
        person.setZipCode(rs.getString("ZIPCode"));
        return person;
    }

//    int changePerson(int orderId) {
//
//    }
}
