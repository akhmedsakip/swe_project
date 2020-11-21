package com.example.sweproj.dto;

import com.example.sweproj.models.Person;
import com.example.sweproj.models.Reservation;
import com.fasterxml.jackson.annotation.JsonProperty;

public class HotelReservationDetailsResponse {
    @JsonProperty
    private Person person;

    @JsonProperty
    private Reservation reservation;

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }
}
