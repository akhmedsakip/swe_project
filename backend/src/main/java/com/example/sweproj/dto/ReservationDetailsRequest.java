package com.example.sweproj.dto;

import com.example.sweproj.models.Person;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;

@Valid
public class ReservationDetailsRequest {
    @JsonProperty
    private Person person;

    @JsonProperty
    private ReservationRequest reservationRequest;

    public Person getGuest() {
        return person;
    }

    public void setGuest(Person person) {
        this.person = person;
    }

    public ReservationRequest getReservationRequest() {
        return reservationRequest;
    }

    public void setReservationRequest(ReservationRequest reservationRequest) {
        this.reservationRequest = reservationRequest;
    }
}
