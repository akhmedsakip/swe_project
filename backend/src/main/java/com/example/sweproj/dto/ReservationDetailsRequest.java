package com.example.sweproj.dto;

import com.example.sweproj.models.Guest;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;

@Valid
public class ReservationDetailsRequest {
    @JsonProperty
    private Guest guest;

    @JsonProperty
    private ReservationRequest reservationRequest;

    public Guest getGuest() {
        return guest;
    }

    public void setGuest(Guest guest) {
        this.guest = guest;
    }

    public ReservationRequest getReservationRequest() {
        return reservationRequest;
    }

    public void setReservationRequest(ReservationRequest reservationRequest) {
        this.reservationRequest = reservationRequest;
    }
}
