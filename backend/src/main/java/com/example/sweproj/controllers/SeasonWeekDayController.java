package com.example.sweproj.controllers;

import com.example.sweproj.dto.InsertWorkingDayRequest;
import com.example.sweproj.models.Season;
import com.example.sweproj.models.SeasonWeekDay;
import com.example.sweproj.models.WorkingDay;
import com.example.sweproj.services.SeasonService;
import com.example.sweproj.services.SeasonWeekDayService;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/seasons/weekdays")
public class SeasonWeekDayController {
    @Autowired
    private SeasonWeekDayService seasonWeekDayService;

    @Autowired
    private ValidationUtil validationUtil;

    @Autowired
    private Gson gson;

    @GetMapping
    ResponseEntity<String> getSeasonWeekDays(@RequestParam(value = "seasonId") Integer seasonId) {
        List<Message> serverErrors = new ArrayList<>();
        try {
            List<SeasonWeekDay> seasons = this.seasonWeekDayService.getSeasonWeekDays(seasonId);
            return ResponseEntity.ok().body(gson.toJson(seasons));
        } catch(Exception error) {
            serverErrors.add(new Message("Error fetching the season's week days"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
    }

    @PutMapping
    ResponseEntity<String> setSeasonWeekDay(@RequestBody SeasonWeekDay seasonWeekDay) {
        List<Message> serverErrors = new ArrayList<>(validationUtil.validate(seasonWeekDay));
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            seasonWeekDayService.setSeasonWeekDay(seasonWeekDay);
        } catch(UncategorizedSQLException error) {
            serverErrors.add(new Message("Trying to change season of another or non-existing hotel"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        } catch(BadSqlGrammarException error) {
            serverErrors.add(new Message("Coefficient should be at least 0.01"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        } catch(Exception error) {
            error.printStackTrace();
            serverErrors.add(new Message("Server error"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully changed coefficient of specified day of week")));
    }
}
