import { compareData, compareDataItem } from "../utils/types";

const ascendingOrder = (object: object) => {
    return (Object.entries(object as compareData))
        .sort((a: compareDataItem, b: compareDataItem) =>
            (Object.values(a[1]) as unknown as number)
            - (Object.values(b[1]) as unknown as number))
}

const descendingOrder = (object: object) => {
    return Object.entries(object as compareData)
        .sort((a: compareDataItem, b: compareDataItem) =>
            (Object.values(b[1]) as unknown as number)
            - (Object.values(a[1]) as unknown as number))
}

module.exports = { ascendingOrder, descendingOrder };