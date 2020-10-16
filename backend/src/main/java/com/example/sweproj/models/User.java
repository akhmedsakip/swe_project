package com.example.sweproj.models;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.Period;

@Valid
public class User {
    @JsonProperty @NotNull(message = "First name is empty")
    public String firstName;

    @JsonProperty @NotNull(message = "Last name is empty")
    public String lastName;

    @NotNull(message = "Email is empty")
    @Email(message = "Invalid email")
    public String email;

    @Size(min=6, message = "Password is too short")
    public String password;

    @JsonProperty
    @JsonFormat(pattern="yyyy-MM-dd")
    public LocalDate dateOfBirth;

    @JsonProperty @NotNull(message = "Gender is empty")
    private String gender;

    public User() {}

    public int getAge() {
        Period period = Period.between(dateOfBirth, LocalDate.now());
        return period.getYears();
    }

    public String getGender() {
        return gender.charAt(0) == 'm' || gender.charAt(0) == 'M' ? "Male" : "Female";
    }
}
