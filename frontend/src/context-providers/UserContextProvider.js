import React, {useReducer} from 'react';
import UserContext from "../contexts/userContext";

function reducer(state, action) {
    switch (action.type) {
        case 'setUser':
            return {...action.payload, loggedIn: true};
        case 'signOut':
            return {loggedIn: false, changedPassword: state.changedPassword};
        case 'changedPassword':
            return {loggedIn: false, changedPassword: true};
        default:
            return {loggedIn: false};
    }
}


const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {loggedIn: false}, undefined);
    return <UserContext.Provider value={{state, dispatch}}>
        {children}
    </UserContext.Provider>
};

export default UserContextProvider;