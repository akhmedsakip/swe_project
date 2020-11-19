import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import logo from './amita.png'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    title: {
      flex: '1 1 100%',
      fontFamily: 'Staatliches'
    }
  });

const HotelHeader = ({ data }) => {
    const classes = useStyles();

    return (
        <div >
              <img src={logo} style={{width: '20%'}}/>
        </div>
    );
}

export default HotelHeader; 