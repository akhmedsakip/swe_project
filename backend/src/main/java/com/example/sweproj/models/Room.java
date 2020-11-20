package com.example.sweproj.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;

public class Room {
    @JsonProperty @NotBlank(message = "HotelID is empty")
    private int hotelId;

    @JsonProperty @NotBlank(message = "RoomNumber is empty")
    private String roomNumber;

    @JsonProperty
    private int floorNumber;

    @JsonProperty
    private int stayingGuestsNumber;

    @JsonProperty
    private String lastCleanDate;

    @JsonProperty
    private String roomTypeName;

    public Room() {

    }

    public int getHotelId() {
        return hotelId;
    }

    public void setHotelId(int hotelId) {
        this.hotelId = hotelId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public int getFloorNumber() {
        return floorNumber;
    }

    public void setFloorNumber(int floorNumber) {
        this.floorNumber = floorNumber;
    }

    public int getStayingGuestsNumber() {
        return stayingGuestsNumber;
    }

    public void setStayingGuestsNumber(int stayingGuestsNumber) {
        this.stayingGuestsNumber = stayingGuestsNumber;
    }

    public String getLastCleanDate() {
        return lastCleanDate;
    }

    public void setLastCleanDate(String lastCleanDate) {
        this.lastCleanDate = lastCleanDate;
    }

    public String getRoomTypeName() {
        return roomTypeName;
    }

    public void setRoomTypeName(String roomTypeName) {
        this.roomTypeName = roomTypeName;
    }
}
