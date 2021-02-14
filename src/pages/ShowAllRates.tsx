// @ts-nocheck
import HeaderText from "../components/HeaderText";
import Grid from "@material-ui/core/Grid";
import Selection from "../components/Selection";
import DatePicker from "../components/DatePicker";
import RatesTable from "../components/RatesTable";
import React from "react";
import {createStyles, makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {getUpdatedRates, updateBaseCurrency, updateDate} from "../redux/actions";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme: Theme) =>

    createStyles({

        selectors: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '3rem',
        },

        showAllContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: '10vh'
        },

    }));


const ShowAllRates = () => {

    const classes = useStyles();

    const currenciesInFullName = useSelector(state => state.displayedCurrenciesInFullName);

    const currenciesInShortName = useSelector(state => state.displayedCurrencies);

    const currency = useSelector(state => state.currency);

    const dispatch = useDispatch();

    //Currency onChange handler
    const updateCurrency = (event) => dispatch(updateBaseCurrency(event.target.value));
    const updateTableRates = () => dispatch(getUpdatedRates());

    const selectionOnChange = (event) => {
        updateCurrency(event);
        updateTableRates();
    }


    const dateValue = useSelector(state => state.date);

    //Date onChange handler
    const updateDateValue = (event) => dispatch(updateDate(event.target.value));

    const datepickerOnChange = (event) => {
        updateDateValue(event);
        updateTableRates();
    }

    const selectionOptions = currenciesInShortName
        .map((ele: string, i: number) => (
                <MenuItem id={i} value={ele}>
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

    const tableData = useSelector(state => state.tableData);

    return (
        <div className={classes.showAllContainer}>
            <HeaderText headerText="Exchange Rates for a Day"/>
            <div>
                <Grid container>
                    <Grid className={classes.selectors}>
                        <Selection
                            id="baseCurrency"
                            labelText="Base Currency:"
                            selectionValue={currency}
                            onChange={selectionOnChange}
                            selectionOptions={selectionOptions}
                        />
                        <DatePicker
                            id="datepicker"
                            dateValue={dateValue}
                            label="Date:"
                            onChange={datepickerOnChange}/>
                    </Grid>
                </Grid>
            </div>
            <RatesTable
            columnId={0}
            />
        </div>
    )
}

export default ShowAllRates;