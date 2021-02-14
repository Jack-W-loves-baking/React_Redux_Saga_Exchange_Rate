// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles} from "@material-ui/styles";
import Grid from '@material-ui/core/Grid';
import {useSelector, useDispatch} from 'react-redux'

import Selection from './components/Selection';
import DatePicker from './components/DatePicker';
import HeaderText from './components/HeaderText';
import RatesTable from './components/RatesTable';
import {GET_CURRENCIES_IN_FULL_NAME_SUCCESS, GET_INITIAL_RATES_SUCCESS} from "./redux/actions";
import LoadingSpin from "./components/LoadingSpin";


import ReactDOM from "react-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Switch, Route, BrowserRouter, Link} from "react-router-dom";
import {AppBar} from "@material-ui/core";
import ShowAllRates from "./pages/ShowAllRates";
import CompareRates from "./pages/CompareRates";
import NotFound from "./pages/NotFound";

const useStyles = makeStyles((theme: any) =>

    createStyles({
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },

        selectors: {
            display: 'flex',
            flexDirection: 'row',
        }
    }));

function App() {

    const dispatch = useDispatch();

    const getCurrencyFullName = () => dispatch({type: GET_CURRENCIES_IN_FULL_NAME_SUCCESS});

    useEffect((() => {
        getCurrencyFullName();
    }), [])

    const getInitialRates = () => dispatch({type: GET_INITIAL_RATES_SUCCESS});

    useEffect((() => {
        getInitialRates();
    }), [])

    const getInitialComparedRates = () => dispatch({type: GET_INITIAL_RATES_SUCCESS});

    useEffect((() => {
        getInitialRates();
    }), [])

    const routers = ['/showall', '/compare'];
    const classes = useStyles();

    //const shouldRenderSpinner = useSelector(state =>state.isLoading);
    //{shouldRenderSpinner && <LoadingSpin/>}
    return (

        <div className={classes.container}>

            <BrowserRouter>
                <Route path='/'
                render={(history)=>(
                    <AppBar position="static">
                        <Tabs value={history.location.pathname}>
                            <Tab label="SHOW ALL"
                                 value={routers[0]}
                                 component={Link}
                                 to={routers[0]}/>
                            <Tab
                                label="COMPARE TWO CURRENCIES"
                                value={routers[1]}
                                component={Link}
                                to={routers[1]}/>
                        </Tabs>
                    </AppBar>
                )}>

                </Route>
                <Switch>
                    <Route exact path='/showall' component={ShowAllRates}/>
                    <Route exact path='/compare' component={CompareRates}/>
                    <Route exact path='/' component={ShowAllRates}/>
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>


        </div>

    );
}

export default App;
