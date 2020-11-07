import {USER_LOG_IN, USER_SIGN_OUT} from "./userActionsTypes";

function userReducer(state, action) {
    switch (action.type) {
        case USER_LOG_IN:
            return {...action.payload, loggedIn: true};
        case USER_SIGN_OUT:
            return {loggedIn: false};
        default:
            return {loggedIn: false};
    }
}

export default userReducer;