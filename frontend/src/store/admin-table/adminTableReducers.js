import {
    ADMIN_TABLE_SET_LOADING,
    ADMIN_TABLE_SET_SEARCH_COLUMN, ADMIN_TABLE_SET_SEARCH_VALUE,
    ADMIN_TABLE_UNSET_LOADING
} from "./adminTableActionTypes";

export const initialAdminTableState = {
    loading: false,
    searchColumn: 'all',
    searchValue: '',
};

export default function adminTableReducer(state, action) {
    switch (action.type) {
        case ADMIN_TABLE_SET_LOADING:
            return {...state, loading: true};
        case ADMIN_TABLE_UNSET_LOADING:
            return {...state, loading: false};
        case ADMIN_TABLE_SET_SEARCH_COLUMN:
            return {...state, searchColumn: action.payload};
        case ADMIN_TABLE_SET_SEARCH_VALUE:
            return {...state, searchValue: action.payload};
        default:
            return state;
    }
}