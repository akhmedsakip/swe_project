import React from 'react';
import TextFieldWithError from "../shared/TextFieldWithError";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types'
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    marginTop10: {
        marginTop: 10,
    }
});

const EditForm = ({closeDialog, labels}) => {

    const classes = useStyles();
    return <form>
        {labels.map((label)=>
         <TextFieldWithError
        label={label}
        name={label.trim()}
        fullWidth
        />
    )}
        <Button color="primary" type={'submit'}
                        variant={'outlined'} className={classes.marginTop10}>
            Submit
        </Button>
    </form>
};

EditForm.propTypes = {
    closeDialog: PropTypes.func.isRequired,
};

export default EditForm;