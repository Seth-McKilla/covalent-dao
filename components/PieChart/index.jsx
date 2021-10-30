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

// Components
import RenderActiveShape from "./RenderActiveShape";

export default function PieChart({ data, title }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => setActiveIndex(index);

  return (
    <Paper elevation={10} sx={{ maxWidth: 250 }}>
      <ResponsiveContainer width="100%" aspect={1}>
        <RePieChart>
          <Pie
            style={{ zIndex: 10 }}
            activeIndex={activeIndex}
            activeShape={RenderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map(({ color }, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Pie>
        </RePieChart>
      </ResponsiveContainer>
      <Typography variant="h5" align="center" gutterBottom>
        {title}
      </Typography>
    </Paper>
  );
}
