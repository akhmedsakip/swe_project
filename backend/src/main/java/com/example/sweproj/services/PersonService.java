package com.example.sweproj.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    @Autowired
    private PersonDataAccessService personDataAccessService;

    PersonService() { }

//    public int addGuest(Guest newGuest) {
//        return guestDataAccessService.insertGuest(newGuest);
//    }
}
