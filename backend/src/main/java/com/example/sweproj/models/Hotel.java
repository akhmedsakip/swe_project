package com.example.sweproj.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

public class Hotel {

    private int hotelId;

    @JsonProperty @NotBlank(message = "Hotel name is empty")
    private String name;

    @JsonProperty @NotBlank(message = "Description is empty")
    private String description;

    @JsonProperty @NotBlank(message = "Number of floors is empty")
    private String numberOfFloors;

    @JsonProperty @NotBlank(message = "Number of rooms is empty")
    private String numberOfRooms;

    @JsonProperty
    private String numberOfFreeRooms;

    @JsonProperty @NotBlank(message = "Country is empty")
    private String country;

    @JsonProperty @NotBlank(message = "City is empty")
    private String city;

    @JsonProperty @NotBlank(message = "Street is empty")
    private String street;

    @JsonProperty @NotBlank(message = "ZIPCode is empty")
    private String zipCode;

    @JsonProperty
    private String mainHotelPicture;

    @JsonProperty @Min(0) @Max(5)
    private int starCount;

    public Hotel() { }

    public int getHotelId() {
        return hotelId;
    }

    public void setHotelId(int hotelId) {
        this.hotelId = hotelId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNumberOfFloors() {
        return numberOfFloors;
    }

    public void setNumberOfFloors(String numberOfFloors) {
        this.numberOfFloors = numberOfFloors;
    }

    public String getNumberOfRooms() {
        return numberOfRooms;
    }

    public void setNumberOfRooms(String numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }

    public String getNumberOfFreeRooms() {
        return numberOfFreeRooms;
    }

    public void setNumberOfFreeRooms(String numberOfFreeRooms) {
        this.numberOfFreeRooms = numberOfFreeRooms;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getMainHotelPicture() {
        return mainHotelPicture;
    }

    public void setMainHotelPicture(String mainHotelPicture) {
        this.mainHotelPicture = mainHotelPicture;
    }

    public int getStarCount() {
        return starCount;
    }

    public void setStarCount(int starCount) {
        this.starCount = starCount;
    }
}
