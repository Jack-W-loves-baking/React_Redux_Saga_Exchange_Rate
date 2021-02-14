import {convertDateToFormattedString, getNDaysBeforeNow} from "../utils/dateUtils";

export const States = {

    //for compare page
    baseCurrency: 'NZD',

    comparedCurrency: 'CNY',


    orders: ['ascending', 'descending'],

    order: 'ascending',

    startDate:convertDateToFormattedString(getNDaysBeforeNow(7)),


    endDate: convertDateToFormattedString(new Date()),

    currency: 'NZD',

    isLoading: true,

    date:convertDateToFormattedString(new Date()),

    hasLoadedInitialTableData : false,

    hasLoadedCurrencyFullNameList: false,

    tableData: {},

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


    //for common use
    displayedCurrencies : ["CNY", "USD", "AUD", "NZD", "CAD", "JPY"],
    displayedCurrenciesInFullName:[],

}