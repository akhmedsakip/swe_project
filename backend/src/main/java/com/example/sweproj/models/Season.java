package com.example.sweproj.models;

import com.example.sweproj.validation.groups.AvailableHotelsGroup;
import com.example.sweproj.validation.groups.AvailableRoomTypesGroup;
import com.example.sweproj.validation.groups.EditSeasonGroup;
import com.example.sweproj.validation.groups.ReservationDetailsGroup;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Valid
public class Season {
    @JsonProperty @NotNull(message = "Season ID is not specified", groups = {EditSeasonGroup.class})
    @Min(value = 1, message = "Season ID is less than 1", groups = {EditSeasonGroup.class})
    private int seasonId;

    @JsonProperty @NotNull(message = "Room type name is empty")
    private String name;

    @JsonProperty
    @NotBlank(message = "Start date should be non-empty")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Start date is not in valid form (should be yyyy-MM-dd)")
    private String startDate;

    @JsonProperty
    @NotBlank(message = "End date should be non-empty")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Start date is not in valid form (should be yyyy-MM-dd)")
    private String endDate;

    @JsonProperty @NotNull(message = "Advisory is empty")
    private String advisory;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getAdvisory() {
        return advisory;
    }

    public void setAdvisory(String advisory) {
        this.advisory = advisory;
    }

    public int getSeasonId() {
        return seasonId;
    }

    public void setSeasonId(int seasonId) {
        this.seasonId = seasonId;
    }
}
