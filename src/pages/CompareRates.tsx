// @ts-nocheck
import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";

import HeaderText from "../components/HeaderText";
import Grid from "@material-ui/core/Grid";
import Selection from "../components/Selection";
import {useDispatch, useSelector} from "react-redux";
import {getUpdatedRates, updateBaseCurrency, updateDate} from "../redux/actions";
import MenuItem from "@material-ui/core/MenuItem";

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
            marginBottom: '3rem',

        },

        orderSelector:{
            alignItems: 'left',
        },

        comparedCurrency: {
            marginLeft: theme.spacing(10),
            marginRight: theme.spacing(0),
        }
    }));

const CompareRates = () =>{

    const classes = useStyles();

    const currenciesInFullName = useSelector(state => state.displayedCurrenciesInFullName);

    const currenciesInShortName = useSelector(state => state.displayedCurrencies);

    const baseCurrency = useSelector(state => state.baseCurrency);

    const comparedCurrency = useSelector(state => state.comparedCurrency);

    const orders = useSelector(state => state.orders);

    const order = useSelector(state => state.order);

    const dispatch = useDispatch();

    //Currency onChange handler
    const updateCurrency = (event) => dispatch(updateBaseCurrency(event.target.value));
    const updateTableRates = () => dispatch(getUpdatedRates());

    const selectionOnChange = (event) => {
        updateCurrency(event);
        updateTableRates();
    }


    const baseSelectionOptions = currenciesInShortName
        .map((ele: string, i: number) => (
                <MenuItem id={"b"+i} value={ele}>
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
        .map((ele: string, i: number) => (
                <MenuItem id={"c"+i} value={ele}>
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
        .map((ele: string, i: number) => (
                <MenuItem id={"o"+i} value={ele}>
                    {ele}
                </MenuItem>
            )
        )
    return (
        <div className={classes.compareRatesContainer}>
            <HeaderText headerText="Exchange Rates Over Time" />
            <Grid container>
                <Grid className={classes.selectors}>
                    <Selection
                        id="baseCurrency"
                        selectionValue={baseCurrency}
                        onChange={selectionOnChange}
                        selectionOptions={baseSelectionOptions}
                    />
                    <Selection
                        id="compareCurrency"
                        selectionValue={comparedCurrency}
                        onChange={selectionOnChange}
                        selectionOptions={comparedSelectionOptions}
                    />
                </Grid>
            </Grid>
            <Selection
                className={classes.orderSelector}
                id="orders"
                labelText="Order Date"
                selectionValue={order}
                onChange={selectionOnChange}
                selectionOptions={orderSelectionOptions}
            />

        </div>
    )
}

export default  CompareRates;