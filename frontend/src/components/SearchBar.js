import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

const SearchBar = ({search, setSearch}) => {

  return (
    <TextField
      id="outlined-search"
      placeholder="Search"
      type="search"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  )
}

export default SearchBar;