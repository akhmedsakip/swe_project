package com.example.sweproj.controllers;

import com.example.sweproj.dto.EditPersonByOrderRequest;
import com.example.sweproj.dto.SetSalaryRequest;
import com.example.sweproj.models.Employee;
import com.example.sweproj.models.Hotel;
import com.example.sweproj.models.Person;
import com.example.sweproj.services.EmployeeService;
import com.example.sweproj.services.HotelService;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private Gson gson;

    @Autowired
    private ValidationUtil validationUtil;

    @GetMapping
    ResponseEntity<String> getHotelEmployees() {
        List<Message> serverErrors = new ArrayList<>();
        try {
            List<Employee> employees = this.employeeService.getHotelEmployees();
            return ResponseEntity.ok().body(gson.toJson(employees));
        } catch(Exception error) {
            serverErrors.add(new Message("Error fetching employees"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
    }

    @PatchMapping("/salary")
    ResponseEntity<String> setBaseSalaryPerHour(@RequestBody SetSalaryRequest setSalaryRequest) {
        List<Message> serverErrors = new ArrayList<>(validationUtil.validate(setSalaryRequest));
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        int orderId = setSalaryRequest.getEmployeeId();
        int newSalary = setSalaryRequest.getBaseSalaryPerHour();
        try {
            if (this.employeeService.setBaseSalaryPerHour(orderId, newSalary) < 1) {
                serverErrors.add(new Message("Error editing the employee's salary. Most probably, you are trying to edit" +
                        " employee of another hotel."));
                return ResponseEntity.status(400).body(gson.toJson(serverErrors));
            }
        } catch(Exception error) {
            error.printStackTrace();
            serverErrors.add(new Message("Server error"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully edited hourly salary of the employee")));
    }
}
