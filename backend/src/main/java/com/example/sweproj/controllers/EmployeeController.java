package com.example.sweproj.controllers;

import com.example.sweproj.models.Employee;
import com.example.sweproj.models.Hotel;
import com.example.sweproj.services.EmployeeService;
import com.example.sweproj.services.HotelService;
import com.example.sweproj.utils.Message;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private Gson gson;

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
}
