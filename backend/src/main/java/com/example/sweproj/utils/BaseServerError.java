package com.example.sweproj.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

public class BaseServerError {
    public String message;

    public BaseServerError(String message) {
        this.message = message;
    }
}
