import {Avatar, Button, makeStyles, useMediaQuery} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';

import InformationRow from "./InformationRow";
import UserContext from "../../contexts/userContext";
import useTheme from "@material-ui/core/styles/useTheme";
import ProfileContext from "../../contexts/profileContext";
import {useFormik} from "formik";
import {editInfoSchema} from "../../utils/validationSchemas";

const useStyles = makeStyles((theme) => ({
  block: {
    width: ({isMobileScreen}) => isMobileScreen ? '90vw' : '40vw',
    maxWidth: ({isMobileScreen}) => isMobileScreen ? '90vw' : '40vw',
    justifyContent: 'center',
    padding: '2%',
    borderRadius: '1%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    '& :last-child': {
      border: '0px solid black',
    },
  },
  avatarBlock: {
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    height: '70px',
    width: '70px',
    borderRadius: '30%',
    border: '2px solid #3a86ff'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  button: {
    fontSize: 10,
    width: '40%',
  },
  marginBottom12: {
    marginBottom: 12,
  }
}));

function ProfileInfo() {
  const [editing, setEditing] = useState(false);
  const {state} = useContext(UserContext);
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles({isMobileScreen});
  const {handleChange, handleBlur, handleSubmit, values, errors, isValid, resetForm} = useFormik({
    initialValues: state,
    initialErrors: Object.fromEntries(Object.entries(state).map(([key]) => [key, ""])),
    validationSchema: editInfoSchema,
    onSubmit: () => console.log("hi")
  });


  const imageURL = "https://miro.medium.com/max/2048/0*0fClPmIScV5pTLoE.jpg";

  return (
      <ProfileContext.Provider value={{editing, handleChange, errors, values}}>
        <form className={classes.block} onChange={handleChange} onSubmit={handleSubmit} onBlur={handleBlur}>
          <div className={classes.avatarBlock}>
            <Avatar alt="profile image" src={imageURL} className={classes.image} />
          </div>
          <div className={`${classes.info} ${classes.marginBottom12}`}>
            <InformationRow label={'First name'} value={state.firstName} name={'firstName'} />
            <InformationRow label={'Last name'} value={state.lastName} name={'lastName'} />
            <InformationRow label={'Email'} value={state.email} name={'email'} />
            <InformationRow label={'Gender'} value={state.gender} name={'gender'} />
            <InformationRow label={'Birth date'} value={state.dateOfBirth} name={'dateOfBirth'}/>
          </div>
          {
            editing ?
                <div className={classes.row}>
                  <Button type={'submit'} disabled={!isValid}
                          variant="outlined" color={'primary'}
                          className={classes.button}>
                    Submit
                  </Button>
                  <Button variant="outlined" color="secondary"
                          onClick={() => setEditing(false)}
                          className={classes.button} onC>
                    Cancel
                  </Button>
                </div>
                :
                <div className={classes.row}>
                  <Button variant="outlined" color={'primary'} onClick={() => {
                    setEditing(!editing);
                    resetForm();
                  }}
                          className={classes.button}>
                    Edit
                    <EditIcon fontSize={"inherit"}/>
                  </Button>
                  <Button variant="outlined" color="secondary" className={classes.button}>
                    Change password
                  </Button>
                </div>
          }

        </form>
      </ProfileContext.Provider>
  );
}

export default ProfileInfo;
