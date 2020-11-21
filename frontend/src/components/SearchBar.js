import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';

const SearchBar = ({search, handleChange}) => {

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
      onChange={e => handleChange(e.target.value)}
    />
  )
}

export default SearchBar;