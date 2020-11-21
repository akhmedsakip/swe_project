package com.example.sweproj.dto;

import com.example.sweproj.models.WorkingDay;
import com.example.sweproj.validation.groups.AvailableRoomTypesGroup;
import com.example.sweproj.validation.groups.ReservationDetailsGroup;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Valid
public class WorkingDayRequest {
    @JsonProperty @NotNull(message = "Employee ID is not specified")
    @Min(value = 1, message = "Employee ID is less than 1")
    private int employeeId;

    @JsonProperty @NotBlank(message = "Day of week is empty")
    @Pattern(regexp = "Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday",
            message = "Day of week not valid", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String dayOfWeek;

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
}
