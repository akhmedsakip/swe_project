package com.example.sweproj.services;

import com.example.sweproj.models.ReservationQuery;
import com.example.sweproj.models.Room;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReservationQueryDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    ReservationQueryDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<Room> getAvailableRooms(ReservationQuery query) {
        String sql = "SELECT room.RoomNumber, room.HotelID\n" +
                "FROM (SELECT room.RoomNumber, room.HotelID\n" +
                "FROM orderdetails\n" +
                "INNER JOIN hotel ON hotel.HotelID = orderdetails.OrderHotelID\n" +
                "INNER JOIN `order` ON `order`.OrderID = orderdetails.OrderID AND `order`.HotelID = orderdetails.OrderHotelID\n" +
                "INNER JOIN room ON room.RoomNumber = orderdetails.RoomNumber AND room.HotelID = orderdetails.RoomHotelID\n" +
                "INNER JOIN roomtype ON roomtype.Name = orderdetails.RoomType AND roomtype.HotelID = orderdetails.RoomTypeHotelID\n" +
                "WHERE hotel.City = 'Nur-Sultan'\n" +
                "        AND\n" +
                "        (`order`.CheckInDate BETWEEN '2020-11-30' AND '2020-12-05'\n" +
                "        OR\n" +
                "        `order`.CheckOutDate BETWEEN '2020-11-30' AND '2020-12-05')) der\n" +
                "RIGHT JOIN room ON room.RoomNumber = der.RoomNumber AND room.HotelID = der.HotelID\n" +
                "WHERE der.RoomNumber IS NULL;";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

        });
    }
}
