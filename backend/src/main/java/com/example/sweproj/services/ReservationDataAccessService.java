package com.example.sweproj.services;

import com.example.sweproj.controllers.RoomTypeController;
import com.example.sweproj.dto.ReservationDetailsRequest;
import com.example.sweproj.models.Hotel;
import com.example.sweproj.models.Reservation;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class ReservationDataAccessService {
    private final JdbcTemplate jdbcTemplate;
    private final RoomTypeService roomTypeService;

    private Reservation mapFromDB(ResultSet rs) throws SQLException {
        Reservation reservation = new Reservation();
        reservation.setHotel(rs.getString("Hotel"));
        reservation.setRoomType(rs.getString("RoomType"));
        reservation.setCheckInDate(rs.getString("CheckInDate"));
        reservation.setCheckOutDate(rs.getString("CheckOutDate"));
        reservation.setOrderDateTime(rs.getString("OrderDateTime"));
        reservation.setStatus(rs.getString("Status"));
        return reservation;
    }

    public ReservationDataAccessService(RoomTypeController roomTypeController, JdbcTemplate jdbcTemplate, RoomTypeService roomTypeService) {
        this.jdbcTemplate = jdbcTemplate;
        this.roomTypeService = roomTypeService;
    }

    public int reserveRoom(ReservationDetailsRequest info, String userEmail) {
        String sql = "CALL reserve(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        int roomTotalPrice = roomTypeService.getTotalPrice(info.getReservationRequest()); // TODO transfer to controller

        return jdbcTemplate.update(sql, info.getGuest().getGender(), info.getGuest().getFirstName(),
                info.getGuest().getLastName(), info.getGuest().getPhoneNumber(), info.getReservationRequest().getHotelId(),
                roomTotalPrice, LocalDate.now(), info.getReservationRequest().getCheckInDate(),
                info.getReservationRequest().getCheckOutDate(), "Cash", info.getReservationRequest().getRoomTypeName(),
                userEmail);
    }

    public List<Reservation> getReservations(String email) {
        String sql = "SELECT H.Name Hotel, RT.Name RoomType, O.CheckInDate, O.CheckOutDate, O.OrderDateTime, OS.Name Status  FROM order_details OD\n" +
                "    INNER JOIN `order` O on OD.OrderID = o.OrderID and OD.OrderHotelID = o.HotelID\n" +
                "    INNER JOIN room_type RT on OD.RoomTypeHotelID = rt.HotelID and OD.RoomType = rt.Name\n" +
                "    INNER JOIN hotel H on o.HotelID = h.HotelID\n" +
                "    INNER JOIN order_status OS on O.OrderStatus = os.Name\n" +
                "    WHERE O.UserEmail = ?;";
        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), email);
    }
}
