import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mui
import Paper from "@mui/material/Card";
import Typography from "@mui/material/Typography";

// Utils
import { numbersWithCommas, abbrNumber } from "../../utils/numbers";

export default function BarGraph({ title, data, color, keyBar }) {
  return (
    <Paper elevation={10}>
      <Typography variant="h5" gutterBottom m={1} align="center">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" aspect={1.5}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(label) => `$${abbrNumber(label)}`} />
          <Tooltip formatter={(number) => `$${numbersWithCommas(number)}`} />
          <Bar dataKey={keyBar} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
