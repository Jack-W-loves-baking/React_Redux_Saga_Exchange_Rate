import { useSelector, TypedUseSelectorHook } from "react-redux";

interface RootState {
  baseCurrency: string;
  comparedCurrency: string;
  orders: string[];
  order: string;
  startDate: string;
  endDate: string;
  comparedTableData: object;

  //for show all currencies page
  currency: string;
  date: string;
  tableData: object;

  //for common use
  displayedCurrencies: string[];
  displayedCurrenciesInFullName: object;
  tableColumn: object[];
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface selection {
  id?: string;
  labelText?: string;
  selectionValue?: string;
  onChange?: any;
  selectionOptions?: object;
}

export interface headerText {
  headerText?: string;
}

export interface datePicker {
  id?: string;
  dateValue?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ratesTable {
  columnId: number;
  createBody: any;
}

export type compareCurrencyAndValue = {
  [key: string]: number;
};

export interface compareData {
  [key: string]: compareCurrencyAndValue;
}

export type compareDataItem = [string, compareCurrencyAndValue];

export interface currenciesInFullName {
  [key: string]: string;
}
