package com.example.sweproj.models;
import ch.qos.logback.core.util.DatePatternToRegexUtil;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

@Valid
public class User {

    private final String dateRegEx = "\\d{4}-\\d{2}-\\d{2}";

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
    @Pattern(regexp = dateRegEx, message = "Date is not in valid form (should be yyyy-MM-dd)")
    public String dateOfBirth;

    @JsonProperty @NotNull(message = "Gender is empty")
    private String gender;

    public User() {}

    public int getAge() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(dateOfBirth, formatter);
        Period period = Period.between(localDate, LocalDate.now());
        return period.getYears();
    }

    public String getGender() {
        return gender.charAt(0) == 'm' || gender.charAt(0) == 'M' ? "Male" : "Female";
    }
}
