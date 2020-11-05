package com.example.sweproj.services;

import com.example.sweproj.models.AvailableEntitiesRequest;
import com.example.sweproj.models.RoomType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoomTypeDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    RoomTypeDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<RoomType> getRoomTypes(int hotelID) {
        String sql = "SELECT * FROM ROOMTYPE WHERE HotelID = ?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            RoomType roomType = new RoomType();
            roomType.setHotelID(rs.getInt("HotelID"));
            roomType.setName(rs.getString("Name"));
            roomType.setCapacity(rs.getString("Capacity"));
            roomType.setPhoto(rs.getString("MainPhoto"));
            roomType.setDescription(rs.getString("Description"));
            return roomType;
        }, hotelID);
    }

    RoomType getRoomType(int hotelID, String roomTypeName) {
        String sql = "SELECT * FROM ROOMTYPE WHERE HotelID = ? AND Name = ?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            RoomType roomType = new RoomType();
            roomType.setHotelID(rs.getInt("HotelID"));
            roomType.setName(rs.getString("Name"));
            roomType.setCapacity(rs.getString("Capacity"));
            roomType.setPhoto(rs.getString("MainPhoto"));
            roomType.setDescription(rs.getString("Description"));
            return roomType;
        }, hotelID, roomTypeName).get(0);
    }

    List<RoomType> getAvailableRoomTypes(AvailableEntitiesRequest info) {
        String sql = "SELECT COUNT(ROOMTYPE.Name) RoomTypesCount, ROOMTYPE.*\n" +
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
                "    AND HOTEL.HotelID = ?\n" +
                "    AND ROOMTYPE.Capacity >= ?\n" +
                "GROUP BY ROOMTYPE.Name, ROOMTYPE.HotelID";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            RoomType roomType = new RoomType();
            roomType.setHotelID(rs.getInt("HotelID"));
            roomType.setName(rs.getString("Name"));
            roomType.setFreeCount(rs.getInt("RoomTypesCount"));
            return roomType;
        }, info.getCheckInDate(), info.getCheckOutDate(), info.getCheckInDate(), info.getCheckOutDate(), info.getHotelId(), info.getNumberOfPeople());
    }
}
