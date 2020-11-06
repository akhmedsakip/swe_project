package com.example.sweproj.models;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Valid
public class Guest {

    public Guest() { }

    private int personID;

    @JsonProperty
    @NotBlank(message = "First name is empty")
    private String firstName;

    @JsonProperty
    @NotBlank(message = "Last name is empty")
    private String lastName;

    @JsonProperty @NotBlank(message = "PhoneNumber is empty")
    private String phoneNumber;

    @JsonProperty @NotBlank(message = "IdentificationID is empty")
    private String identificationID;

    @JsonProperty @NotNull(message = "IdentificationID is empty")
    @Min(value = 1, message = "IdentificationTypeID should be at least 1")
    private int identificationTypeID;

    @JsonProperty
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Date is not in valid form (should be yyyy-MM-dd)")
    private String dateOfBirth;

    @JsonProperty
    @NotBlank(message = "Gender is empty")
    private String gender;

    @JsonProperty @NotBlank(message = "CountryCode is empty")
    private String countryCode;

    @JsonProperty @NotBlank(message = "City is empty")
    private String city;

    @JsonProperty @NotBlank(message = "Street is empty")
    private String street;

    @JsonProperty @NotBlank(message = "ZIPCode is empty")
    private String zipCode;

    public String getGender() {
        return gender.charAt(0) == 'm' || gender.charAt(0) == 'M' ? "Male" : "Female";
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getPersonID() {
        return personID;
    }

    public void setPersonID(int personID) {
        this.personID = personID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getIdentificationID() {
        return identificationID;
    }

    public void setIdentificationID(String identificationID) {
        this.identificationID = identificationID;
    }

    public int getIdentificationTypeID() {
        return identificationTypeID;
    }

    public void setIdentificationTypeID(int identificationTypeID) {
        this.identificationTypeID = identificationTypeID;
    }
}

