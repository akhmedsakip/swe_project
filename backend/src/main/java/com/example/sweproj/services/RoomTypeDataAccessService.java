package com.example.sweproj.services;

import com.example.sweproj.Datasource;
import com.example.sweproj.models.ReservationRequest;
import com.example.sweproj.models.RoomType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class RoomTypeDataAccessService {
    private final Datasource datasource;

    private final JdbcTemplate jdbcTemplate;

    RoomTypeDataAccessService(Datasource datasource, JdbcTemplate jdbcTemplate) {
        this.datasource = datasource;
        this.jdbcTemplate = jdbcTemplate;
    }

    private RoomType mapFromDB(ResultSet rs) throws SQLException {
        RoomType roomType = new RoomType();
        roomType.setHotelID(rs.getInt("HotelID"));
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
        String sql = "SELECT COUNT(room_type.Name) RoomTypesCount, room_type.* \n" +
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
                "    AND hotel.HotelID = ?\n" +
                "    AND room_type.Capacity >= ?\n" +
                "GROUP BY room_type.Name, room_type.HotelID";

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), info.getCheckInDate(), info.getCheckOutDate(), info.getCheckInDate(), info.getCheckOutDate(), info.getHotelId(), info.getNumberOfPeople());
    }

    public int getTotalPrice(ReservationRequest info) {
        String sql1 = "DROP PROCEDURE IF EXISTS getprice;";
        String sql2 = "CREATE PROCEDURE getprice(IN _hotelId INT, IN _checkInDate DATE, IN _checkOutDate DATE,\n" +
                "                          IN _roomTypeName VARCHAR(45), OUT _totalPrice INT)\n" +
                "BEGIN\n" +
                "    DECLARE _date VARCHAR(20);\n" +
                "    DECLARE _coefficient FLOAT;\n" +
                "    DECLARE _basePrice INT;\n" +
                "\n" +
                "    DECLARE EXIT HANDLER FOR SQLEXCEPTION\n" +
                "        BEGIN\n" +
                "            ROLLBACK;\n" +
                "        END;\n" +
                "\n" +
                "    SET _totalPrice = 0;\n" +
                "    SET _date = _checkInDate;\n" +
                "\n" +
                "    START TRANSACTION;\n" +
                "    SELECT room_type.BasePricePerDay\n" +
                "    INTO _basePrice\n" +
                "    FROM room_type\n" +
                "    WHERE room_type.Name = _roomTypeName\n" +
                "      AND room_type.HotelID = _hotelId\n" +
                "    LIMIT 1;\n" +
                "\n" +
                "    WHILE _date < _checkOutDate\n" +
                "        DO\n" +
                "            SELECT Coefficient\n" +
                "            INTO _coefficient\n" +
                "            FROM hotel_works_during_holiday hwdh\n" +
                "                     INNER JOIN holiday ON holiday.HolidayID = hwdh.HolidayID\n" +
                "            WHERE _date BETWEEN holiday.StartDate AND holiday.EndDate\n" +
                "              AND hwdh.HotelID = _hotelId LIMIT 1;\n" +
                "\n" +
                "            IF _coefficient IS NULL THEN\n" +
                "                SELECT shdow.Coefficient\n" +
                "                INTO _coefficient\n" +
                "                FROM hotel_works_during_season hwds\n" +
                "                         INNER JOIN season on hwds.SeasonID = season.SeasonID\n" +
                "                         INNER JOIN season_has_day_of_week shdow on season.SeasonID = shdow.SeasonID\n" +
                "                         INNER JOIN day_of_week dow ON shdow.DayOfWeek = dow.Day\n" +
                "                WHERE _date BETWEEN season.StartDate AND season.EndDate\n" +
                "                  AND dow.Day = DAYNAME(_date)\n" +
                "                  AND hwds.HotelID = _hotelId LIMIT 1;\n" +
                "            END IF;\n" +
                "\n" +
                "            IF _coefficient IS NULL THEN\n" +
                "                SET _coefficient = 1;\n" +
                "            END IF;\n" +
                "\n" +
                "            SET _totalPrice = _totalPrice + CEIL(_basePrice * ROUND(_coefficient, 4));\n" +
                "            SET _date = DATE_ADD(_date, INTERVAL 1 DAY);\n" +
                "        END WHILE;\n" +
                "    COMMIT;\n" +
                "END;";
        String sql3 = "CALL getprice(?, ?, ?, ?, @totalPrice);";
        String sqlSet = "SET @totalPrice = 1";
        String sql4 = "SELECT @totalPrice;";

        jdbcTemplate.execute(sql1);
        jdbcTemplate.execute(sql2);
        jdbcTemplate.update(sql3, info.getHotelId(), info.getCheckInDate(), info.getCheckOutDate(),
                info.getRoomTypeName());

        jdbcTemplate.execute(sqlSet);

        System.out.println(info.getHotelId());
        System.out.println(info.getCheckInDate());
        System.out.println(info.getCheckOutDate());
        System.out.println(info.getRoomTypeName());

        return jdbcTemplate.query(sql4, (rs, rowNum) -> rs.getInt("@totalPrice")).get(0);
    }
}
