import React from 'react';
import SvgIcon from "@material-ui/core/SvgIcon";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        height: ({height}) => height
    }
});

const Spinner = ({size = 'medium', className}) => {
    let height = 30;
    if(size === 'small') {
        height = 20
    }
    if(size === 'big') {
        height = 80;
    }
    const classes = useStyles({height});
    return <img src={'/assets/icons/spinner.svg'} alt={'spinner'}
                className={`${classes.root} ${className}`}/>
};

export default Spinner