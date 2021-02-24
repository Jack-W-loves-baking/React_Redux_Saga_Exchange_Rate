import { compareData, compareDataItem } from "./types";

/**
 * Functions to sort the object order by the currency rate in descending.
 * Then return the new sorted object.
 *
 * @param object
 */
export const descendingOrder = (object: object) => {
  return Object.entries(object as compareData).sort(
    (a: compareDataItem, b: compareDataItem) =>
      ((Object.values(b[1]) as unknown) as number) -
      ((Object.values(a[1]) as unknown) as number)
  );
};

/**
 * Functions to sort the object order by the currency rate in ascending.
 * Then return the new sorted object.
 *
 * @param object
 */
export const ascendingOrder = (object: object) => {
  return Object.entries(object as compareData).sort(
    (a: compareDataItem, b: compareDataItem) =>
      ((Object.values(a[1]) as unknown) as number) -
      ((Object.values(b[1]) as unknown) as number)
  );
};
