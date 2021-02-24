import { convertToThreeDecimals } from "../utils/stringUtils";

const rawData = 3.14159265357;

const expectResult = "3.142";

describe("3.14159265357 to 3-decimal points is 3.142", () => {
  expect(convertToThreeDecimals(rawData)).toBe(expectResult);
});

export {};
