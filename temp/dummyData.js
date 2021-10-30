import { green, red, grey } from "@mui/material/colors";
import abbrMonths from "../templates/months";

const randomData = (max, fixed) => {
  return (Math.random() * max).toFixed(fixed);
};

const dummyData = {
  sentiment: [
    { name: "Positive 😊", value: 1000 * Math.random(), color: green[500] },
    { name: "Negative 😢", value: 1000 * Math.random(), color: red[500] },
    { name: "Neutral 😐", value: 1000 * Math.random(), color: grey[600] },
  ],

  aum: randomData(10000000000, 0),

  voter: randomData(1, 2) / 50,

  members: randomData(500000, 0),

  activity: abbrMonths.map((month) => {
    return {
      month,
      Txs: randomData(10000000, 0),
    };
  }),

  aumOverTime: abbrMonths.map((month) => {
    return {
      month,
      AUM: randomData(10000000000, 0),
    };
  }),

  gini: abbrMonths.map((month) => {
    return {
      month,
      "Gini-Idx": randomData(1, 2),
    };
  }),
};

export default dummyData;
