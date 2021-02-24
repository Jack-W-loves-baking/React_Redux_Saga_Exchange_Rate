import { call, put, takeEvery, select } from "redux-saga/effects";
import axios from "axios";

import {
  updateCurrencyFullName,
  GET_CURRENCIES_IN_FULL_NAME_SUCCESS,
  updateRates,
  GET_UPDATED_RATES_SUCCESS,
  updateComparedRates,
  GET_COMPARED_RATES_SUCCESS,
} from "./actions";

/**
 * Api call to get the full currency names
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
const getFullCurrencyNameResponse = async () => {
  const url = `https://openexchangerates.org/api/currencies.json`;
  return await axios.get(url);
};

/**
 * Api call to get the currency rates based on the query date and base currency.
 *
 * @param date
 * @param baseCurrency
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
const getUpdatedRatesResponse = async (date, baseCurrency) => {
  const url = `https://api.exchangeratesapi.io/${date}?base=${baseCurrency}`;
  return await axios.get(url);
};

/**
 * Api call to get the currency rates based on the query date and base currency.
 *
 * @param startDate
 * @param endDate
 * @param baseCurrency
 * @param comparedCurrecy
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
const getCompareRatesResponse = async (
  startDate,
  endDate,
  baseCurrency,
  comparedCurrecy
) => {
  const url = `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=${baseCurrency}&symbols=${comparedCurrecy}`;
  return await axios.get(url);
};

/**
 * Get response full name object, and deconstruct to data level
 *
 * @returns {Generator<SimpleEffect<"PUT", PutEffectDescriptor<{payload: any, type: string}>>|SimpleEffect<"CALL", CallEffectDescriptor<function(): AxiosResponse<*> extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : (function(): AxiosResponse<*> extends ((...args: any[]) => Promise<infer RT>) ? RT : (function(): AxiosResponse<*> extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
 */
function* getCurencyFullNameAndStatus() {
  try {
    const { data } = yield call(getFullCurrencyNameResponse);
    yield put(updateCurrencyFullName(data));
  } catch (e) {
    console.log(e);
  }
}

/**
 * Get response for all currency object, and deconstruct to data level
 *
 * @returns {Generator<SimpleEffect<"SELECT", SelectEffectDescriptor>|SimpleEffect<"PUT", PutEffectDescriptor<{payload: any, type: string}>>|SimpleEffect<"CALL", CallEffectDescriptor<function(*, *): AxiosResponse<*> extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : (function(*, *): AxiosResponse<*> extends ((...args: any[]) => Promise<infer RT>) ? RT : (function(*, *): AxiosResponse<*> extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
 */
function* getUpdatedExchangeRates() {
  try {
    const newDate = yield select((state) => state.date);
    const baseCurrency = yield select((state) => state.currency);
    const { data } = yield call(getUpdatedRatesResponse, newDate, baseCurrency);

    yield put(updateRates(data));
  } catch (e) {
    console.log(e);
  }
}

/**
 * Get response for compare two currencies rates object, and deconstruct to data level
 *
 * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<function(*, *, *, *): AxiosResponse<*> extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : (function(*, *, *, *): AxiosResponse<*> extends ((...args: any[]) => Promise<infer RT>) ? RT : (function(*, *, *, *): AxiosResponse<*> extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<{payload: string, type: string}>>|SimpleEffect<"SELECT", SelectEffectDescriptor>, void, *>}
 */
function* getComparedRates() {
  try {
    const startDate = yield select((state) => state.startDate);
    const endDate = yield select((state) => state.endDate);
    const baseCurrency = yield select((state) => state.baseCurrency);
    const comparedCurrency = yield select((state) => state.comparedCurrency);

    const { data } = yield call(
      getCompareRatesResponse,
      startDate,
      endDate,
      baseCurrency,
      comparedCurrency
    );

    yield put(updateComparedRates(data));
  } catch (e) {
    console.log(e);
  }
}

/**
 * Saga listeners.
 *
 * @returns {Generator<SimpleEffect<"FORK", ForkEffectDescriptor<never>>, void, *>}
 */
export default function* rootSaga() {
  yield takeEvery(
    GET_CURRENCIES_IN_FULL_NAME_SUCCESS,
    getCurencyFullNameAndStatus
  );
  yield takeEvery(GET_UPDATED_RATES_SUCCESS, getUpdatedExchangeRates);
  yield takeEvery(GET_COMPARED_RATES_SUCCESS, getComparedRates);
}
