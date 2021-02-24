import {
  convertDateToFormattedString,
  getNDaysBeforeNow,
} from "../utils/dateUtils";

const rawDateOne = new Date("2020-08-01");
const rawDateTwo = new Date("2020/08/01");

const expectResultDateString = "2020-08-01";

describe("Date value => string", () => {
  it("2020-08-01 => 2020-08-01", () => {
    expect(convertDateToFormattedString(rawDateOne)).toBe(
      expectResultDateString
    );
  });
  it("2020/08/01 !=> 2020-08-01", () => {
    expect(convertDateToFormattedString(rawDateTwo)).not.toBe(
      expectResultDateString
    );
  });
});

const numberOfDays = 7;
const expectResultDateValue = new Date();
expectResultDateValue.setDate(expectResultDateValue.getDate() - 7);

describe("Date at N days from now", () => {
  it("N = 7", () => {
    expect(getNDaysBeforeNow(numberOfDays).getDate()).toBe(
      expectResultDateValue.getDate()
    );
  });
});

export {};
