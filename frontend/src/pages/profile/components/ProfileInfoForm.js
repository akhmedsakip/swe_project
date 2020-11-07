import {Avatar, Button, makeStyles, useMediaQuery} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';
import useTheme from "@material-ui/core/styles/useTheme";
import ProfileContext from "../../../contexts/ProfileContext";
import {useFormik} from "formik";
import {editInfoSchema} from "../../../utils/validationSchemas";
import editProfileAction from "../../../actions/userContextActions/editProfileAction";
import FormHelperText from "@material-ui/core/FormHelperText";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ProfileInfoInputs from "./ProfileInfoInputs";
import ProfileInfoButtons from "./ProfileInfoButtons";
import AppContext from "../../../store/AppContext";

function ProfileInfoForm() {
  const [editing, setEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const {state, dispatch} = useContext(AppContext);
  const {userInfo} = state.user;

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles({isMobileScreen});
  const formik = useFormik({
    initialValues: userInfo,
    initialErrors: Object.fromEntries(Object.entries(userInfo).map(([key]) => [key, ""])),
    validationSchema: editInfoSchema,
    enableReinitialize: true,
    onSubmit: async () => {
      const errors = await editProfileAction(values, dispatch);
      if(errors && errors.length) {
        setSuccess(false);
        setErrorMessage(errors[0].message);
      } else {
        setSuccess(true);
        setEditing(false);
      }
    }
  });
  const {handleSubmit, values} = formik;
  const imageURL = "https://miro.medium.com/max/2048/0*0fClPmIScV5pTLoE.jpg";

  return (
      <ProfileContext.Provider value={{editing, setEditing, setChangePassword, formik}}>
        <form className={classes.block} onSubmit={handleSubmit}>
          <div className={`${classes.centerBlock} ${classes.marginBottom12}`}>
            <Avatar alt="profile image" src={imageURL} className={classes.image} />
          </div>
          <div className={classes.centerBlock}>
            {success ?
              <FormHelperText className={classes.message}>
                Successfully edited
              </FormHelperText> :
              <FormHelperText error>
                {errorMessage}
              </FormHelperText>
            }
          </div>
          <ProfileInfoInputs />
          <ProfileInfoButtons />
        </form>
        <ChangePasswordDialog onClose={() => setChangePassword(false)} open={changePassword}/>
      </ProfileContext.Provider>
  );
}
export default ProfileInfoForm;


const useStyles = makeStyles((theme) => ({
  block: {
    width: ({isMobileScreen}) => isMobileScreen ? '90vw' : '40vw',
    maxWidth: ({isMobileScreen}) => isMobileScreen ? '90vw' : '40vw',
    minWidth: ({isMobileScreen}) => isMobileScreen ? '90vw' : 400,
    padding: '32px 16px',
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
  },
  message: {
    color: 'green',
  },
  centerBlock: {
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    height: ({isMobileScreen}) => isMobileScreen ? 120 : 90,
    width: ({isMobileScreen}) => isMobileScreen ? 120 : 90,
    borderRadius: '50%',
  },
  marginBottom12: {
    marginBottom: 12,
  }
}));

