package com.example.sweproj.services;

import com.example.sweproj.models.ReservationRequest;
import com.example.sweproj.models.RoomType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomTypeService {
    @Autowired
    private RoomTypeDataAccessService roomTypeDataAccessService;

    public List<RoomType> getRoomTypes(int id) { return this.roomTypeDataAccessService.getRoomTypes(id); }


    public RoomType getRoomType(int hotelID, String roomTypeName) {
        return this.roomTypeDataAccessService.getRoomType(hotelID, roomTypeName);
    }

    public List<RoomType> getAvailableRoomTypes(ReservationRequest info) {
        return this.roomTypeDataAccessService.getAvailableRoomTypes(info);
    }

    public int getTotalPrice(ReservationRequest info) {
        return this.roomTypeDataAccessService.getTotalPrice(info);
    }
}
