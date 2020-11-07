package com.example.sweproj.services;

import com.example.sweproj.models.Guest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class GuestDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    public GuestDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Guest mapFromDB(ResultSet rs) throws SQLException {
        Guest guest = new Guest();
        guest.setPersonID(rs.getInt("PersonID"));
        guest.setFirstName(rs.getString("FirstName"));
        guest.setLastName(rs.getString("LastName"));
        guest.setPhoneNumber(rs.getString("PhoneNumber"));
        guest.setIdentificationID(rs.getString("IdentificationID"));
        guest.setIdentificationTypeID(rs.getInt("IdentificationTypeID"));
        guest.setGender(rs.getString("Gender"));
        guest.setDateOfBirth(rs.getString("DateOfBirth"));
        guest.setCountryCode(rs.getString("CountryCode"));
        guest.setCity(rs.getString("City"));
        guest.setStreet(rs.getString("Street"));
        guest.setZipCode(rs.getString("ZIPCode"));
        return guest;
    }

//    int insertGuest(Guest newGuest) {
//        String sql = "INSERT INTO PERSON (Gender, IdentificationID, DateOfBirth, FirstName, LastName, CountryCode, City, Street, ZIPCode, PhoneNumber, IdentificationTypeID)\n" +
//                "VALUES (\n" +
//                "        ?,\n" +
//                "        ?,\n" +
//                "        ?,\n" +
//                "        ?,\n" +
//                "        ?,\n" +
//                "        ?,\n" +
//                "        ?,\n" +
//                "        ?,\n" +
//                "        ?,\n" +
//                "        ?,\n" +
//                "        ?\n" +
//                "       );" +
//                "INSERT INTO GUEST (GuestID)\n" +
//                "VALUE (?);";
//        return jdbcTemplate.update(sql, newGuest.getGender(), newGuest.getIdentificationID(), newGuest.getDateOfBirth(),
//                newGuest.getFirstName(), newGuest.getLastName(), newGuest.getCountryCode(), newGuest.getCity(), newGuest.getStreet(),
//                newGuest.getZipCode(), newGuest.getPhoneNumber(), newGuest.getIdentificationTypeID());
//    }
}
