import React from 'react';
import PropTypes from 'prop-types'
import withDeleteDialog from "./hocs/withDeleteDialog";

const DeleteDialog = ({ onClose, open, questionText }) => {
    return null;
};

DeleteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default withDeleteDialog(DeleteDialog);