package com.example.sweproj.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Valid
public class SetSalaryRequest {
    @JsonProperty @NotNull(message = "Employee ID is not specified")
    @Min(value = 1, message = "Employee ID is less than 1")
    private int employeeId;

    @JsonProperty @NotNull(message = "Employee ID is not specified")
    @Min(value = 0, message = "Salary cannot be negative")
    private int baseSalaryPerHour;

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public int getBaseSalaryPerHour() {
        return baseSalaryPerHour;
    }

    public void setBaseSalaryPerHour(int baseSalaryPerHour) {
        this.baseSalaryPerHour = baseSalaryPerHour;
    }
}
