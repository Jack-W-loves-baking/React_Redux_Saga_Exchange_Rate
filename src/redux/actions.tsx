/**
 * Action types. GET_XXX_SUCCESS action types are triggers for saga mid layer
 */

//triggers for saga.
export const GET_CURRENCIES_IN_FULL_NAME_SUCCESS =
  "GET_CURRENCIES_IN_FULL_NAME_SUCCESS";
export const GET_UPDATED_RATES_SUCCESS = "GET_UPDATED_RATES_SUCCESS";
export const GET_COMPARED_RATES_SUCCESS = "GET_COMPARED_RATES_SUCCESS";

//for showAll page
export const UPDATE_TABLE_RATES = "UPDATE_TABLE_RATES";
export const UPDATE_CURRENCY_IN_FULL_NAME = "UPDATE_CURRENCY_IN_FULL_NAME";
export const UPDATE_BASE_CURRENCY = "UPDATE_BASE_CURRENCY";
export const UPDATE_DATE = "UPDATE_DATE";

//for compare two currencies page
export const UPDATE_COMPARED_TABLE_RATES = "UPDATE_COMPARED_TABLE_RATES";
export const UPDATE_COMPARED_TABLE_BASE_CURRENCY =
  "UPDATE_COMPARED_TABLE_BASE_CURRENCY";
export const UPDATE_COMPARED_TABLE_COMPARED_CURRENCY =
  "UPDATE_COMPARED_TABLE_COMPARED_CURRENCY";
export const UPDATE_ORDER = "UPDATE_ORDER";

//triggers for saga when page on load.
export const getCurrencyFullName = () => ({
  type: GET_CURRENCIES_IN_FULL_NAME_SUCCESS,
});

//triggers for saga when page on load.
export const getUpdatedRates = () => ({
  type: GET_UPDATED_RATES_SUCCESS,
});

//triggers for saga when page on load.
export const getComparedCurrencyRates = () => ({
  type: GET_COMPARED_RATES_SUCCESS,
});

//for showAll page
export const updateRates = (data: any) => ({
  type: UPDATE_TABLE_RATES,
  payload: data,
});

//for showAll page
export const updateCurrencyFullName = (data: any) => ({
  type: UPDATE_CURRENCY_IN_FULL_NAME,
  payload: data,
});

//for showAll page
export const updateBaseCurrency = (data: string) => ({
  type: UPDATE_BASE_CURRENCY,
  payload: data,
});

//for showAll page
export const updateDate = (date: string) => ({
  type: UPDATE_DATE,
  payload: date,
});

//for compare two currencies page
export const updateComparedRates = (date: string) => ({
  type: UPDATE_COMPARED_TABLE_RATES,
  payload: date,
});

//for compare two currencies page
export const updateComparedPageBaseCurrency = (date: string) => ({
  type: UPDATE_COMPARED_TABLE_BASE_CURRENCY,
  payload: date,
});

//for compare two currencies page
export const updateComparedPageComparedCurrency = (date: string) => ({
  type: UPDATE_COMPARED_TABLE_COMPARED_CURRENCY,
  payload: date,
});

//for compare two currencies page
export const updateOrder = (date: string) => ({
  type: UPDATE_ORDER,
  payload: date,
});
