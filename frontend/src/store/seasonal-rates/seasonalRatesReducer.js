import {SEASONAL_RATES_SET_SEASONS} from "./seasonalRatesActionTypes";

export const initialSeasonalRatesState = {
    seasons: [],
};

function seasonalRatesReducer(state, action) {
    switch (action.type) {
        case SEASONAL_RATES_SET_SEASONS:
            return {...state, seasons: action.payload}
        default:
            return state;
    }
}

export default seasonalRatesReducer;