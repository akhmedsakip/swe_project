import Box from "@material-ui/core/Box";
import React from "react";
import {makeStyles} from "@material-ui/core";
import AdminTable from "../admin-table/AdminTable";
import {seasonValidationSchema} from "../../utils/validationSchemas";

const objects = [
    {
        seasonId: 1,
        name: 'Winter',
        startDate: '2020-01-01',
        endDate: '2020-02-02',
        advisory: 'Text text text text text text text text text text text text text' +
            ' text text text text text text text text text text text text text text ' +
            'text text text text text text text text text text text text text text'
    },
    {
        seasonId: 2,
        name: 'Winter',
        startDate: '2020-03-03',
        endDate: '2020-04-04',
        advisory: 'Text text text text text text text text text text text text text' +
            ' text text text text text text text text text text text text text text ' +
            'text text text text text text text text text text text text text text'
    }
]

const showableColumns = ['seasonId', 'name', 'startDate', 'endDate', 'advisory'];
const editableColumns = ['name', 'startDate', 'endDate', 'advisory'];
const mapping = {
    'name': 'Name',
    'startDate': 'Start Date',
    'endDate': 'End Date',
    'advisory': 'Advisory'
}

const mappingInputs = {
    'name': 'text',
    'startDate': 'date',
    'endDate': 'date',
    'advisory': 'multiline'
}

const SeasonalRates = () => {
    const classes = useStyles();
    return <Box className={classes.root} display={'flex'} flexDirection={'column'} alignItems='center'>
        <AdminTable objects={objects}
                    showableColumns={showableColumns} searchableColumns={showableColumns}
                    editableColumns={editableColumns} addableColumns={showableColumns}
                    mapping={mapping}
                    mappingInput={mappingInputs}
                    onEditSubmit={(values) => console.log('edit', values)}
                    onEditSuccess={() => console.log('hi edit')}
                    isDeletable={true}
                    onDelete={(values) => console.log('delete', values)}
                    onDeleteSuccess={() => console.log('hi delete')}
                    isAddable={true} hasWritePrivilege={true}
                    onAddSubmit={(values) => console.log('add', values)}
                    onAddSuccess={() => console.log('hi add')}
                    onRowClick={() => console.log('row clicked')}
                    editValidationSchema={seasonValidationSchema}
                    addValidationSchema={seasonValidationSchema}
                    tableName={'Seasonal rates'} />
    </Box>
}

export default SeasonalRates;

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        padding: 16,
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`
    },
});