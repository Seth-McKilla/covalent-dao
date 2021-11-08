import { useState } from "react";
import {
  PieChart as RePieChart,
  Cell,
  Pie,
  ResponsiveContainer,
} from "recharts";

// Mui
import Paper from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { blue, purple, green, orange, brown } from "@mui/material/colors";

// Components
import RenderActiveShape from "./RenderActiveShape";

const getColorShades = () => {
  const colorList = [blue, purple, green, orange, brown];
  const colorShades = [];

  colorList.forEach((color) => {
    colorShades.push(
      color[100],
      color[300],
      color[500],
      color[700],
      color[900]
    );
  });

  return colorShades;
};

export default function PieChartHolders({ data, title, tooltip }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const COLORS = getColorShades();

  const topHolders = data.map((item, index) => {
    return {
      address: item.address,
      value: Number(item.balance),
      fill: COLORS[index],
    };
  });

  const onPieEnter = (_, index) => setActiveIndex(index);

  return (
    <Paper elevation={10}>
      <Tooltip title={tooltip}>
        <Typography variant="h5" align="center" gutterBottom>
          {title}
        </Typography>
      </Tooltip>
      <ResponsiveContainer width="100%" aspect={3}>
        <RePieChart>
          <Pie
            style={{ zIndex: 10 }}
            activeIndex={activeIndex}
            activeShape={RenderActiveShape}
            data={topHolders}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {topHolders.map(({ fill }, index) => (
              <Cell key={`cell-${index}`} fill={fill} />
            ))}
          </Pie>
        </RePieChart>
      </ResponsiveContainer>
    </Paper>
  );
}
