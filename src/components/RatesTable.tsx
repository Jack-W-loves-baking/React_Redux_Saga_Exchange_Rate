import { createStyles, Theme, withStyles, makeStyles } from "@material-ui/core/styles";
import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { useSelector } from "react-redux";

import { ratesTable } from "../utils/types";

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const useStyles = makeStyles({
    table: {
        width: '70vw',
        tableLayout: 'fixed'
    },
});


const MyTable = ({ columnId, createBody } : ratesTable) => {
    const classes = useStyles();

    const columns = useSelector((state:any) => state.tableColumn[columnId]);

    return (
        <TableContainer>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">{columns.title}</StyledTableCell>
                        <StyledTableCell align="left">{columns.field}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {createBody}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MyTable;