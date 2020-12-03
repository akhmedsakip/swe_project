import {
    INTERACTIVE_TABLE_SET_LOADING,
    INTERACTIVE_TABLE_SET_SEARCH_COLUMN, INTERACTIVE_TABLE_SET_SEARCH_VALUE, INTERACTIVE_TABLE_SET_CURRENT_TABLE,
    INTERACTIVE_TABLE_UNSET_LOADING
} from "./interactiveTableActionTypes";

export const initialInteractiveTableState = {
    loading: false,
    searchColumn: 'all',
    searchValue: '',
    currentTable: null,
};

export default function interactiveTableReducer(state, action) {
    switch (action.type) {
        case INTERACTIVE_TABLE_SET_LOADING:
            return {...state, loading: true};
        case INTERACTIVE_TABLE_UNSET_LOADING:
            return {...state, loading: false};
        case INTERACTIVE_TABLE_SET_SEARCH_COLUMN:
            return {...state, searchColumn: action.payload};
        case INTERACTIVE_TABLE_SET_SEARCH_VALUE:
            return {...state, searchValue: action.payload};
        // case INTERACTIVE_TABLE_SET_CURRENT_TABLE:
        //     return {...state, currentTable: action.payload};
        default:
            return state;
    }
}