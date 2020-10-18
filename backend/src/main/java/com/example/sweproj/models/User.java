package com.example.sweproj.models;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

@Valid
public class User {

    private final String dateRegEx = "\\d{4}-\\d{2}-\\d{2}";

    @JsonProperty
    @NotBlank(message = "First name is empty", groups = UserRegistrationGroup.class)
    public String firstName;

    @JsonProperty
    @NotBlank(message = "Last name is empty", groups = UserRegistrationGroup.class)
    public String lastName;

    @JsonProperty
    @NotBlank(message = "Email is empty", groups={UserLoginGroup.class, UserRegistrationGroup.class})
    @Email(message = "Invalid email", groups={UserLoginGroup.class, UserRegistrationGroup.class})
    public String email;

    @JsonProperty
    @Size(min=6, message = "Password is too short", groups={UserLoginGroup.class, UserRegistrationGroup.class})
    public String password;

    @JsonProperty
    @Pattern(regexp = dateRegEx, message = "Date is not in valid form (should be yyyy-MM-dd)", groups = UserRegistrationGroup.class)
    public String dateOfBirth;

    @JsonProperty
    @NotBlank(message = "Gender is empty", groups = UserRegistrationGroup.class)
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

    public void encodePassword(String password) {
        this.password = password;
    }


}

