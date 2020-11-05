package com.example.sweproj.services;

import com.example.sweproj.models.AvailableRoomTypesRequest;
import com.example.sweproj.models.RoomType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomTypeService {
    private final RoomTypeDataAccessService roomTypeDataAccessService;

    public RoomTypeService(RoomTypeDataAccessService roomTypeDataAccessService) {
        this.roomTypeDataAccessService = roomTypeDataAccessService;
    }

    public List<RoomType> getRoomTypes(int id) { return this.roomTypeDataAccessService.getRoomTypes(id); }

    public List<RoomType> getAvailableRooms(AvailableRoomTypesRequest info) {
        return this.roomTypeDataAccessService.getAvailableRoomTypes(info);
    }
}
