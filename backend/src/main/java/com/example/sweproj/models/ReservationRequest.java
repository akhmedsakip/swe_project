package com.example.sweproj.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;


@Valid
public class ReservationRequest {
    @JsonProperty
    @NotNull(message = "Hotel ID is not specified", groups = {AvailableRoomTypesGroup.class, ReservationDetailsGroup.class})
    @Min(value = 1, message = "Hotel ID is less than 1", groups = {AvailableRoomTypesGroup.class, ReservationDetailsGroup.class})
    private int hotelId;

    @JsonProperty
    @NotNull(message = "RoomType is not specified", groups= {ReservationDetailsGroup.class})
    private String roomTypeName;

    @JsonProperty
    @NotBlank(message = "Checkin date should be non-empty",
            groups = {AvailableHotelsGroup.class, AvailableRoomTypesGroup.class, ReservationDetailsGroup.class})
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Checkin date is not in valid form (should be yyyy-MM-dd)",
            groups = {AvailableHotelsGroup.class, AvailableRoomTypesGroup.class, ReservationDetailsGroup.class})
    private String checkInDate;

    @JsonProperty
    @NotBlank(message = "Checkout date should be non-empty",
            groups = {AvailableHotelsGroup.class, AvailableRoomTypesGroup.class, ReservationDetailsGroup.class})
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Checkout date is not in valid form (should be yyyy-MM-dd)",
            groups = {AvailableHotelsGroup.class, AvailableRoomTypesGroup.class, ReservationDetailsGroup.class})
    private String checkOutDate;

    @JsonProperty @NotBlank(message = "City is empty",
            groups = {AvailableHotelsGroup.class})
    private String city;

    @JsonProperty @NotNull(message = "Number of people is empty",
            groups = {AvailableHotelsGroup.class, AvailableRoomTypesGroup.class})
    @Min(value = 1, message = "Number of people should be at least 1",
            groups = {AvailableHotelsGroup.class, AvailableRoomTypesGroup.class})
    private int numberOfPeople;

    public ReservationRequest() {

    }

    public String getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(String checkInDate) {
        this.checkInDate = checkInDate;
    }

    public String getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(String checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(int numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public int getHotelId() {
        return hotelId;
    }

    public void setHotelId(int hotelId) {
        this.hotelId = hotelId;
    }

    public String getRoomTypeName() {
        return roomTypeName;
    }

    public void setRoomTypeName(String roomTypeName) {
        this.roomTypeName = roomTypeName;
    }
}
