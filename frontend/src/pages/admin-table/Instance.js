import AdminTable from "./AdminTable";
import React from "react";
import * as yup from "yup";

const objects = [
    {
        "orderId": 1,
        "hotel": "Rixos Almaty",
        "roomType": "Luxe",
        "checkInDate": "2020-11-12",
        "checkOutDate": "2020-11-21",
        "orderDateTime": "2020-11-22 16:19:12",
        "status": "Reserved",
        "orderPrice": 900
    },
    {
        "orderId": 2,
        "hotel": "Rixos President Astana",
        "roomType": "Standard",
        "checkInDate": "2020-11-20",
        "checkOutDate": "2020-11-28",
        "orderDateTime": "2020-11-22 16:30:48",
        "status": "Reserved",
        "orderPrice": 200
    }
]

const mapping = {
    "orderId": "Order ID",
    "hotel": "Hotel",
    "roomType": "Room Type",
    "checkInDate": "Check In Date",
    "checkOutDate": "Check Out Date",
    "orderDateTime": "Order Date Time",
    "status": "Status",
    "orderPrice": "Order Price"
}

const editableColumns = [
    "hotel", "roomType", "checkInDate", "orderDateTime",
];

const addableColumns = [
    "hotel", "roomType", "checkInDate", "orderDateTime",
];

const mappingInput = {
    "hotel": "text",
    "roomType": "text",
    "checkInDate": "date",
    "orderDateTime": "datetime-local"
}

const schema = yup.object().shape({
    hotel: yup.string().required("hotel is empty"),
    roomType: yup.string().required("hotel is empty"),
});

const AdminTableInstance = () => {
    return <AdminTable editableColumns={editableColumns}
                       showableColumns={Object.keys(objects[0])}
                       mapping={mapping}
                       mappingInput={mappingInput}
                       tableName={'fuck'}
                       onEditSubmit={(values) => console.log('edit', values)}
                       onEditSuccess={() => console.log('success edit')}
                       addableColumns={addableColumns}
                       onAddSubmit={(values) => console.log('add', values)}
                       onAddSuccess={() => console.log('success add')}
                       hasWritePrivilege={true}
                       editValidationSchema={schema}
                       searchableColumns={Object.keys(objects[0])} objects={objects}
                       isAddable={true}
    />
}

export default AdminTableInstance;