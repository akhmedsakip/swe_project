package com.example.sweproj.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Valid
public class AuthenticationRequest {

    AuthenticationRequest() {}

    @JsonProperty
    @NotBlank(message = "Email is empty")
    @Email(message = "Invalid email")
    private String email;


    @JsonProperty
    @NotBlank(message = "Password is empty")
    @Size(min=6, message = "Password is too short")
    private transient String password;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
