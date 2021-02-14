export const GET_CURRENCIES_IN_FULL_NAME_SUCCESS = 'GET_CURRENCIES_IN_FULL_NAME_SUCCESS';
export const GET_INITIAL_RATES_SUCCESS = 'GET_INITIAL_RATES_SUCCESS';
export const GET_UPDATED_RATES_SUCCESS = 'GET_UPDATED_RATES_SUCCESS';
export const GET_INITIAL_COMPARED_RATES_SUCCESS = 'GET_INITIAL_COMPARED_RATES_SUCCESS';

export const UPDATE_TABLE_RATES = 'UPDATE_TABLE_RATES';
export const UPDATE_CURRENCY_IN_FULL_NAME = 'UPDATE_CURRENCY_IN_FULL_NAME';
export const UPDATE_BASE_CURRENCY = 'UPDATE_BASE_CURRENCY';
export const UPDATE_DATE = 'UPDATE_DATE';

export const getCurrencyFullName = () => ({
    type: GET_CURRENCIES_IN_FULL_NAME_SUCCESS,
    isSuccess: true
})

export const getInitialRates = () => ({
    type: GET_INITIAL_RATES_SUCCESS,
    isSuccess: true
})

export const getUpdatedRates = () => ({
    type: GET_UPDATED_RATES_SUCCESS,
    isSuccess: true
})



export const updateRates = (data: any) => ({
    type: UPDATE_TABLE_RATES,
    payload: data
})

export const updateCurrencyFullName = (data: any) => ({
    type: UPDATE_CURRENCY_IN_FULL_NAME,
    payload: data
})

export const updateBaseCurrency = (baseCurrency: string) => ({
    type: UPDATE_BASE_CURRENCY,
    payload: baseCurrency
})

export const updateDate = (date: string) => ({
    type: UPDATE_DATE,
    payload: date
})
