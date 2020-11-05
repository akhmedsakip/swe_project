package com.example.sweproj.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;


@Valid
public class AvailableRoomTypesRequest {
    @JsonProperty
    @NotBlank(message = "Checkin date should be non-empty")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Checkin date is not in valid form (should be yyyy-MM-dd)")
    private String checkInDate;

    @JsonProperty
    @NotBlank(message = "Checkout date should be non-empty")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Checkout date is not in valid form (should be yyyy-MM-dd)")
    private String checkOutDate;

    @JsonProperty @NotBlank(message = "City is empty")
    private String city;

    @JsonProperty @NotNull(message = "Number of people is empty") @Min(value = 1, message = "Number of people should be at least 1")
    private int numberOfPeople;

    public AvailableRoomTypesRequest() {

    }

    public String getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(String checkInDate) {
        this.checkInDate = checkInDate;
    }

    public String getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(String checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(int numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }
}
