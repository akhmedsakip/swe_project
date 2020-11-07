import {USER_LOG_IN, USER_SIGN_OUT} from "./userActionsTypes";

export const initialUserState = {
    loggedIn: false,
    userInfo: null,
};

function userReducer(state, action) {
    switch (action.type) {
        case USER_LOG_IN:
            return {...state, userInfo: action.payload, loggedIn: true};
        case USER_SIGN_OUT:
            return {userInfo: null, loggedIn: false};
        default:
            return state;
    }
}

export default userReducer;