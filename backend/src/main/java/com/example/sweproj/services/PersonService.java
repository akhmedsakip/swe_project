package com.example.sweproj.services;

import com.example.sweproj.models.Person;
import com.example.sweproj.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    @Autowired
    private PersonDataAccessService personDataAccessService;

    PersonService() { }

    public int editPersonByOrder(Person person, int orderId) {
        return this.personDataAccessService.editPersonByOrder(person, orderId);
    }
}
