package com.example.sweproj.models;

import org.hibernate.validator.constraints.Length;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@Valid
public class ChangePasswordRequest {
    @NotBlank
    @Length(min = 6)
    private String oldPassword;

    @NotBlank
    @Length(min = 6)
    private String newPassword;

    ChangePasswordRequest() {}

    public String getNewPassword() {
        return newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }
}
