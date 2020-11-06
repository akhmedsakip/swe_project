import React, {useReducer} from "react";
import AvailabilityContext from "../contexts/availabilityContext";

function reducer(state, action) {
    switch (action.type) {
        case 'setHotels':
            return {...state, hotels: action.payload};
        case 'setRoomTypes':
            return {...state, roomTypes: action.payload};
        case 'setParams':
            return {...state, params: action.payload};
        case 'setRoomType':
            return {...state, roomType: action.payload};
        case 'deselectRoomType': {
            delete state.roomType;
            return state;
        }
        default:
            return {};
    }
}

//hotels:[], hotelId, roomTypes

const AvailabilityContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {}, undefined);
    return <AvailabilityContext.Provider value={{state, dispatch}}>
        {children}
    </AvailabilityContext.Provider>
};

export default AvailabilityContextProvider;