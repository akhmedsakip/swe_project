import { makeStyles, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import SearchBar from '../SearchBar';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    flex: '1 1 100%',
    fontFamily: 'Staatliches',
  },
  rowName: {
    fontWeight: 700,
  },
  topBar: {
    borderBottom: '1px solid black'
  }
});

const withTableContent = (TableComponent, tableName, columnNames) => {

  const NewTableComponent = () => {

    const classes = useStyles();

    const [search, setSearch] = useState('');

    return (
      <TableContainer component={Paper} variant="outlined" className={classes.table}>
        <Toolbar className={classes.topBar}>
          <Typography variant="h5" id="tableTitle" component="div" className={classes.title}>
            {tableName}
          </Typography>
          
          <SearchBar search={search} setSearch={setSearch} />

        </Toolbar>

        <Table>
          <TableHead>
            <TableRow>
              {columnNames.map((column) => {
                return <TableCell align="center" key={column} className={classes.rowName}>{column}</TableCell>
              })}
            </TableRow>
          </TableHead>

          {/* This is prop component */}
          <TableComponent searchTerm={search} />

        </Table>
      </TableContainer>
    )
  }
  return NewTableComponent
}

export default withTableContent;