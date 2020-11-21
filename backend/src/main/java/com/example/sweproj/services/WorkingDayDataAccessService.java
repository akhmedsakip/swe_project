package com.example.sweproj.services;

import com.example.sweproj.dto.InsertWorkingDayRequest;
import com.example.sweproj.dto.ReservationDetailsRequest;
import com.example.sweproj.dto.WorkingDayRequest;
import com.example.sweproj.models.Employee;
import com.example.sweproj.models.Person;
import com.example.sweproj.models.User;
import com.example.sweproj.models.WorkingDay;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class WorkingDayDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    WorkingDayDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private WorkingDay mapFromDB(ResultSet rs) throws SQLException {
        WorkingDay workingDay = new WorkingDay();
        workingDay.setStartTime(rs.getString("StartTime"));
        workingDay.setEndTime(rs.getString("EndTime"));
        return workingDay;
    }

    WorkingDay getWorkingDay(WorkingDayRequest info) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "SELECT MAX(ewodow.StartTime) StartTime, MAX(ewodow.EndTime) EndTime\n" +
                "FROM employee e\n" +
                "INNER JOIN employee em ON em.UserEmail = ?\n" +
                "LEFT OUTER JOIN employee_works_on_day_of_week ewodow on e.EmployeeID = ewodow.EmployeeID\n" +
                "WHERE e.HotelID = em.HotelID AND e.EmployeeID = ? AND ewodow.DayOfWeek = ? LIMIT 1;";

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), user.getEmail(), info.getEmployeeId(),
                info.getDayOfWeek()).get(0);
    }

    int changeSchedule(InsertWorkingDayRequest info) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "CALL insertWorkingDay(?, ?, ?, ?, ?);";

        return jdbcTemplate.update(sql, info.getEmployeeId(), user.getEmail(), info.getWorkingDay().getDayOfWeek(),
                info.getWorkingDay().getStartTime(), info.getWorkingDay().getEndTime());
    }

    int deleteSchedule(WorkingDayRequest info) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "CALL deleteWorkingDay(?, ?, ?);";

        return jdbcTemplate.update(sql, info.getEmployeeId(), user.getEmail(), info.getDayOfWeek());
    }
}
