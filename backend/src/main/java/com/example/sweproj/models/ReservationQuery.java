package com.example.sweproj.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


@Valid
public class ReservationQuery {
    private final transient String dateRegEx = "\\d{4}-\\d{2}-\\d{2}";

    @JsonProperty
    @Pattern(regexp = dateRegEx, message = "Checkin date is not in valid form (should be yyyy-MM-dd)")
    public String checkInDate;

    @JsonProperty
    @Pattern(regexp = dateRegEx, message = "Checkout date is not in valid form (should be yyyy-MM-dd)")
    public String checkOutDate;

    @JsonProperty @NotBlank(message = "City is empty")
    public String city;

    @JsonProperty @NotBlank(message = "Number of people is entity")
    public int numberOfPeople;

    public ReservationQuery() {

    }

}
