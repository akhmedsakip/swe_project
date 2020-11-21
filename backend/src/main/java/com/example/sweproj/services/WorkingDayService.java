package com.example.sweproj.services;

import com.example.sweproj.dto.InsertWorkingDayRequest;
import com.example.sweproj.dto.WorkingDayRequest;
import com.example.sweproj.models.WorkingDay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkingDayService {
    @Autowired
    private WorkingDayDataAccessService workingDayDataAccessService;

    public WorkingDay getWorkingDay(WorkingDayRequest info) {
        return this.workingDayDataAccessService.getWorkingDay(info);
    }

    public int changeSchedule(InsertWorkingDayRequest info) {
        return this.workingDayDataAccessService.changeSchedule(info);
    }
}
