import {
    makeStyles,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from "@material-ui/core";
import React, {useContext, useEffect, useState} from "react";
import SearchToolbar from "./components/SearchToolbar";
import PropTypes from 'prop-types';
import AdminTableContext from "../../contexts/AdminTableContext";
import Box from "@material-ui/core/Box";
import AdminTableColumns from "./components/table/AdminTableColumns";
import AdminTableRows from "./components/table/AdminTableRows";
import EditDialog from "./components/edit-dialog/EditDialog";
import Button from "@material-ui/core/Button";
import AddDialog from "./components/add-dialog/AddDialog";
import DeleteDialog from "./components/delete-dialog/DeleteDialog";
import Spinner from "../../components/Spinner";
import AppContext from "../../store/AppContext";

const AdminTable = (props) => {
    const {objects, tableName, hasWritePrivilege, isAddable, isDeletable, showableColumns} = props
    const classes = useStyles();
    const {state} = useContext(AppContext);
    const {searchColumn, searchValue, loading} = state.adminTable;
    const [rows, setRows] = useState([]);

    const [editRow, setEditRow] = useState(null);
    const [deleteRow, setDeleteRow] = useState(null);
    const [isAddingRow, setIsAddingRow] = useState(false);

    const colSpan = hasWritePrivilege ? showableColumns.length + 1 : showableColumns.length;

    useEffect(() => {
        const newRows = objects.filter((object) => {
            if(!searchValue) {
                return true;
            }
            if(searchColumn === 'all')  {
                return Object.values(object).reduce(((accum, curr) => curr.toString().includes(searchValue) || accum), false);
            }
            return object[searchColumn].toString().includes(searchValue)
        });
        setRows(newRows);
    }, [searchColumn, searchValue, objects]);

    return (
        <AdminTableContext.Provider value={{
            rows,
            editRow, setEditRow,
            deleteRow, setDeleteRow,
            isAddingRow, setIsAddingRow,
            ...props}}>
            <TableContainer component={Paper} variant="outlined" className={classes.tableContainer}>
                <Toolbar className={classes.topBar}>
                    <Typography variant="h5" id="tableTitle" component="div" className={classes.title}>
                        {tableName}
                    </Typography>
                    <Box display={'flex'}>
                        <SearchToolbar />
                        {
                            hasWritePrivilege && isAddable ? <Box ml={'10px'}>
                                <Button variant={'outlined'} onClick={() => setIsAddingRow(true)}>
                                    Add new row
                                </Button>
                            </Box> : null
                        }

                    </Box>
                </Toolbar>
                <Box className={classes.tableWrapper}>
                    <Table>
                        <TableHead>
                            <AdminTableColumns />
                            {
                                loading ? <TableRow>
                                    <TableCell align={'center'} colSpan={colSpan}>
                                        <Spinner size={'big'} />
                                    </TableCell>
                                </TableRow> : null
                            }
                            {
                                !loading && objects.length ?
                                    <AdminTableRows /> : <TableRow>
                                        <TableCell align={'center'} colSpan={colSpan}>
                                            Table is empty
                                        </TableCell>
                                    </TableRow>
                            }
                        </TableHead>
                    </Table>
                </Box>

            </TableContainer>
        <EditDialog />
        {isAddable ? <AddDialog /> : null}
        {isDeletable ? <DeleteDialog /> : null}
        </AdminTableContext.Provider>
    )
}

export default AdminTable;

AdminTable.propTypes = {
    objects: PropTypes.arrayOf(PropTypes.any).isRequired,
    addableColumns: PropTypes.arrayOf(PropTypes.string),
    showableColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    searchableColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    editableColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    mapping: PropTypes.object.isRequired,
    mappingInput: PropTypes.object.isRequired,
    onEditSubmit: PropTypes.func.isRequired,
    onEditSuccess: PropTypes.func.isRequired,
    isDeletable: PropTypes.bool.isRequired,
    onDelete: PropTypes.func,
    onDeleteSuccess: PropTypes.func,
    onRowClick: PropTypes.func,
    onAddSubmit: PropTypes.func,
    onAddSuccess: PropTypes.func,
    isAddable: PropTypes.bool.isRequired,
    hasWritePrivilege: PropTypes.bool.isRequired,
    editValidationSchema: PropTypes.object.isRequired,
    addValidationSchema: PropTypes.object,
    tableName: PropTypes.string.isRequired,
}

const useStyles = makeStyles({
    tableContainer: {
        minWidth: 650,
        overflowX: 'hidden'
    },
    title: {
        fontFamily: 'Staatliches',
    },
    tableWrapper: {
        overflowX: 'scroll',
    },
    topBar: {
        background: 'white',
        justifyContent: 'space-between',
        borderBottom: '1px solid black'
    },
    searchBar: {
        width: 100,
    }
});