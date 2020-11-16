package com.example.sweproj.services;

import com.example.sweproj.dto.ReservationRequest;
import com.example.sweproj.models.RoomType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class RoomTypeDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    RoomTypeDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RoomType mapFromDB(ResultSet rs) throws SQLException {
        RoomType roomType = new RoomType();
        roomType.setHotelId(rs.getInt("HotelID"));
        roomType.setName(rs.getString("Name"));
        roomType.setCapacity(rs.getString("Capacity"));
        roomType.setPhoto(rs.getString("MainPhoto"));
        roomType.setDescription(rs.getString("Description"));
        return roomType;
    }

    List<RoomType> getRoomTypes(int hotelID) {
        String sql = "SELECT * FROM room_type WHERE HotelID = ?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), hotelID);
    }

    RoomType getRoomType(int hotelID, String roomTypeName) {
        String sql = "SELECT * FROM room_type WHERE HotelID = ? AND Name = ?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), hotelID, roomTypeName).get(0);
    }

    List<RoomType> getAvailableRoomTypes(ReservationRequest info) {
        String sql = "SELECT COUNT(DISTINCT room.RoomNumber) RoomTypesCount, room_type.*\n" +
                "FROM room\n" +
                "INNER JOIN hotel ON hotel.HotelID = room.HotelID\n" +
                "INNER JOIN room_type ON room_type.HotelID = room.HotelID AND room.RoomTypeName = room_type.Name\n" +
                "LEFT JOIN order_details OD on room.HotelID = OD.RoomHotelID and room.RoomNumber = OD.RoomNumber\n" +
                "LEFT JOIN `order` O ON hotel.HotelID = O.HotelID and OD.OrderID = O.OrderID\n" +
                "WHERE (O.OrderID IS NULL\n" +
                "    OR NOT EXISTS (SELECT `order`.CheckOutDate\n" +
                "        FROM `order`\n" +
                "                 INNER JOIN order_details d on `order`.OrderID = d.OrderID and `order`.HotelID = d.OrderHotelID\n" +
                "        WHERE d.RoomType = room.RoomTypeName\n" +
                "          AND (`order`.CheckInDate BETWEEN ? AND DATE_SUB(?, INTERVAL 1 DAY) OR\n" +
                "               `order`.CheckOutDate BETWEEN DATE_ADD(?, INTERVAL 1 DAY) AND ?)))\n" +
                "    AND hotel.HotelID = ?\n" +
                "    AND room_type.Capacity >= ?\n" +
                "GROUP BY RoomTypeName, room.HotelID;";

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), info.getCheckInDate(), info.getCheckOutDate(), info.getCheckInDate(), info.getCheckOutDate(), info.getHotelId(), info.getNumberOfPeople());
    }

    public int getTotalPrice(ReservationRequest info) {
        String sql = "SELECT getPrice(?, ?, ?, ?) TotalPrice;";

        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getInt("TotalPrice"), info.getHotelId(),
                info.getCheckInDate(), info.getCheckOutDate(), info.getRoomTypeName()).get(0);
    }
}
