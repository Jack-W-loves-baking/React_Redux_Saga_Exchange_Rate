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
    onChange?: any,
}

export interface ratesTable {
    columnId: number,
    createBody: any,
}