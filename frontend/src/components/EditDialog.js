import React from 'react';
import PropTypes from 'prop-types'
import withEditDialog from "./hocs/withEditDialog";

const EditDialog = ({ onClose, open, name, labels }) => {
    return null;
};

EditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default withEditDialog(EditDialog);