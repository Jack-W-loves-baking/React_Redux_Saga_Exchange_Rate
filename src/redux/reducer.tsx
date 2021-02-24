import {
  UPDATE_TABLE_RATES,
  UPDATE_CURRENCY_IN_FULL_NAME,
  UPDATE_BASE_CURRENCY,
  UPDATE_DATE,
  UPDATE_COMPARED_TABLE_RATES,
  UPDATE_COMPARED_TABLE_BASE_CURRENCY,
  UPDATE_COMPARED_TABLE_COMPARED_CURRENCY,
  UPDATE_ORDER,
} from "./actions";

import { States } from "./states";

const reducer = (state = States, action: any) => {
  /**
   * Listen the dispatched actions, ip action types match up, then update states value based on payloads.
   */
  switch (action.type) {
    case UPDATE_CURRENCY_IN_FULL_NAME:
      return {
        ...state,
        displayedCurrenciesInFullName: action.payload,
      };

    case UPDATE_TABLE_RATES:
      return {
        ...state,
        tableData: action.payload.rates,
      };

    case UPDATE_BASE_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };

    case UPDATE_DATE:
      return {
        ...state,
        date: action.payload,
      };

    case UPDATE_COMPARED_TABLE_RATES:
      return {
        ...state,
        comparedTableData: action.payload.rates,
      };

    case UPDATE_COMPARED_TABLE_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.payload,
      };

    case UPDATE_COMPARED_TABLE_COMPARED_CURRENCY:
      return {
        ...state,
        comparedCurrency: action.payload,
      };

    case UPDATE_ORDER:
      return {
        ...state,
        order: action.payload,
      };
  }
  return state;
};

export default reducer;
