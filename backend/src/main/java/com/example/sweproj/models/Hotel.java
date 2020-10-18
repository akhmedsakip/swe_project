package com.example.sweproj.models;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Hotel {    

    @JsonProperty @NotNull(message = "First name is empty")
    public String name;

    @JsonProperty @NotNull(message = "First name is empty")
    public String numberOfFloors;
    
    @JsonProperty @NotNull(message = "First name is empty")
    public String numberOfRooms;
    
    @JsonProperty @NotNull(message = "First name is empty")
    public String numberOfFreeRooms;
    
    @JsonProperty @NotNull(message = "First name is empty")
    public String country;
    
    @JsonProperty @NotNull(message = "First name is empty")
    public String city;
    
    @JsonProperty @NotNull(message = "First name is empty")
    public String street;
    
    @JsonProperty @NotNull(message = "First name is empty")
    public String zipCode;

    Hotel() {

    }
    
    Hotel(String Name, String City) {
    	this.name = Name;
    	this.city = City;
    }

}
