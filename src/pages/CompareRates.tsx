import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
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
    updateOrder
} from "../redux/actions";
import {convertToThreeDecimals} from "../utils/stringUtils";

const useStyles = makeStyles((theme) =>
    createStyles({
        compareRatesContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: '10vh'
        },

        selectors: {
            display: 'flex',
            flexDirection: 'row',
        },

        orderSelector: {

            marginBottom: '3rem',
            alignSelf: 'flex-start'
        },

        midText: {
            fontSize: 22,
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
        }
    }));

const CompareRates = () => {

    const classes = useStyles();

    //Fetch state from store
    // @ts-ignore
    const currenciesInFullName = useSelector(state => state.displayedCurrenciesInFullName);
    // @ts-ignore
    const currenciesInShortName = useSelector(state => state.displayedCurrencies);
    // @ts-ignore
    const baseCurrency = useSelector(state => state.baseCurrency);
    // @ts-ignore
    const comparedCurrency = useSelector(state => state.comparedCurrency);
    // @ts-ignore
    const orders = useSelector(state => state.orders);
    // @ts-ignore
    const comparedTableData = useSelector(state => state.comparedTableData);
    // @ts-ignore
    const order = useSelector(state => state.order);


    const dispatch = useDispatch();


    //send actions
    const updateBaseCurrency = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateComparedPageBaseCurrency(event.target.value));
    const updateComparedTableRates = () => dispatch(getComparedCurrencyRates());
    //BaseCurrency onChange handler
    const baseCurrencySelectionOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateBaseCurrency(event);
        updateComparedTableRates();
    }

    //send actions
    const updateComparedCurrency = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateComparedPageComparedCurrency(event.target.value));
    //CompareCurrency onChange handler
    const comparedCurrencySelectionOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateComparedCurrency(event);
        updateComparedTableRates();
    }

    //send actions
    const updateOrderValue = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateOrder(event.target.value));
    //order selection onChange handler
    const orderSelectionOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateOrderValue(event);
    }


    const baseSelectionOptions = currenciesInShortName
        .map((ele: string) => (
                <MenuItem value={ele}>
                    {Object.keys(currenciesInFullName).map(key => {
                        if (key === ele) {
                            return currenciesInFullName[ele];
                        }
                        return null;
                    })
                    }
                </MenuItem>
            )
        )

    const comparedSelectionOptions = currenciesInShortName
        .map((ele: string) => (
                <MenuItem value={ele}>
                    {Object.keys(currenciesInFullName).map(key => {
                        if (key === ele) {
                            return currenciesInFullName[ele];
                        }
                        return null;
                    })
                    }
                </MenuItem>
            )
        )

    const orderSelectionOptions = orders
        .map((ele: string) => (
                <MenuItem value={ele}>
                    {ele}
                </MenuItem>
            )
        )


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

    /**
     * Functions to sort the object order by the currency rate in descending.
     * Then return the new sorted object.
     *
     * @param object
     */
    const descendingOrder = (object:object) => {
        // @ts-ignore
        return Object.entries(comparedTableData).sort((a, b) => Object.values(b[1]) - Object.values(a[1]))
    }

    /**
     * Functions to sort the object order by the currency rate in ascending.
     * Then return the new sorted object.
     *
     * @param object
     */
    const ascendingOrder = (object:object) => {
        // @ts-ignore
        return Object.entries(comparedTableData).sort((a, b) => Object.values(a[1]) - Object.values(b[1]))
    }

    let sortedTableData: Object[] = [];

    if (order === 'ascending') {
        sortedTableData = ascendingOrder(comparedTableData)
    } else {
        sortedTableData = descendingOrder(comparedTableData)
    }


    let result : object[]= []
    const createTableBody = () => {
        sortedTableData.map((ele) => {
            result.push(
                    <StyledTableRow>
                        <StyledTableCell
                            // @ts-ignore
                            align="left">{ele[0]}</StyledTableCell>
                        <StyledTableCell
                            align="left">
                            {
                                // @ts-ignore
                                Object.entries(ele[1]).map(v => {
                                    // @ts-ignore
                                        return v[0] + ' ' + convertToThreeDecimals(v[1])
                                    }
                                )}
                        </StyledTableCell>
                    </StyledTableRow>)
            }
        )
        return result;
    }


    return (
        <div className={classes.compareRatesContainer}>
            <HeaderText headerText="Exchange Rates Over Time"/>
            <div><Grid container>
                <Grid className={classes.selectors}>
                    <Selection
                        id="baseCurrency"
                        selectionValue={baseCurrency}
                        onChange={baseCurrencySelectionOnChange}
                        selectionOptions={baseSelectionOptions}
                    />
                    <p className={classes.midText}>To</p>
                    <Selection
                        id="compareCurrency"
                        selectionValue={comparedCurrency}
                        onChange={comparedCurrencySelectionOnChange}
                        selectionOptions={comparedSelectionOptions}
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


            <RatesTable
                columnId={1}
                createBody={createTableBody()}/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default CompareRates;