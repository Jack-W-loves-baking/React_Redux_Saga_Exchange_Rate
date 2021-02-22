export interface selection {
    id?: string,
    labelText?: string,
    selectionValue?: string,
    onChange?: any,
    selectionOptions?: object
}

export interface headerText {
    headerText?: string
}

export interface datePicker {
    id?: string,
    dateValue?: string,
    label?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export interface ratesTable {
    columnId: number,
    createBody: any,
}

export type compareCurrencyAndValue = {
    [key: string]: number
};

export interface compareData {
    [key: string]: compareCurrencyAndValue
}

export type compareDataItem = [string, compareCurrencyAndValue];
