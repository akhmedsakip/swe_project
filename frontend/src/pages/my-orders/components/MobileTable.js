import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MobileOrderCard from './MobileOrderCard';
import { Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '5px',
    margin: '0 15px',
    fontFamily: 'Staatliches'
  }
}));

const MobileTable = ({ data }) => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <div className={classes.title}>
        <Typography className={classes.title} variant="h5">
          My Orders
        </Typography>
      </div>

      {data.map(row => {
        return <ListItem key={row.ID}>
          <MobileOrderCard row={row} />
        </ListItem>
      })}
    </List>
  );
}

export default MobileTable;