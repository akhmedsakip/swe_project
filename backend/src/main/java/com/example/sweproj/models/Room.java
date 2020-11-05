package com.example.sweproj.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;

public class Room {
    @JsonProperty @NotBlank(message = "HotelID is empty")
    public int hotelID;

    @JsonProperty @NotBlank(message = "RoomNumber is empty")
    public String roomNumber;

    @JsonProperty
    public int floorNumber;

    @JsonProperty
    public int stayingGuestsNumber;

    @JsonProperty
    public String lastCleanDate;

    @JsonProperty
    public String roomTypeName;

    public Room() {

    }
}
