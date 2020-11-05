package com.example.sweproj.services;

import com.example.sweproj.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserDataAccessService userDataAccessService;

    UserService() { }

    public int addUser(User user) {
        return userDataAccessService.insertUser(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userDataAccessService.loadUserByUsername(email);
    }

    public int editUser(User newUser) {
        return userDataAccessService.editUser(newUser);
    }

    public int changePassword(String newPasswordEncoded) {
        return userDataAccessService.changePassword(newPasswordEncoded);
    }
}
