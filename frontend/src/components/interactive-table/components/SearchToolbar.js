import Box from "@material-ui/core/Box";
import React, {useContext} from "react";
import Select from "@material-ui/core/Select";
import SearchBar from "../../SearchBar";
import {InputAdornment, TextField, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AdminTableContext from "../../../contexts/AdminTableContext";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import AppContext from "../../../store/AppContext";
import {
    INTERACTIVE_TABLE_SET_SEARCH_COLUMN,
    INTERACTIVE_TABLE_SET_SEARCH_VALUE
} from "../../../store/interactive-table/interactiveTableActionTypes";

const SearchToolbar = () => {
    const classes = useStyles();
    const {searchableColumns, mapping} = useContext(AdminTableContext);
    const {state, dispatch} = useContext(AppContext);
    const {searchValue, searchColumn} = state.adminTable;
    return <Box display={'flex'} alignItems={'center'}>
        <Box mr={'10px'}>
            <Typography>
                Search by:
            </Typography>
        </Box>
        <Box mr={'10px'} className={classes.columnSelect}>
            <Select value={searchColumn} fullWidth onChange={e => dispatch({type: INTERACTIVE_TABLE_SET_SEARCH_COLUMN ,payload: e.target.value})}>
                <MenuItem value="all">All</MenuItem>
                {searchableColumns.map((searchableColumn) =>
                    <MenuItem key={searchableColumn}
                            value={searchableColumn}>{mapping[searchableColumn]}</MenuItem>)}
            </Select>
        </Box>
        <Box>
            <TextField
                id="outlined-search"
                placeholder="Search"
                type="search"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                value={searchValue}
                onChange={e => dispatch({type: INTERACTIVE_TABLE_SET_SEARCH_VALUE ,payload: e.target.value})}
            />
        </Box>
    </Box>
}

const useStyles = makeStyles(() => ({
    columnSelect: {
        minWidth: 100
    }
}));


export default SearchToolbar;