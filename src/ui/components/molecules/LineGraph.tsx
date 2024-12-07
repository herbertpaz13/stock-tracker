import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineGraphProps {
  data: { name: string; [key: string]: string | number }[];
  stocks: { symbol: string }[];
  colors: string[];
}

const LineGraph: React.FC<LineGraphProps> = ({ data, stocks, colors }) => {
  const getStockColor = (index: number) => colors[index % colors.length];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis
          label={{
            angle: -90,
            position: "insideLeft",
            fill: "#8884d8",
            fontSize: 12,
          }}
          stroke="#8884d8"
          tickFormatter={(value) => `$${value.toFixed(2)}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1A1F2E",
            borderColor: "#8884d8",
            borderRadius: 8,
          }}
          itemStyle={{ color: "#fff" }}
          formatter={(value: number) => `$${value.toFixed(2)}`}
        />
        <Legend verticalAlign="top" height={50} iconType="circle" />
        {stocks.map((stock, index) => (
          <Line
            key={stock.symbol}
            type="monotone"
            dataKey={stock.symbol}
            stroke={getStockColor(index)}
            strokeWidth={2}
            isAnimationActive={false}
            dot={{
              r: 6,
              fill: getStockColor(index),
              stroke: "#fff",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 10,
              fill: getStockColor(index),
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
