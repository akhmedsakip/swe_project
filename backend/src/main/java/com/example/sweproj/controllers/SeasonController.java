package com.example.sweproj.controllers;

import com.example.sweproj.dto.WorkingDayRequest;
import com.example.sweproj.models.Employee;
import com.example.sweproj.models.Season;
import com.example.sweproj.models.SeasonWeekDay;
import com.example.sweproj.models.User;
import com.example.sweproj.services.RoomTypeService;
import com.example.sweproj.services.SeasonService;
import com.example.sweproj.services.SeasonWeekDayService;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seasons")
public class SeasonController {
    @Autowired
    private SeasonService seasonService;

    @Autowired
    private ValidationUtil validationUtil;

    @Autowired
    private Gson gson;

    @GetMapping
    ResponseEntity<String> getHotelSeasons() {
        List<Message> serverErrors = new ArrayList<>();
        try {
            List<Season> seasons = this.seasonService.getHotelSeasons();
            return ResponseEntity.ok().body(gson.toJson(seasons));
        } catch(Exception error) {
            serverErrors.add(new Message("Error fetching seasons"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
    }

    @DeleteMapping
    ResponseEntity<String> deleteHotelSeason(@RequestBody Map<String, Integer> requestBody) {
        List<Message> serverErrors = new ArrayList<>();
        Integer seasonId = requestBody.get("seasonId");

        if(seasonId <= 0) {
            serverErrors.add(new Message("Invalid format of order id"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }

        try {
            seasonService.deleteHotelSeason(seasonId);
        } catch(UncategorizedSQLException error) {
            serverErrors.add(new Message("Trying to delete season of another hotel"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        } catch(Exception error) {
            error.printStackTrace();
            serverErrors.add(new Message("Server error"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully deleted season")));
    }

    @PostMapping
    ResponseEntity<String> createHotelSeason(@RequestBody Season season) {
        List<Message> serverErrors = new ArrayList<>(validationUtil.validate(season));
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }

        try {
            seasonService.createHotelSeason(season);
        } catch(UncategorizedSQLException error) {
            serverErrors.add(new Message("Trying to create season while not working at any hotel"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        } catch(BadSqlGrammarException error) {
            serverErrors.add(new Message("End date should be later than start date"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        } catch(Exception error) {
            error.printStackTrace();
            serverErrors.add(new Message("Server error"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully created season")));
    }
}
