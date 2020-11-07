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
        String sql = "SELECT * FROM hotel";

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs));
    }

    List<String> getCities() {
        String sql = "SELECT DISTINCT City FROM hotel;";
        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString("City"));
    }

    List<Hotel> getAvailableHotels(ReservationRequest info) {
        String sql = "SELECT hotel.*\n" +
                "FROM room\n" +
                "INNER JOIN hotel ON hotel.HotelID = room.HotelID\n" +
                "INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name\n" +
                "LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber\n" +
                "LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID\n" +
                "WHERE (O.OrderID IS NULL\n" +
                "    OR NOT\n" +
                "       (O.CheckInDate BETWEEN ? AND ?\n" +
                "       OR\n" +
                "       O.CheckOutDate BETWEEN ? AND ?))\n" +
                "    AND hotel.City = ?\n" +
                "    AND room_type.Capacity >= ?\n" +
                "GROUP BY hotel.HotelID;";

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), info.getCheckInDate(), info.getCheckOutDate(), info.getCheckInDate(), info.getCheckOutDate(), info.getCity(), info.getNumberOfPeople());
    }

    Hotel getHotel(int hotelID) {
        String sql = "SELECT * FROM hotel WHERE HotelID = ?";

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), hotelID).get(0);
    }
}
