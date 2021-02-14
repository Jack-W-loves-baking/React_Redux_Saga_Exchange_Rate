// @ts-nocheck
import {createStyles, Theme, withStyles, makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {useSelector} from "react-redux";
import getSymbolFromCurrency from "currency-symbol-map";
import {convertToTwoDecimals} from "../utils/stringUtils";

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

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const useStyles = makeStyles({
    table: {
        width: '70vw',
        tableLayout: 'fixed'
    },
});


// @ts-ignore
const MyTable = (props) => {

    const classes = useStyles();

    let tableBody = [];

    const tableData = useSelector(state => state.tableData);
    const columns = useSelector(state => state.tableColumn[props.columnId]);
    const currenciesInShortName = useSelector(state => state.displayedCurrencies);

    const createTableBody = () =>{
        for (const [key, value] of Object.entries(tableData)) {
            if (currenciesInShortName.includes(key)) {
                tableBody.push(
                    <StyledTableRow key={`${key}`}>
                        <StyledTableCell align="left">{`${key}`}</StyledTableCell>
                        <StyledTableCell
                            align="left">{getSymbolFromCurrency(key) + convertToTwoDecimals(value)}</StyledTableCell>
                    </StyledTableRow>
                )
            }
        }
        return tableBody;
    }

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
                    {createTableBody}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MyTable;