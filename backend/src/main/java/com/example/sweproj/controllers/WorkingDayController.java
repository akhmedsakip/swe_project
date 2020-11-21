package com.example.sweproj.controllers;

import com.example.sweproj.dto.InsertWorkingDayRequest;
import com.example.sweproj.dto.ReservationDetailsRequest;
import com.example.sweproj.dto.ReservationRequest;
import com.example.sweproj.dto.WorkingDayRequest;
import com.example.sweproj.models.Person;
import com.example.sweproj.models.User;
import com.example.sweproj.models.WorkingDay;
import com.example.sweproj.services.WorkingDayService;
import com.example.sweproj.utils.Message;
import com.example.sweproj.utils.ValidationUtil;
import com.example.sweproj.validation.groups.ReservationDetailsGroup;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class WorkingDayController {
    @Autowired
    private WorkingDayService workingDayService;

    @Autowired
    private ValidationUtil validationUtil;

    @Autowired
    private Gson gson;

    @GetMapping
    ResponseEntity<String> getWorkingDay(WorkingDayRequest info) {
        List<Message> serverErrors = new ArrayList<>(validationUtil.validate(info));
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            WorkingDay workingDayResponse = this.workingDayService.getWorkingDay(info);
            return ResponseEntity.ok().body(gson.toJson(workingDayResponse));
        } catch(Exception error) {
            serverErrors.add(new Message("Error fetching schedule"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
    }

    @PostMapping
    ResponseEntity<String> changeSchedule(@RequestBody InsertWorkingDayRequest info) {
        List<Message> serverErrors = new ArrayList<>();
        WorkingDay workingDay = info.getWorkingDay();
        if(workingDay == null) {
            serverErrors.add(new Message("Schedule on a specified day should not be empty"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        serverErrors.addAll(validationUtil.validate(info.getWorkingDay()));
        serverErrors.addAll(validationUtil.validate(info));
        if(serverErrors.size() > 0) {
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        try {
            workingDayService.changeSchedule(info);
        } catch(UncategorizedSQLException error) {
            serverErrors.add(new Message("Trying to change schedule of an employee from another hotel"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        } catch(BadSqlGrammarException error) {
            serverErrors.add(new Message("End time should be later than start time"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        } catch(Exception error) {
            error.printStackTrace();
            serverErrors.add(new Message("Server error"));
            return ResponseEntity.status(400).body(gson.toJson(serverErrors));
        }
        return ResponseEntity.ok().body(gson.toJson(new Message("Successfully changed the schedule")));
    }
}