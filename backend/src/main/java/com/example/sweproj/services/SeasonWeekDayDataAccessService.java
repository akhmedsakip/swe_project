package com.example.sweproj.services;

import com.example.sweproj.models.Season;
import com.example.sweproj.models.SeasonWeekDay;
import com.example.sweproj.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class SeasonWeekDayDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    SeasonWeekDayDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private SeasonWeekDay mapFromDB(ResultSet rs) throws SQLException {
        SeasonWeekDay seasonWeekDay = new SeasonWeekDay();
        seasonWeekDay.setDayOfWeek(rs.getString("DayOfWeek"));
        seasonWeekDay.setCoefficient(rs.getFloat("Coefficient"));
        return seasonWeekDay;
    }

    List<SeasonWeekDay> getSeasonWeekDays(int seasonId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "SELECT hwds.DayOfWeek, hwds.Coefficient\n" +
                "FROM season_has_day_of_week hwds\n" +
                "INNER JOIN season s ON s.SeasonID = hwds.SeasonID\n" +
                "INNER JOIN hotel_works_during_season h on s.SeasonID = h.SeasonID\n" +
                "INNER JOIN employee e ON e.HotelID = h.HotelID\n" +
                "WHERE e.UserEmail = ? AND s.SeasonID = ?;\n";

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), user.getEmail(), seasonId);
    }

    int setSeasonWeekDay(SeasonWeekDay seasonWeekDay) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "CALL insertSeasonWeekDay(?, ?, ?, ?);";

        return jdbcTemplate.update(sql, seasonWeekDay.getSeasonId(), user.getEmail(), seasonWeekDay.getDayOfWeek(),
                seasonWeekDay.getCoefficient());
    }
}
