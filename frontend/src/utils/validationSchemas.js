import * as yup from "yup";
const today = new Date();
const minDate = new Date(1900, 1);

export const registrationSchema = yup.object().shape({
    firstName: yup.string().required("First name is empty"),
    lastName: yup.string().required("Second name is empty"),
    email: yup.string().required("Email is empty").email("Email is invalid"),
    password: yup.string().required("Password is empty").min(6, "Minimum length of password is 6"),
    passwordConfirm: yup.string().required("Please, confirm your password").oneOf([yup.ref('password'), null], "The passwords don't match"),
    dateOfBirth: yup.date("Date of birth is invalid").max(today, 'Birth Date cannot be later than today').min(minDate, 'Birth Date cannot be earlier than 1900').required("Date of birth is empty"),
    gender: yup.string().required("Gender is empty"),
});

export const loginSchema = yup.object().shape({
    email: yup.string().required("Email is empty").email("Email is invalid"),
    password: yup.string().required("Password is empty").min(6, "Minimum length of password is 6")
});

export const searchSchema = yup.object().shape({
    numberOfPeople: yup.number().test('Number of people should be more than 0','Number of people should be more than 0',(val)=>{
        return val > 0;
    }).required("Number of people is empty"),
    checkInDate: yup.date("From date is invalid").test('From date cannot be earlier than today', 'From date cannot be earlier than today', (val)=>{
        return new Date(val) >= new Date().setHours(0,0,0,0);
    }).required("From date is empty"),
    checkOutDate: yup.date("To date is invalid").when(
        'checkInDate',
        (checkInDate, schema) => (checkInDate && schema.min(nextDay(checkInDate), 'To date cannot be earlier than From date'))
    )
    .required("To date is empty"),
    city: yup.string().required("City is empty"),
});

const nextDay = (date) => {
    const dateObject = new Date(date);
    dateObject.setDate(dateObject.getDate() + 2);
    return dateObject.toISOString().split("T")[0];
}

export const editInfoSchema = yup.object().shape({
    firstName: yup.string().required("First name is empty"),
    lastName: yup.string().required("Second name is empty"),
    email: yup.string().required("Email is empty").email("Email is invalid"),
    dateOfBirth: yup.date("Date of birth is invalid").max(new Date()).required("Date of birth is empty"),
    gender: yup.string().required("Gender is empty"),
});



export const changePasswordSchema = yup.object().shape({
    oldPassword: yup.string().required("Password is empty").min(6, "Minimum length of password is 6"),
    newPassword: yup.string().required("Password is empty").min(6, "Minimum length of password is 6"),
    newPasswordConfirm: yup.string().required("Please, confirm your password").oneOf([yup.ref('newPassword'), null], "The passwords don't match"),
});
const phoneRegExp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{7})$/
// Taken from https://www.regextester.com/94816


export const editReservationFormSchema = yup.object().shape({
    firstName: yup.string().required("First name is empty").nullable(),
    lastName: yup.string().required("Second name is empty"),
    phoneNumber: yup.string().required("Phone number is empty").matches(phoneRegExp, "Invalid phone"),
});


const salaryRegExp = /^[0-9]*$/

export const editEmployeeFormSchema = yup.object().shape({
    From: yup.string().required("From time is empty"),
    To: yup.string().required("To time is empty"),
    Salary: yup.string().required("Salary is empty").matches(salaryRegExp, "Salary should contain only numbers"),
});

const CoeffRegExp = /^[0-9]*([,.][0-9]*)?$/
export const editSeasonFormSchema = yup.object().shape({
    Coeff: yup.string().required("Coefficient is empty").matches(CoeffRegExp, "Invalid Coefficient"),
});

export const reservationSchema = yup.object().shape({
    phoneNumber: yup.string().required("Phone number is empty").matches(phoneRegExp, "Invalid phone"),
    firstName: yup.string().required("First name is empty"),
    lastName: yup.string().required("Second name is empty"),
    gender: yup.string().required("Gender is empty"),
});

export const allReservationSchema = yup.object().shape({
    email: yup.string().required("Email is empty").email("Email is invalid"),
    phoneNumber: yup.string().required("Phone number is empty").matches(phoneRegExp, "Invalid phone"),
    firstName: yup.string().required("First name is empty"),
    lastName: yup.string().required("Second name is empty"),
    gender: yup.string().required("Gender is empty"),
    roomType: yup.string().required("Room type is empty"),
    checkInDate: yup.date().required("Check in date is empty"),
    checkOutDate: yup.date().required("Check out date is empty"),
})

export const seasonValidationSchema = yup.object().shape({
    name: yup.string().required("Season name is empty"),
    startDate: yup.string().required("Season start date is empty"),
    endDate: yup.string().required("Season end date is empty"),
    advisory: yup.string().required("Advisory is empty")
});

export const weekdayValidationSchema = yup.object().shape({
    coefficient: yup.string().required("Coefficient is empty").test('coeff', 'Coefficient is invalid', (val) => {
        if(isNaN(parseInt(val))) {
            return false
        }
        return val >= 0.01 && val <= 3;
    })
});