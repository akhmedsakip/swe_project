package com.example.sweproj.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.*;

@Valid
public class SeasonWeekDay {
    @JsonProperty @NotNull(message = "Season ID is not specified")
    @Min(value = 1, message = "Season ID is less than 1")
    private int seasonId;

    @JsonProperty @NotBlank(message = "Day of week is empty")
    @Pattern(regexp = "Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday",
            message = "Day of week not valid", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String dayOfWeek;

    @JsonProperty @NotNull(message = "Coefficient is not specified")
    @DecimalMin(value = "0.01", message = "Coefficient is less than 0.01")
    private double coefficient;

    public int getSeasonId() {
        return seasonId;
    }

    public void setSeasonId(int seasonId) {
        this.seasonId = seasonId;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public double getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(double coefficient) {
        this.coefficient = coefficient;
    }
}
