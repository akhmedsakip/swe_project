import React, {useContext, useState} from "react";
import AdminTableContext from "../../../../contexts/AdminTableContext";
import DynamicForm from "../dynamic-form/DynamicForm";

const AddDialogForm = () => {
    const {addableColumns, onAddSubmit, onAddSuccess, addValidationSchema} = useContext(AdminTableContext);
    const initialValues = Object.fromEntries(addableColumns.map((column) => [column, '']));
   return <DynamicForm initialValues={initialValues} initialErrors={initialValues}
                       onSubmitAction={onAddSubmit}
                       validationSchema={addValidationSchema}
                       columns={addableColumns}
                       onSuccess={onAddSuccess} />
}

export default AddDialogForm;