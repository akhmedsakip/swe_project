package com.example.sweproj.models;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {
	private final HotelDataAccessService hotelDataAccessService;
	
	HotelService(HotelDataAccessService hotelDataAccessService) {
        this.hotelDataAccessService = hotelDataAccessService;
    }

    
    public List<Hotel> getHotels() {
    	return hotelDataAccessService.getHotels();
    }
}
