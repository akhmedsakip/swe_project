package com.example.sweproj.services;

import com.example.sweproj.models.Employee;
import com.example.sweproj.models.Hotel;
import com.example.sweproj.models.Person;
import com.example.sweproj.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class EmployeeDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    EmployeeDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Employee mapFromDB(ResultSet rs) throws SQLException {
        Employee employee = new Employee();
        employee.setEmployeeId(rs.getInt("EmployeeID"));
        Person person = new Person();
        person.setFirstName(rs.getString("FirstName"));
        person.setLastName(rs.getString("LastName"));
        person.setPhoneNumber(rs.getString("PhoneNumber"));
        person.setGender(rs.getString("Gender"));
        person.setIdentificationTypeName(rs.getString("IdentificationTypeName"));
        person.setIdentificationID(rs.getString("IdentificationID"));
        person.setDateOfBirth(rs.getString("DateOfBirth"));
        employee.setPerson(person);
        employee.setUserEmail(rs.getString("UserEmail"));
        employee.setEmploymentDate(rs.getString("EmploymentDate"));
        employee.setDismissalDate(rs.getString("DismissalDate"));
        employee.setPosition(rs.getString("Position"));
        employee.setBaseSalaryPerHour(rs.getInt("BaseSalaryPerHour"));
        return employee;
    }

    List<Employee> getHotelEmployees() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "SELECT e.EmployeeID, person.FirstName, person.LastName, person.PhoneNumber, e.UserEmail, person.Gender, IT.Name IdentificationTypeName,\n" +
                "       person.IdentificationID, person.DateOfBirth, e.EmploymentDate, e.DismissalDate, IFNULL(AdministrativePosition, CleaningPosition) Position, e.BaseSalaryPerHour\n" +
                "FROM person\n" +
                "INNER JOIN employee e ON person.PersonID = e.EmployeeID\n" +
                "INNER JOIN employee em ON em.UserEmail = ?\n" +
                "LEFT OUTER JOIN identification_type IT ON person.IdentificationTypeID = IT.IdentificationTypeID\n" +
                "LEFT OUTER JOIN administrative_staff `as` ON e.EmployeeID = `as`.AdministrativeStaffID\n" +
                "LEFT OUTER JOIN cleaning_staff cs on e.EmployeeID = cs.CleaningStaffID\n" +
                "WHERE e.HotelID = em.HotelID;";

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapFromDB(rs), user.getEmail());
    }

    int setBaseSalaryPerHour(int employeeId, int baseSalaryPerHour) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String sql = "UPDATE employee E\n" +
                "    INNER JOIN employee EM ON EM.HotelID = E.HotelID\n" +
                "SET E.BaseSalaryPerHour = ?\n" +
                "WHERE E.EmployeeID = ? AND EM.UserEmail = ?;";

        return jdbcTemplate.update(sql, baseSalaryPerHour, employeeId, user.getEmail());
    }
}
