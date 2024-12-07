import React from "react";
import { Box } from "@mui/material";
import { IStock } from "../../../interfaces/IStock";
import GraphContent from "../molecules/GraphContent";
import EmptyStateMessage from "../molecules/EmptyStateMessage";
import LineGraph from "../molecules/LineGraph";

const STOCK_COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#0088fe",
  "#00c49f",
];

const StockGraph: React.FC<{ stocks: IStock[] }> = ({ stocks }) => {
  const generateGraphData = (stocks: IStock[]) => {
    return stocks.map((stock) => ({
      name: stock.symbol,
      [stock.symbol]: stock.currentPrice,
    }));
  };

  const graphData = generateGraphData(stocks);

  return (
    <Box className="stock-graph-container">
      {stocks.length > 0 ? (
        <GraphContent
          title="Stock Price Comparison"
          renderGraph={
            <LineGraph data={graphData} stocks={stocks} colors={STOCK_COLORS} />
          }
        />
      ) : (
        <EmptyStateMessage
          title="Stock Price Comparison"
          subtitle="Add a new stock to start"
        />
      )}
    </Box>
  );
};

export default StockGraph;
