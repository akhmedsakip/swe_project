package com.example.sweproj.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class RoomType {
	
	public String hotelID;
	public String roomTypeID;

    @JsonProperty @NotNull(message = "Room type name is empty")
    public String name;

    @JsonProperty @NotNull(message = "Room capacity is empty")
    public String capacity;

    @JsonProperty
    public String photo;

    @JsonProperty
    public String description;
    
    public RoomType() {}

}
