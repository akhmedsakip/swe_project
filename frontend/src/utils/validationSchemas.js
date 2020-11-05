import * as yup from "yup";

export const registrationSchema = yup.object().shape({
    firstName: yup.string().required("First name is empty"),
    lastName: yup.string().required("Second name is empty"),
    email: yup.string().required("Email is empty").email("Email is invalid"),
    password: yup.string().required("Password is empty").min(6, "Minimum length of password is 6"),
    passwordConfirm: yup.string().required("Please, confirm your password").oneOf([yup.ref('password'), null], "The passwords don't match"),
    dateOfBirth: yup.date("Date of birth is invalid").required("Date of birth is empty"),
    gender: yup.string().required("Gender is empty"),
});

export const loginSchema = yup.object().shape({
    email: yup.string().required("Email is empty").email("Email is invalid"),
    password: yup.string().required("Password is empty").min(6, "Minimum length of password is 6")
});

export const searchSchema = yup.object().shape({
    numPeople: yup.number().required("Number of people is empty"),
    fromDate: yup.date("From date is invalid").required("From date is empty"),
    toDate: yup.date("To date is invalid").when(
        'fromDate',
        (fromDate, schema) => (fromDate && schema.min(fromDate)),
    ).required("To date is empty"),
    city: yup.string().required("City is empty"),
});
export const editInfoSchema = yup.object().shape({
    firstName: yup.string().required("First name is empty"),
    lastName: yup.string().required("Second name is empty"),
    email: yup.string().required("Email is empty").email("Email is invalid"),
    dateOfBirth: yup.date("Date of birth is invalid").required("Date of birth is empty"),
    gender: yup.string().required("Gender is empty"),
});

export const changePasswordSchema = yup.object().shape({
    oldPassword: yup.string().required("Password is empty").min(6, "Minimum length of password is 6"),
    newPassword: yup.string().required("Password is empty").min(6, "Minimum length of password is 6"),
    newPasswordConfirm: yup.string().required("Please, confirm your password").oneOf([yup.ref('newPassword'), null], "The passwords don't match"),
});