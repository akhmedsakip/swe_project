package com.example.sweproj.models;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RoomType {
	
	public String hotelID;
	public String roomTypeID;

    @JsonProperty @NotNull(message = "Room type name is empty")
    public String roomTypeName;

    @JsonProperty @NotNull(message = "Room capacity is empty")
    public String roomCapacity;

    @JsonProperty
    public String photo;

    @JsonProperty
    public String description;
    
    public RoomType() {}

}
