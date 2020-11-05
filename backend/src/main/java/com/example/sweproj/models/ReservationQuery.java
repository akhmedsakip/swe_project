package com.example.sweproj.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;


@Valid
public class ReservationQuery {
    private final transient String dateRegEx = "\\d{4}-\\d{2}-\\d{2}";

    @JsonProperty
    @NotBlank(message = "Checkin date should be non-empty")
    @Pattern(regexp = dateRegEx, message = "Checkin date is not in valid form (should be yyyy-MM-dd)")
    public String checkInDate;

    @JsonProperty
    @NotBlank(message = "Checkout date should be non-empty")
    @Pattern(regexp = dateRegEx, message = "Checkout date is not in valid form (should be yyyy-MM-dd)")
    public String checkOutDate;

    @JsonProperty @NotBlank(message = "City is empty")
    public String city;

    @JsonProperty @NotNull(message = "Number of people is empty") @Min(value = 1, message = "Number of people should be at least 1")
    public int numberOfPeople;

    public ReservationQuery() {

    }

}
