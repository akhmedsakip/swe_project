import {ADMIN_LOG_IN, USER_LOG_IN, USER_SET_LOADING, USER_SIGN_OUT, USER_UNSET_LOADING} from "./userActionsTypes";

export const initialUserState = {
    loggedIn: false,
    userInfo: null,
    loading: false,
    isAdmin: false,
};

function userReducer(state, action) {
    switch (action.type) {
        case USER_LOG_IN:
            return {...state, userInfo: action.payload, loggedIn: true, isAdmin: false};
        case USER_SIGN_OUT:
            return {...state, userInfo: null, loggedIn: false, isAdmin: false};
        case USER_SET_LOADING:
            return {...state, loading: true};
        case USER_UNSET_LOADING:
            return {...state, loading: false};
        case ADMIN_LOG_IN:
            return {...state, userInfo: action.payload, loggedIn: true, isAdmin: true};
        default:
            return state;
    }
}

export default userReducer;