import { green, red, grey } from "@mui/material/colors";
import abbrMonths from "../templates/months";

const randomData = (max, fixed) => {
  return (Math.random() * max).toFixed(fixed);
};

const dummyData = {
  sentiment: [
    { name: "Positive 😊", value: 454, color: green[600] },
    { name: "Negative 😢", value: 261, color: red[600] },
    { name: "Neutral 😐", value: 97, color: grey[600] },
  ],

  aum: randomData(10000000000, 0),

  voter: randomData(1, 2) / 50,

  members: randomData(500000, 0),

  activity: abbrMonths.map((month) => {
    return {
      month,
      txs: Number(randomData(10000000, 0)),
    };
  }),
};

export default dummyData;
