package com.example.sweproj.models;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Valid
public class UserLoginDetails {
    @NotNull(message = "Email is empty")
    @Email(message = "Invalid email")
    public String email;

    @Size(min=6, message = "Password is too short")
    public String password;

    public UserLoginDetails() {}
}
