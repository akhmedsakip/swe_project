package com.example.sweproj.services;

import com.example.sweproj.dto.InsertWorkingDayRequest;
import com.example.sweproj.models.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class SeasonDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    SeasonDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Season mapFromDB(ResultSet rs) throws SQLException {
        Season season = new Season();
        season.setSeasonId(rs.getInt("SeasonID"));
        season.setName(rs.getString("Name"));
        season.setStartDate(rs.getString("StartDate"));
        season.setEndDate(rs.getString("EndDate"));
        season.setAdvisory(rs.getString("Advisory"));
        return season;
    }

    List<Season> getHotelSeasons() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "SELECT s.SeasonID, s.Name, s.StartDate, s.EndDate, hwds.Advisory\n" +
                "FROM season s\n" +
                "INNER JOIN hotel_works_during_season hwds ON s.SeasonID = hwds.SeasonID\n" +
                "INNER JOIN employee e on hwds.HotelID = e.HotelID\n" +
                "WHERE e.UserEmail = ?;";

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), user.getEmail());
    }

    int deleteHotelSeason(int seasonId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "CALL deleteSeason(?, ?);";

        return jdbcTemplate.update(sql, seasonId, user.getEmail());
    }

    int createHotelSeason(Season season) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "CALL insertSeason(?, ?, ?, ?, ?);";

        return jdbcTemplate.update(sql, season.getName(), season.getStartDate(), season.getEndDate(),
                season.getAdvisory(), user.getEmail());
    }

    int editHotelSeason(Season season) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "UPDATE season s\n" +
                "    INNER JOIN hotel_works_during_season hwds ON s.SeasonID = hwds.SeasonID\n" +
                "    INNER JOIN employee e ON e.HotelID = hwds.HotelID\n" +
                "SET Name      = ?,\n" +
                "    StartDate = ?,\n" +
                "    EndDate   = ?,\n" +
                "    Advisory  = ?\n" +
                "WHERE S.SeasonID = ?\n" +
                "  AND e.UserEmail = ?;";

        return jdbcTemplate.update(sql, season.getName(), season.getStartDate(), season.getEndDate(),
                season.getAdvisory(), season.getSeasonId(), user.getEmail());
    }
}
