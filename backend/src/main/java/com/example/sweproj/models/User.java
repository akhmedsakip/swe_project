package com.example.sweproj.models;
import com.example.sweproj.validation.groups.UserEditGroup;
import com.example.sweproj.validation.groups.UserRegisterGroup;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Valid
public class User implements UserDetails {

    public User() {}

    public User(String email, String password) {
        this.setEmail(email);
        this.password = password;
    }

    @JsonProperty
    @NotBlank(message = "First name is empty", groups = {UserEditGroup.class, UserRegisterGroup.class})
    private String firstName;

    @JsonProperty
    @NotBlank(message = "Last name is empty", groups = {UserEditGroup.class, UserRegisterGroup.class})
    private String lastName;

    @JsonProperty
    @NotBlank(message = "Email is empty", groups = {UserRegisterGroup.class})
    @Email(message = "Invalid email", groups = {UserRegisterGroup.class})
    private String email;

    @JsonProperty
    @NotBlank(message = "Password is empty", groups = {UserRegisterGroup.class})
    @Size(min=6, message = "Password is too short", groups = {UserRegisterGroup.class})
    private transient String password;

    @JsonProperty
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Date is not in valid form (should be yyyy-MM-dd)",
            groups = {UserEditGroup.class, UserRegisterGroup.class})
    private String dateOfBirth;

    @JsonProperty
    @NotBlank(message = "Gender is empty", groups = {UserEditGroup.class, UserRegisterGroup.class})
    private String gender;

    private ArrayList<String> privileges;

    public int getAge() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(getDateOfBirth(), formatter);
        Period period = Period.between(localDate, LocalDate.now());
        return period.getYears();
    }

    public String getGender() {
        return gender.charAt(0) == 'm' || gender.charAt(0) == 'M' ? "Male" : "Female";
    }

    public void encodePassword(String passwordEncoded) {
        this.password = passwordEncoded;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for(String p: getPrivileges()) {
            authorities.add(new SimpleGrantedAuthority(p));
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }


    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setPrivileges(ArrayList<String> privileges) {
        this.privileges = privileges;
    }

    public ArrayList<String> getPrivileges() {
        return privileges;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

