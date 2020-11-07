import {
    AUTH_CLOSE_DIALOG,
    AUTH_OPEN_DIALOG,
    AUTH_SET_LOGIN,
    AUTH_SET_LOGIN_MESSAGE,
    AUTH_SET_REGISTRATION
} from "./authActionTypes";

export const initialAuthState = {
    isOpened: false,
    isRegistration: false,
    loading: false,
    loginMessage: "",
};

function authReducer(state, action) {
    switch (action.type) {
        case AUTH_OPEN_DIALOG:
            return {...state, isOpened: true};
        case AUTH_CLOSE_DIALOG:
            return {...state, isOpened: false, isRegistration: false, loginMessage: ""};
        case AUTH_SET_REGISTRATION:
            return {...state, isRegistration: true};
        case AUTH_SET_LOGIN:
            return {...state, isRegistration: false};
        case AUTH_SET_LOGIN_MESSAGE:
            return {...state, loginMessage: action.payload};
        default:
            return state;
    }
}

export default authReducer;