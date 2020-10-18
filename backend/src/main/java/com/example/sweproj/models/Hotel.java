package com.example.sweproj.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;

public class Hotel {

    public String hotelID;

    @JsonProperty @NotBlank(message = "Hotel name is empty")
    public String name;

    @JsonProperty @NotBlank(message = "Number of floors is empty")
    public String numberOfFloors;

    @JsonProperty @NotBlank(message = "Number of rooms is empty")
    public String numberOfRooms;

    @JsonProperty
    public String numberOfFreeRooms;

    @JsonProperty @NotBlank(message = "Country is empty")
    public String country;

    @JsonProperty @NotBlank(message = "City is empty")
    public String city;

    @JsonProperty @NotBlank(message = "Street is empty")
    public String street;

    @JsonProperty @NotBlank(message = "ZIPCode is empty")
    public String zipCode;

    @JsonProperty
    public String mainHotelPicture;

    public Hotel() { }

}
