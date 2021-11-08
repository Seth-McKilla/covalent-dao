import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mui
import Paper from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { default as MuiTooltip } from "@mui/material/Tooltip";

// Utils
import { numbersWithCommas, abbrNumber } from "../../utils/numbers";

export default function LineGraph({ title, data, color, keyX, keyY, tooltip }) {
  return (
    <Paper elevation={10}>
      <MuiTooltip title={tooltip}>
        <Typography variant="h5" gutterBottom m={1} align="center">
          {title}
        </Typography>
      </MuiTooltip>
      <ResponsiveContainer width="100%" aspect={2.5}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 30,
          }}
        >
          <defs>
            <linearGradient id={`color-${keyY}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={1} />
              <stop offset="95%" stopColor={color} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={keyX} angle={-45} textAnchor="end" />
          <YAxis tickFormatter={(label) => abbrNumber(label)} />
          <Tooltip formatter={(number) => numbersWithCommas(number)} />
          <Area
            type="monotone"
            dataKey={keyY}
            stroke={color}
            fill={`url(#color-${keyY})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
}
