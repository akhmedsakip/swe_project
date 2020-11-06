package com.example.sweproj.services;

import com.example.sweproj.models.ReservationRequest;
import com.example.sweproj.models.Hotel;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class HotelDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    HotelDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Hotel mapFromDB(ResultSet rs) throws SQLException {
        Hotel hotel = new Hotel();
        hotel.hotelId = rs.getString("HotelID");
        hotel.name = rs.getString("Name");
        hotel.description = rs.getString("Description");
        hotel.numberOfFloors = rs.getString("Floors#");
        hotel.numberOfRooms = rs.getString("Rooms#");
        hotel.numberOfFreeRooms = rs.getString("FreeRooms#");
        hotel.country = rs.getString("CountryCode");
        hotel.city = rs.getString("City");
        hotel.street = rs.getString("Street");
        hotel.zipCode = rs.getString("ZIPCode");
        hotel.starCount = rs.getInt("StarCount");
        hotel.mainHotelPicture = rs.getString("MainHotelPicture");
        return hotel;
    }

    List<Hotel> getHotels() {
        String sql = "SELECT * FROM HOTEL";

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs));
    }

    List<String> getCities() {
        String sql = "SELECT DISTINCT City FROM HOTEL;";
        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString("City"));
    }

    List<Hotel> getAvailableHotels(ReservationRequest info) {
        String sql = "SELECT HOTEL.*\n" +
                "FROM ROOM\n" +
                "INNER JOIN HOTEL ON HOTEL.HotelID = ROOM.HotelID\n" +
                "INNER JOIN ROOMTYPE ON ROOMTYPE.HotelID = ROOM.HotelID AND ROOM.RoomTypeName = ROOMTYPE.Name\n" +
                "LEFT JOIN ORDERDETAILS OD on ROOM.HotelID = OD.RoomHotelID and ROOM.RoomNumber = OD.RoomNumber\n" +
                "LEFT JOIN `ORDER` O ON HOTEL.HotelID = O.HotelID and OD.OrderID = O.OrderID\n" +
                "WHERE (O.OrderID IS NULL\n" +
                "    OR NOT\n" +
                "       (O.CheckInDate BETWEEN ? AND ?\n" +
                "       OR\n" +
                "       O.CheckOutDate BETWEEN ? AND ?))\n" +
                "    AND HOTEL.City = ?\n" +
                "    AND ROOMTYPE.Capacity >= ?\n" +
                "GROUP BY HOTEL.HotelID;";

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), info.getCheckInDate(), info.getCheckOutDate(), info.getCheckInDate(), info.getCheckOutDate(), info.getCity(), info.getNumberOfPeople());
    }

    Hotel getHotel(int hotelID) {
        String sql = "SELECT * FROM HOTEL WHERE HotelID = ?";

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), hotelID).get(0);
    }
}
