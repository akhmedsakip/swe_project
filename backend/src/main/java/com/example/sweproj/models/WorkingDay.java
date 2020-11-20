package com.example.sweproj.models;

import com.example.sweproj.validation.groups.AvailableHotelsGroup;
import com.example.sweproj.validation.groups.AvailableRoomTypesGroup;
import com.example.sweproj.validation.groups.ReservationDetailsGroup;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class WorkingDay {
    @JsonProperty @NotBlank(message = "EmployeeID is empty")
    private int employeeId;

    @JsonProperty @NotBlank(message = "Day of week is empty")
    private String dayOfWeek;

    @JsonProperty @NotBlank(message = "Start time is empty")
    @Pattern(regexp = "\\d{2}:\\d{2}", message = "Start time is not in valid form (should be hh-mm)")
    private String startTime;

    @JsonProperty @NotBlank(message = "End time is empty")
    @Pattern(regexp = "\\d{2}:\\d{2}", message = "End time is not in valid form (should be hh-mm)")
    private String endTime;
}
