import React, {useContext} from "react";
import AdminTableContext from "../../../../contexts/AdminTableContext";
import DynamicForm from "../dynamic-form/DynamicForm";

const EditDialogForm = () => {
    const {editableColumns, editRow, onEditSubmit, onEditSuccess, editValidationSchema} = useContext(AdminTableContext);
    const initialValues = editRow ? Object.fromEntries(Object.entries(editRow)
        .filter(([prop]) => editableColumns.includes(prop))) : {};
    const initialErrors = Object.fromEntries(Object.entries(initialValues).map(([prop]) => [prop, '']));

    return <DynamicForm onSubmitAction={onEditSubmit}
                 onSuccess={onEditSuccess} columns={editableColumns}
                 initialValues={initialValues} initialErrors={initialErrors} validationSchema={editValidationSchema} />

}

export default EditDialogForm;