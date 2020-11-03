import React, {useReducer} from 'react';
import UserContext from "../contexts/userContext";

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return {...action.payload, loggedIn: true};
        case 'signOut':
            localStorage.clear();
            return {loggedIn: false};
        default:
            return state;
    }
}


const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {loggedIn: localStorage.getItem("email") !== null}, undefined);
    return <UserContext.Provider value={{state, dispatch}}>
        {children}
    </UserContext.Provider>
};

export default UserContextProvider;