import React from "react";
import { Line } from "recharts";

interface GraphLineProps {
  symbol: string;
  index: number;
  getStockColor: (index: number) => string;
}

const GraphLine: React.FC<GraphLineProps> = ({
  symbol,
  index,
  getStockColor,
}) => {
  const color = getStockColor(index);

  return (
    <Line
      key={symbol}
      type="monotone"
      dataKey={symbol}
      stroke={color}
      strokeWidth={2}
      isAnimationActive={false}
      dot={{
        r: 10,
        fill: color,
        stroke: "#fff",
        strokeWidth: 2,
      }}
      activeDot={{
        r: 10,
        fill: color,
        stroke: "#fff",
        strokeWidth: 2,
      }}
    />
  );
};

export default GraphLine;
