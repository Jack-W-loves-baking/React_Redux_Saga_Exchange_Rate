import React from "react";
import { useDispatch } from "react-redux";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";

import HeaderText from "../components/HeaderText";
import Selection from "../components/Selection";
import RatesTable from "../components/RatesTable";
import {
  getComparedCurrencyRates,
  updateComparedPageComparedCurrency,
  updateComparedPageBaseCurrency,
  updateOrder,
} from "../redux/actions";
import { convertToThreeDecimals } from "../utils/stringUtils";
import { currenciesInFullName, compareDataItem } from "../utils/types";
import { useTypedSelector } from "../utils/types";
import { ascendingOrder, descendingOrder } from "../utils/objectUtils";

const useStyles = makeStyles((theme) =>
  createStyles({
    compareRatesContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "10vh",
    },

    selectors: {
      display: "flex",
      flexDirection: "row",
    },

    orderSelector: {
      marginBottom: "3rem",
      alignSelf: "flex-start",
    },

    midText: {
      fontSize: 22,
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  })
);

const CompareRates = () => {
  const classes = useStyles();

  //Fetch state from store
  const currenciesInFullName = useTypedSelector(
    (state) => state.displayedCurrenciesInFullName
  );
  const currenciesInShortName = useTypedSelector(
    (state) => state.displayedCurrencies
  );
  const baseCurrency = useTypedSelector((state) => state.baseCurrency);
  const comparedCurrency = useTypedSelector((state) => state.comparedCurrency);
  const orders = useTypedSelector((state) => state.orders);
  const comparedTableData = useTypedSelector(
    (state) => state.comparedTableData
  );
  const order = useTypedSelector((state) => state.order);

  const dispatch = useDispatch();

  //send actions
  const updateBaseCurrency = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateComparedPageBaseCurrency(event.target.value));
  const updateComparedTableRates = () => dispatch(getComparedCurrencyRates());
  //BaseCurrency onChange handler
  const baseCurrencySelectionOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateBaseCurrency(event);
    updateComparedTableRates();
  };

  //send actions
  const updateComparedCurrency = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateComparedPageComparedCurrency(event.target.value));
  //CompareCurrency onChange handler
  const comparedCurrencySelectionOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateComparedCurrency(event);
    updateComparedTableRates();
  };

  //send actions
  const updateOrderValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateOrder(event.target.value));
  //order selection onChange handler
  const orderSelectionOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateOrderValue(event);
  };

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

  const orderSelectionOptions = orders.map((ele: string) => (
    <MenuItem value={ele}>{ele}</MenuItem>
  ));

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

  let sortedTableData: Object[] = [];

  if (order === "ascending") {
    sortedTableData = ascendingOrder(comparedTableData);
  } else {
    sortedTableData = descendingOrder(comparedTableData);
  }

  let result: any[] = [];
  console.log(sortedTableData);
  const createTableBody = () => {
    (sortedTableData as compareDataItem[]).map((ele: compareDataItem) => {
      result.push(
        <StyledTableRow>
          <StyledTableCell align="left">{ele[0]}</StyledTableCell>
          <StyledTableCell align="left">
            {Object.entries(ele[1]).map((v) => {
              return v[0] + " " + convertToThreeDecimals(v[1] as number);
            })}
          </StyledTableCell>
        </StyledTableRow>
      );
    });
    return result;
  };

  return (
    <div className={classes.compareRatesContainer}>
      <HeaderText headerText="Exchange Rates Over Time" />
      <div>
        <Grid container>
          <Grid className={classes.selectors}>
            <Selection
              id="baseCurrency"
              selectionValue={baseCurrency}
              onChange={baseCurrencySelectionOnChange}
              selectionOptions={selectionOptions}
            />
            <p className={classes.midText}>To</p>
            <Selection
              id="compareCurrency"
              selectionValue={comparedCurrency}
              onChange={comparedCurrencySelectionOnChange}
              selectionOptions={selectionOptions}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.orderSelector}>
        <Selection
          id="orders"
          labelText="Order Date"
          selectionValue={order}
          selectionOptions={orderSelectionOptions}
          onChange={orderSelectionOnChange}
        />
      </div>
      <RatesTable columnId={1} createBody={createTableBody()} />
      <br />
      <br />
      <br />
    </div>
  );
};

export default CompareRates;
