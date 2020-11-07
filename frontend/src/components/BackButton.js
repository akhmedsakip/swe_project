import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    iconLabel: {
        color: '#808080',
        fontSize: 14,
    }
});

const BackButton = ({onClick}) => {
    const classes = useStyles();
    return <div className={classes.root} onClick={onClick}>
        <Icon component={ArrowBackIosIcon} className={classes.iconLabel} />
        <Typography className={classes.iconLabel}>
           Назад
        </Typography>
    </div>
};

BackButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default BackButton;