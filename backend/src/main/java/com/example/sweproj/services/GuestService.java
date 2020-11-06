package com.example.sweproj.services;

import com.example.sweproj.models.Guest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuestService {
    @Autowired
    private GuestDataAccessService guestDataAccessService;

    GuestService() { }

//    public int addGuest(Guest newGuest) {
//        return guestDataAccessService.insertGuest(newGuest);
//    }
}
