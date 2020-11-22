import {SEASONAL_RATES_SET_SEASONS, SEASONAL_RATES_SET_WEEKDAYS} from "./seasonalRatesActionTypes";

export const initialSeasonalRatesState = {
    seasons: [],
    weekdays: [],
};

function seasonalRatesReducer(state, action) {
    switch (action.type) {
        case SEASONAL_RATES_SET_SEASONS:
            return {...state, seasons: action.payload}
        case SEASONAL_RATES_SET_WEEKDAYS:
            return {...state, weekdays: action.payload}
        default:
            return state;
    }
}

export default seasonalRatesReducer;