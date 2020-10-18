package com.example.sweproj.services;

import com.example.sweproj.models.Hotel;
import org.springframework.stereotype.Service;

@Service
public class HotelService {
	private final HotelDataAccessService hotelDataAccessService;
	
	HotelService(HotelDataAccessService hotelDataAccessService) {
        this.hotelDataAccessService = hotelDataAccessService;
    }
	
    public int addHotel(Hotel hotel) {
        return hotelDataAccessService.insertHotel(hotel);
    }
    
    public int getHotels() {
    	return hotelDataAccessService.getHotels();
    }
}
