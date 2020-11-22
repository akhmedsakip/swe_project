package com.example.sweproj.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Valid
public class WorkingDay {

    @JsonProperty @NotBlank(message = "Day of week is empty")
    @Pattern(regexp = "Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday",
            message = "Day of week not valid", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String dayOfWeek;

    @JsonProperty @NotBlank(message = "Start time is empty")
    @Pattern(regexp = "\\d{2}:\\d{2}", message = "Start time is not in valid form (should be hh-mm)")
    private String startTime;

    @JsonProperty @NotBlank(message = "End time is empty")
    @Pattern(regexp = "\\d{2}:\\d{2}", message = "End time is not in valid form (should be hh-mm)")
    private String endTime;

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
