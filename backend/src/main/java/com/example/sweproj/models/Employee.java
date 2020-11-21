package com.example.sweproj.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Employee {
    @JsonProperty
    private int employeeId;

    @JsonProperty
    private Person person;

    @JsonProperty
    private String userEmail;

    @JsonProperty
    private String identificationTypeName;

    @JsonProperty
    private String identificationId;

    @JsonProperty
    private String employmentDate;

    @JsonProperty
    private String dismissalDate;

    @JsonProperty
    private String position;

    @JsonProperty
    private int baseSalaryPerHour;

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getIdentificationTypeName() {
        return identificationTypeName;
    }

    public void setIdentificationTypeName(String identificationTypeName) {
        this.identificationTypeName = identificationTypeName;
    }

    public String getIdentificationId() {
        return identificationId;
    }

    public void setIdentificationId(String identificationId) {
        this.identificationId = identificationId;
    }

    public String getEmploymentDate() {
        return employmentDate;
    }

    public void setEmploymentDate(String employmentDate) {
        this.employmentDate = employmentDate;
    }

    public String getDismissalDate() {
        return dismissalDate;
    }

    public void setDismissalDate(String dismissalDate) {
        this.dismissalDate = dismissalDate;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public int getBaseSalaryPerHour() {
        return baseSalaryPerHour;
    }

    public void setBaseSalaryPerHour(int baseSalaryPerHour) {
        this.baseSalaryPerHour = baseSalaryPerHour;
    }
}
