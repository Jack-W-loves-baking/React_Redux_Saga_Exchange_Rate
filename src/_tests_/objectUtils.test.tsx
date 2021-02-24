import { ascendingOrder, descendingOrder } from "../utils/objectUtils";

const rawData = {
  "2021-02-02": {
    NZD: 0.2159704717,
  },
  "2021-02-08": {
    NZD: 0.2156716226,
  },
  "2021-02-11": {
    NZD: 0.2137976749,
  },
};

const expectResultAse = [
  [
    "2021-02-11",
    {
      NZD: 0.2137976749,
    },
  ],
  [
    "2021-02-08",
    {
      NZD: 0.2156716226,
    },
  ],
  [
    "2021-02-02",
    {
      NZD: 0.2159704717,
    },
  ],
];

const expectResultDes = [
  [
    "2021-02-02",
    {
      NZD: 0.2159704717,
    },
  ],
  [
    "2021-02-08",
    {
      NZD: 0.2156716226,
    },
  ],
  [
    "2021-02-11",
    {
      NZD: 0.2137976749,
    },
  ],
];

describe("ascendingOrder", () => {
  it("will sort the object based on the value in ascending order", () => {
    expect(ascendingOrder(rawData)).toStrictEqual(expectResultAse);
  });
});

describe("sort the object based on the value in descending order", () => {
  expect(descendingOrder(rawData)).toStrictEqual(expectResultDes);
});

export {};
