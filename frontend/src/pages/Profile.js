import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import EditIcon from '@material-ui/icons/Edit';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
    background: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`
  },
  body: {
    padding: '2%',
    width: '70vh',
    borderRadius: '1%',
    backgroundColor: 'white'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  block1: {
    justifyContent: 'center',
  },
  avatarBlock: {
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    height: '10vh',
    width: '10vh',
    borderRadius: '30%',
    border: '2px solid #3a86ff'
  },
  bodyBottom: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#3a86ff',
    alignItems: 'center',
  },
  tableCell: {
    fontSize: '2vh'
  }
}));

function Profile() {
  const classes = useStyles();

  const PersonalInfo = {
    FirstName: 'Islam',
    SecondName: 'Orazbek',
    BirthDate: "09-10-1999",
    Email: "islam.orazbek@nu.edu.kz",
    PhoneNumber: "+7 747 887 5104",
    CountryCode: 'KZ-01',
    Address: "Abay 83, Almaty city, Kazakhstan"
  }

  const imageURL = "https://miro.medium.com/max/2048/0*0fClPmIScV5pTLoE.jpg"

  return (
    <div className={classes.root}>
      <div className={classes.body}>

        <div className={classes.block1}>
          <div className={classes.avatarBlock}>
            <Avatar alt="profile image" src={imageURL} className={classes.image} />
          </div>
          <div className={classes.avatarBlock}>
            <Typography style={{ fontSize: '24px' }}>{PersonalInfo.FirstName} {PersonalInfo.SecondName}</Typography>
          </div>

          <TableContainer>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow >
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    Email
                    </TableCell>
                  <TableCell align="right" className={classes.tableCell}>{PersonalInfo.Email}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    Birth Date
                    </TableCell>
                  <TableCell align="right" className={classes.tableCell}>{PersonalInfo.BirthDate}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    Phone Number:
                    </TableCell>
                  <TableCell align="right" className={classes.tableCell}>{PersonalInfo.PhoneNumber}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    Country Code:
                    </TableCell>
                  <TableCell align="right" className={classes.tableCell}>{PersonalInfo.CountryCode}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    Address:
                    </TableCell>
                  <TableCell align="right" className={classes.tableCell}>{PersonalInfo.Address}</TableCell>
                </TableRow>
              </TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Button fullWidth variant="outlined" style={{ fontSize: '2vh', color: '#3a86ff' }}>
                    Edit
                    <EditIcon style={{ fontSize: '3vh' }} />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="secondary" style={{ fontSize: '2vh' }}>
                    Change password
                  </Button>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </div>

        <div className={classes.bodyBottom}>
          <Typography style={{ color: 'white' }}>Join us on</Typography>
          <Button>
            <FacebookIcon style={{ color: 'white', fontSize: '3vh' }} onClick={() => alert('Facebook')} />
          </Button>
          <Button>
            <InstagramIcon style={{ color: 'white', fontSize: '3vh' }} onClick={() => alert('Instagram')} />
          </Button>
          <Button>
            <TwitterIcon style={{ color: 'white', fontSize: '3vh' }} onClick={() => alert('Twitter')} />
          </Button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
