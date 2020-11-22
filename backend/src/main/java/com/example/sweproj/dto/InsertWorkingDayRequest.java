package com.example.sweproj.dto;

import com.example.sweproj.models.WorkingDay;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Valid
public class InsertWorkingDayRequest {
    @JsonProperty
    @NotNull(message = "Employee ID is not specified")
    @Min(value = 1, message = "Employee ID is less than 1")
    private int employeeId;

    @JsonProperty
    private WorkingDay workingDay;

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public WorkingDay getWorkingDay() {
        return workingDay;
    }

    public void setWorkingDay(WorkingDay workingDay) {
        this.workingDay = workingDay;
    }
}
