package com.example.sweproj.services;

import com.example.sweproj.models.AvailableRoomTypesRequest;
import com.example.sweproj.models.Hotel;
import com.example.sweproj.models.RoomType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HotelDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    HotelDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<Hotel> getHotels() {
        String sql = "SELECT * FROM HOTEL";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
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
        });
    }

    List<String> getNumberOfCities() {
        String sql = "SELECT DISTINCT City FROM HOTEL;";
        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString("City"));
    }

    List<RoomType> getAvailableRoomTypes(AvailableRoomTypesRequest info) {
        String sql = "SELECT ROOMTYPE.Name, ROOMTYPE.HotelID, COUNT(ROOMTYPE.Name) RoomTypesCount\n" +
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
                "GROUP BY ROOMTYPE.Name, ROOMTYPE.HotelID;";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            RoomType roomType = new RoomType();
            roomType.setHotelID(rs.getInt("HotelID"));
            roomType.setName(rs.getString("Name"));
            roomType.setFreeCount(rs.getInt("RoomTypesCount"));
            return roomType;
        }, info.getCheckInDate(), info.getCheckOutDate(), info.getCheckInDate(), info.getCheckOutDate(), info.getCity(), info.getNumberOfPeople());
    }

    Hotel getHotel(int hotelID) {
        String sql = "SELECT * FROM HOTEL WHERE HotelID = ?";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
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
        }, hotelID).get(0);
    }
}
