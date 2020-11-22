package com.example.sweproj.services;

import com.example.sweproj.controllers.RoomTypeController;
import com.example.sweproj.dto.HotelReservationDetailsResponse;
import com.example.sweproj.dto.ReservationDetailsRequest;
import com.example.sweproj.models.Person;
import com.example.sweproj.models.Reservation;
import com.example.sweproj.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ReservationDataAccessService {
    @Autowired
    private PersonDataAccessService personDataAccessService;

    private final JdbcTemplate jdbcTemplate;
    private final RoomTypeService roomTypeService;

    private Reservation mapFromDB(ResultSet rs) throws SQLException {
        Reservation reservation = new Reservation();
        reservation.setOrderId(rs.getInt("OrderId"));
        reservation.setHotel(rs.getString("Hotel"));
        reservation.setRoomType(rs.getString("RoomType"));
        reservation.setCheckInDate(rs.getString("CheckInDate"));
        reservation.setCheckOutDate(rs.getString("CheckOutDate"));
        reservation.setOrderDateTime(rs.getString("OrderDateTime"));
        reservation.setOrderPrice(rs.getInt("OrderPrice"));
        reservation.setStatus(rs.getString("Status"));
        return reservation;
    }

    public ReservationDataAccessService(RoomTypeController roomTypeController, JdbcTemplate jdbcTemplate, RoomTypeService roomTypeService) {
        this.jdbcTemplate = jdbcTemplate;
        this.roomTypeService = roomTypeService;
    }

    public int reserveRoom(ReservationDetailsRequest info, String userEmail) {
        String sql = "CALL reserve(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        int roomTotalPrice = roomTypeService.getTotalPrice(info.getReservationRequest());

        return jdbcTemplate.update(sql, info.getPerson().getGender(), info.getPerson().getFirstName(),
                info.getPerson().getLastName(), info.getPerson().getPhoneNumber(), info.getReservationRequest().getHotelId(),
                roomTotalPrice, info.getReservationRequest().getCheckInDate(),
                info.getReservationRequest().getCheckOutDate(), "Cash", info.getReservationRequest().getRoomTypeName(),
                userEmail);
    }

    public List<Reservation> getReservations(String email) {
        String sql = "SELECT O.OrderID, OD.OrderHotelID, H.Name Hotel, RT.Name RoomType, O.CheckInDate, O.CheckOutDate, O.OrderDateTime, O.OrderPrice, OS.Name Status  FROM order_details OD\n" +
                "    INNER JOIN `order` O on OD.OrderID = o.OrderID and OD.OrderHotelID = o.HotelID\n" +
                "    INNER JOIN room_type RT on OD.RoomTypeHotelID = rt.HotelID and OD.RoomType = rt.Name\n" +
                "    INNER JOIN hotel H on o.HotelID = h.HotelID\n" +
                "    INNER JOIN order_status OS on O.OrderStatus = os.Name\n" +
                "    WHERE O.UserEmail = ? AND OD.IsPayer=TRUE;";
        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), email);
    }

    public int deleteReservation(int orderId, String email) {
        String sql1 = "DELETE O, OD FROM order_details OD\n" +
                "JOIN `order` O on O.OrderID = OD.OrderID and O.HotelID = OD.OrderHotelID\n" +
                "WHERE O.OrderID = ? AND O.UserEmail = ?";
        return jdbcTemplate.update(sql1, orderId, email);
    }

    public List<HotelReservationDetailsResponse> getHotelReservations() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "SELECT O.OrderID, OD.OrderHotelID, H.Name Hotel, RT.Name RoomType, O.CheckInDate, O.CheckOutDate, O.OrderDateTime, O.OrderPrice, OS.Name Status, P.FirstName, P.LastName, P.Gender, P.PhoneNumber FROM order_details OD\n" +
                "                INNER JOIN `order` O on OD.OrderID = o.OrderID and OD.OrderHotelID = o.HotelID\n" +
                "                INNER JOIN room_type RT on OD.RoomTypeHotelID = rt.HotelID and OD.RoomType = rt.Name\n" +
                "                INNER JOIN hotel H on o.HotelID = h.HotelID\n" +
                "                INNER JOIN order_status OS on O.OrderStatus = os.Name\n" +
                "                INNER JOIN person P ON P.PersonID = OD.GuestID\n" +
                "                INNER JOIN employee e ON e.UserEmail = ?\n" +
                "                WHERE O.HotelID = e.HotelID AND OD.IsPayer=TRUE;";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            HotelReservationDetailsResponse hotelReservationDetailsResponse = new HotelReservationDetailsResponse();
            hotelReservationDetailsResponse.setReservation(mapFromDB(rs));
            Person person = new Person();
            person.setFirstName(rs.getString("FirstName"));
            person.setLastName(rs.getString("LastName"));
            person.setGender(rs.getString("Gender"));
            person.setPhoneNumber(rs.getString("PhoneNumber"));
            hotelReservationDetailsResponse.setPerson(person);
            return hotelReservationDetailsResponse;
        }, user.getEmail());
    }

    int deleteHotelReservation(int orderId, String email) {
        String sql = "CALL deleteHotelReservation(?, ?);";
        return jdbcTemplate.update(sql, orderId, email);
    }
}
