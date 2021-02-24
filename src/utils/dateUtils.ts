/**
 * Convert date type variable to string type with the format 'yyyy-mm-dd'
 *
 * @param date
 */
export function convertDateToFormattedString(date: Date) {
  //month/day 1-9 change to 01-09.
  const getCurrentDayOrMonth = (month: number) => {
    return month < 10 ? "0" + month : month;
  };

  const month = getCurrentDayOrMonth(date.getUTCMonth() + 1);
  const day = getCurrentDayOrMonth(date.getUTCDate());
  const year = date.getUTCFullYear();

  return year + "-" + month + "-" + day;
}

/**
 * get the date which is N days before now.
 * returns a date.
 *
 * @param numberOfDays
 */
export function getNDaysBeforeNow(numberOfDays: number) {
  let date = new Date();
  date.setDate(date.getDate() - numberOfDays);

  return date;
}
