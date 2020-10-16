package com.example.sweproj.utils;

public class FieldValidationError extends BaseServerError {
    private String field;

    public FieldValidationError(String field, String message) {
        super(message);
        this.field = field;
    }
}
