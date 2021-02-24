import React from "react";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { createStyles, makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import getSymbolFromCurrency from "currency-symbol-map";

import Selection from "../components/Selection";
import DatePicker from "../components/DatePicker";
import RatesTable from "../components/RatesTable";
import HeaderText from "../components/HeaderText";
import { convertToThreeDecimals } from "../utils/stringUtils";
import {
  getUpdatedRates,
  updateBaseCurrency,
  updateDate,
} from "../redux/actions";
import { currenciesInFullName, useTypedSelector } from "../utils/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectors: {
      display: "flex",
      flexDirection: "row",
      marginBottom: "3rem",
    },

    showAllContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "10vh",
    },
  })
);

const ShowAllRates = () => {
  const classes = useStyles();

  //Fetch state from store
  const currenciesInFullName = useTypedSelector(
    (state) => state.displayedCurrenciesInFullName
  );
  const currenciesInShortName = useTypedSelector(
    (state) => state.displayedCurrencies
  );
  const currency = useTypedSelector((state) => state.currency);
  const tableData = useTypedSelector((state) => state.tableData);
  const dateValue = useTypedSelector((state) => state.date);

  const dispatch = useDispatch();

  //send actions
  const updateCurrency = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateBaseCurrency(event.target.value));
  const updateTableRates = () => dispatch(getUpdatedRates());
  //Currency onChange handler
  const selectionOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCurrency(event);
    updateTableRates();
  };

  //send actions
  const updateDateValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateDate(event.target.value));
  //Date onChange handler
  const datepickerOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateDateValue(event);
    updateTableRates();
  };

  /**
   * This function is to map all the required currencies inside of full name currency array,
   * and then get the full currency name. e.g -> NZD -> New Zealand Dollar
   */
  const selectionOptions = currenciesInShortName.map((ele: string) => (
    <MenuItem value={ele}>
      {Object.entries(currenciesInFullName as currenciesInFullName).map(
        (detail: string[]) => {
          if (detail[0] === ele) {
            return detail[1];
          }
          return null;
        }
      )}
    </MenuItem>
  ));

  /**
   * Styles to customize table row and cell.
   */
  const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
      head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    })
  )(TableCell);

  const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
        },
      },
    })
  )(TableRow);

  /**
   * This function creates table body.
   * tableData is full currency rates object what we get from api.
   *
   */
  let tableBody: Object[] = [];
  const createTableBody = () => {
    for (const [key, value] of Object.entries(tableData)) {
      if (currenciesInShortName.includes(key as string)) {
        tableBody.push(
          <StyledTableRow key={`${key}`}>
            <StyledTableCell align="left">{`${key}`}</StyledTableCell>
            <StyledTableCell align="left">
              {getSymbolFromCurrency(key) +
                convertToThreeDecimals(value as number)}
            </StyledTableCell>
          </StyledTableRow>
        );
      }
    }
    return tableBody;
  };

  return (
    <div className={classes.showAllContainer}>
      <HeaderText headerText="Exchange Rates for a Day" />
      <div>
        <Grid container>
          <Grid className={classes.selectors}>
            <Selection
              id="currency"
              labelText="Base Currency:"
              selectionValue={currency}
              onChange={selectionOnChange}
              selectionOptions={selectionOptions}
            />
            <DatePicker
              id="datepicker"
              dateValue={dateValue}
              label="Date:"
              onChange={datepickerOnChange}
            />
          </Grid>
        </Grid>
      </div>
      <RatesTable columnId={0} createBody={createTableBody()} />
    </div>
  );
};

export default ShowAllRates;
