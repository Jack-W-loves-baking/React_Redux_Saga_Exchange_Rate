import {call, put, takeEvery, select} from 'redux-saga/effects';
import {
    updateCurrencyFullName, GET_CURRENCIES_IN_FULL_NAME_SUCCESS,
    updateRates, GET_INITIAL_RATES_SUCCESS,
    GET_UPDATED_RATES_SUCCESS
} from "./actions";
import axios from "axios";

const getFullCurrencyNameResponse = async () => {
    const url = `https://openexchangerates.org/api/currencies.json`;
    return await axios.get(url);
}

const getInitialRatesResponse = async () => {
    const url = `https://api.exchangeratesapi.io/latest?base=NZD`;
    return await axios.get(url)
}

const getUpdatedRatesResponse = async (date,baseCurrency) =>{
    const url = `https://api.exchangeratesapi.io/${date}?base=${baseCurrency}`;
    return await axios.get(url)
}

const getCompareRatesResponse = async (startDate,endDate,baseCurrency,compareCurrecy) => {
    const url = `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=${baseCurrency}&symbols=${compareCurrecy}`;
    return await axios.get(url);
}

function* getCurencyFullNameAndStatus() {
    try {
        const {data} = yield call(getFullCurrencyNameResponse);
        yield put(updateCurrencyFullName(data));
    } catch(e) {
        console.log(e)
    }
}

function* getInitialExchangeRates() {
    try {
        const {data} = yield call(getInitialRatesResponse);
        yield put(updateRates(data));
    } catch(e) {
        console.log(e)
    }
}

function* getUpdatedExchangeRates() {
    try {
        const newDate = yield select(state => state.date);
        const baseCurrency = yield select(state => state.currency);
        const {data} = yield call(getUpdatedRatesResponse,newDate,baseCurrency);

        yield put(updateRates(data));
    } catch(e) {
        console.log(e)
    }
}

function* getUpdatedComparedExchangeRates() {
    try {
        const newDate = yield select(state => state.date);
        const baseCurrency = yield select(state => state.currency);
        const {data} = yield call(getUpdatedRatesResponse,newDate,baseCurrency);

        yield put(updateRates(data));
    } catch(e) {
        console.log(e)
    }
}

export default function* rootSaga() {
    yield takeEvery(GET_CURRENCIES_IN_FULL_NAME_SUCCESS, getCurencyFullNameAndStatus);
    yield takeEvery(GET_INITIAL_RATES_SUCCESS, getInitialExchangeRates);
    yield takeEvery(GET_UPDATED_RATES_SUCCESS, getUpdatedExchangeRates);
}
