package com.example.sweproj.services;

import com.example.sweproj.models.SeasonWeekDay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeasonWeekDayService {
    @Autowired
    private SeasonWeekDayDataAccessService seasonWeekDayDataAccessService;

    public List<SeasonWeekDay> getSeasonWeekDays(int seasonId) {
        return this.seasonWeekDayDataAccessService.getSeasonWeekDays(seasonId);
    }

    public int setSeasonWeekDay(SeasonWeekDay seasonWeekDay) {
        return this.seasonWeekDayDataAccessService.setSeasonWeekDay(seasonWeekDay);
    }
}
