import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import GraphLine from "../atoms/GraphLine";
import { IStock } from "../../../interfaces/IStock";

interface GraphData {
  name: string;
  [key: string]: number | string;
}

interface StockGraphContentProps {
  stocks: IStock[];
  graphData: GraphData[];
  getStockColor: (index: number) => string;
}

const StockGraphContent: React.FC<StockGraphContentProps> = ({
  stocks,
  graphData,
  getStockColor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={graphData}
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
          <GraphLine
            key={stock.symbol}
            symbol={stock.symbol}
            index={index}
            getStockColor={getStockColor}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockGraphContent;
