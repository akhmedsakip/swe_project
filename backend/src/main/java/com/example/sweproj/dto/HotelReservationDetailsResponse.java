package com.example.sweproj.dto;

import com.example.sweproj.models.Guest;
import com.example.sweproj.models.Reservation;
import com.fasterxml.jackson.annotation.JsonProperty;

public class HotelReservationDetailsResponse {
    @JsonProperty
    private Guest guest;

    @JsonProperty
    private Reservation reservation;

    public Guest getGuest() {
        return guest;
    }

    public void setGuest(Guest guest) {
        this.guest = guest;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }
}
