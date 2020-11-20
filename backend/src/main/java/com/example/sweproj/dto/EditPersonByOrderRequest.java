package com.example.sweproj.dto;

import com.example.sweproj.models.Person;
import com.example.sweproj.models.Reservation;
import com.example.sweproj.validation.groups.AvailableRoomTypesGroup;
import com.example.sweproj.validation.groups.ReservationDetailsGroup;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class EditPersonByOrderRequest {
    @JsonProperty
    private Person person;

    @JsonProperty
    @NotNull(message = "Order ID is not specified")
    @Min(value = 1, message = "Order ID is less than 1")
    private int orderId;

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }
}
