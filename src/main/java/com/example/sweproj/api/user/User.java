package com.example.sweproj.api.user;

import java.util.UUID;


public class User {
    private UUID uuid;
    private String name;
    private String surname;

    User(String name, String surname) {
        this.name = name;
        this.surname = surname;
        uuid = UUID.randomUUID();
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public UUID getUuid() {
        return uuid;
    }
}
