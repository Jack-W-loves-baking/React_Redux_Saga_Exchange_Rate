import {
    GET_CURRENCIES_IN_FULL_NAME_SUCCESS,
    GET_INITIAL_RATES_SUCCESS,
    UPDATE_TABLE_RATES, UPDATE_CURRENCY_IN_FULL_NAME, UPDATE_BASE_CURRENCY, UPDATE_DATE
} from "./actions";

import {States} from "./states";

const reducer = (state = States, action: any) => {

    switch (action.type) {

        case GET_CURRENCIES_IN_FULL_NAME_SUCCESS:
            return {
                ...state,
                hasLoadedCurrencyFullNameList: action.isSuccess
            }

        case UPDATE_CURRENCY_IN_FULL_NAME:
            return{
                ...state,
                displayedCurrenciesInFullName: action.payload
            }


        case GET_INITIAL_RATES_SUCCESS:
            return {
                ...state,
                hasLoadedInitialTableData: action.isSuccess

            }

        case UPDATE_TABLE_RATES:
            return {
                ...state,
                tableData: action.payload.rates
            }

        case UPDATE_BASE_CURRENCY:
            return{
                ...state,
                currency: action.payload
            }

        case UPDATE_DATE:
            return{
                ...state,
                date: action.payload
            }
    }
    return state;
}

export default reducer;