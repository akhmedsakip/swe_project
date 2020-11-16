import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MobileOrderCard from './MobileOrderCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const MobileTable = ({data}) => {
  const classes = useStyles();

  console.log(data);

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {data.map(row => {
        return <ListItem key={row.ID}>
          <MobileOrderCard row={row} />
        </ListItem>
      })}
    </List>
  );
}

export default MobileTable;