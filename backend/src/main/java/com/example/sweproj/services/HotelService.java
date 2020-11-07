package com.example.sweproj.services;

import com.example.sweproj.models.ReservationRequest;
import com.example.sweproj.models.Hotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {
    @Autowired
	private HotelDataAccessService hotelDataAccessService;

    public List<Hotel> getHotels() {
    	return hotelDataAccessService.getHotels();
    }

    public List<String> getCities() {
	    return hotelDataAccessService.getCities();
    }

    public List<Hotel> getAvailableHotels(ReservationRequest info) {
	    return this.hotelDataAccessService.getAvailableHotels(info);
    }

    public Hotel getHotel(int hotelId) {
        return hotelDataAccessService.getHotel(hotelId);
    }
}
