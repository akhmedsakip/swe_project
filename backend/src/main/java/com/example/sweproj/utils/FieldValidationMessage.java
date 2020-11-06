package com.example.sweproj.utils;

public class FieldValidationMessage extends Message {
    private String field;

    public FieldValidationMessage(String field, String message) {
        super(message);
        this.field = field;
    }
}
