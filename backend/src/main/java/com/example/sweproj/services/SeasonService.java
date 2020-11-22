package com.example.sweproj.services;

import com.example.sweproj.models.Season;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeasonService {
    @Autowired
    private SeasonDataAccessService seasonDataAccessService;

    public List<Season> getHotelSeasons() {
        return this.seasonDataAccessService.getHotelSeasons();
    }

    public int deleteHotelSeason(int seasonId) {
        return this.seasonDataAccessService.deleteHotelSeason(seasonId);
    }

    public int createHotelSeason(Season season) {
        return this.seasonDataAccessService.createHotelSeason(season);
    }
}
