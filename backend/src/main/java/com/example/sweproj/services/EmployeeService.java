package com.example.sweproj.services;

import com.example.sweproj.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeDataAccessService employeeDataAccessService;

    public List<Employee> getHotelEmployees() {
        return this.employeeDataAccessService.getHotelEmployees();
    }
}
