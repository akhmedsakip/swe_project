package com.example.sweproj.models;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Hotel {

    public String hotelID;

    @JsonProperty @NotNull(message = "Hotel name is empty")
    public String name;

    @JsonProperty @NotNull(message = "Number of floors is empty")
    public String numberOfFloors;

    @JsonProperty @NotNull(message = "Number of rooms is empty")
    public String numberOfRooms;

    @JsonProperty
    public String numberOfFreeRooms;

    @JsonProperty @NotNull(message = "Country is empty")
    public String country;

    @JsonProperty @NotNull(message = "City is empty")
    public String city;

    @JsonProperty @NotNull(message = "Street is empty")
    public String street;

    @JsonProperty @NotNull(message = "ZIPCode is empty")
    public String zipCode;

    @JsonProperty
    public String mainHotelPicture;

    public Hotel() { }

}
