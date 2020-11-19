import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {useContext} from "react";
import SeasonalRatesContext from "../../../contexts/SeasonalRatesContext";

const SeasonalRatesRow = ({ row }) => {

    const {setDeletion} = useContext(SeasonalRatesContext);

    return <TableRow>
        {Object.keys(row).map((cell)=>
            <TableCell align="center">{row[cell]}</TableCell>
        )}
        <TableCell align="center">
            <IconButton onClick={() => setDeletion(true)}>
                <DeleteIcon />
            </IconButton>
        </TableCell>
    </TableRow>
}

export default SeasonalRatesRow;
