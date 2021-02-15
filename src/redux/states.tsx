import {convertDateToFormattedString, getNDaysBeforeNow} from "../utils/dateUtils";

export const States = {

    //for compare two currencies page
    baseCurrency: 'NZD',
    comparedCurrency: 'CNY',
    orders: ['ascending', 'descending'],
    order: 'ascending',
    startDate: convertDateToFormattedString(getNDaysBeforeNow(7)),
    endDate: convertDateToFormattedString(new Date()),
    comparedTableData: {},

    //for show all currencies page
    currency: 'NZD',
    date: convertDateToFormattedString(new Date()),
    tableData: {},

    //for common use
    displayedCurrencies: ["CNY", "USD", "AUD", "NZD", "CAD", "JPY"],
    displayedCurrenciesInFullName: [],
    tableColumn: [
        {
            title: 'Curreny',
            field: 'Value'
        },

        {
            title: 'Date',
            field: 'Value'
        }
    ],
}