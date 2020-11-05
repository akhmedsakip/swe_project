package com.example.sweproj.services;

import com.example.sweproj.models.AvailableEntitiesRequest;
import com.example.sweproj.models.Hotel;
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

    public List<String> getCities() {
	    return hotelDataAccessService.getCities();
    }

    public List<Hotel> getAvailableHotels(AvailableEntitiesRequest info) {
	    return this.hotelDataAccessService.getAvailableHotels(info);
    }

    public Hotel getHotel(int hotelId) {
        return hotelDataAccessService.getHotel(hotelId);
    }
}
