package com.example.sweproj.utils;

import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.ArrayList;
import java.util.List;

@Service
public class ValidationUtil {
    private Validator validator;

    ValidationUtil() {
        this.validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    public <T> List<Message> validate(T validationEntity) {
        List<Message> serverErrors = new ArrayList<>();
        for(ConstraintViolation<T> violation: validator.validate(validationEntity)) {
            serverErrors.add(new FieldValidationMessage(violation.getPropertyPath().toString(), violation.getMessage()));
        }
        return serverErrors;
    }

    public <T> List<Message> validate(T validationEntity, Class validationGroup) {
        List<Message> serverErrors = new ArrayList<>();
        for(ConstraintViolation<T> violation: validator.validate(validationEntity, validationGroup)) {
            serverErrors.add(new FieldValidationMessage(violation.getPropertyPath().toString(), violation.getMessage()));
        }
        return serverErrors;
    }

}
