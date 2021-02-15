/************************************************************************************************
 * This is my project for react induction, refer to confluence ticket ---
 * https://ezyvet.atlassian.net/wiki/spaces/DEV/pages/888209690/React+Dev+Onboarding
 *
 *
 * Highlights:
 * 1. React + Redux
 * 2. Two pages routing
 * 3. Data from : api.exchangeratesapi.io
 * 4. Saga mid layer handle all api calls
 *
 * Author: Jack Wang
 * Since: 15 Feb 2021
 *
 *
 *
 * ***********************************************************************************************
 */
import React, {useEffect} from 'react';
import {createStyles, makeStyles} from "@material-ui/styles";
import {useDispatch} from 'react-redux'
import {
    GET_CURRENCIES_IN_FULL_NAME_SUCCESS,
    GET_COMPARED_RATES_SUCCESS,
    GET_UPDATED_RATES_SUCCESS
} from "./redux/actions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Switch, Route, BrowserRouter, Link} from "react-router-dom";
import {AppBar} from "@material-ui/core";

import ShowAllRates from "./pages/ShowAllRates";
import CompareRates from "./pages/CompareRates";
import NotFound from "./pages/NotFound";


const useStyles = makeStyles((theme) =>

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

    const classes = useStyles();

    const dispatch = useDispatch();

    /**
     * Dispatch the action when the project is on loading. Sage will listen to action type : GET_CURRENCIES_IN_FULL_NAME_SUCCESS,
     * and then make api call to get the full currencies names.
     */
    const getCurrencyFullName = () => dispatch({type: GET_CURRENCIES_IN_FULL_NAME_SUCCESS});
    useEffect((() => {
        getCurrencyFullName();
    }), [])

    /**
     * Dispatch the action when the project is on loading. Sage will listen to action type : GET_INITIAL_RATES_SUCCESS,
     * and then make api call to get the initial value object for ShowAll page.
     */
    const getInitialRates = () => dispatch({type: GET_UPDATED_RATES_SUCCESS});
    useEffect((() => {
        getInitialRates();
    }), [])


    /**
     * Dispatch the action when the project is on loading. Sage will listen to action type : GET_COMPARED_RATES_SUCCESS,
     * and then make api call to get the initial value object for CompareRates page.
     */
    const getInitialComparedRates = () => dispatch({type: GET_COMPARED_RATES_SUCCESS});
    useEffect((() => {
        getInitialComparedRates();
    }), [])


    //List of routers
    const routers = ['/showall', '/compare'];

    return (
        <div className={classes.container}>
            <BrowserRouter>
                <Route path='/'
                render={(history)=>(
                    <AppBar position="static">
                        <Tabs value={history.location.pathname !== '/'? history.location.pathname : false}>
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
                    {/*use exact path to avoid partial match.*/}
                    {/*    e.g -> /showall/jack is not allowed here*/}
                    <Route exact path='/showall' component={ShowAllRates}/>
                    <Route exact path='/compare' component={CompareRates}/>
                    <Route exact path='/' component={ShowAllRates}/>

                    {/*if the path does not match, redirected to NOT Found page*/}
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
