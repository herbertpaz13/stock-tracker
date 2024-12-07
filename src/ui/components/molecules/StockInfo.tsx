import React from "react";
import { Typography, Box } from "@mui/material";

interface StockInfoProps {
  symbol: string;
  name: string;
  currentPrice: number;
  changePercent: number;
  alertPrice?: number;
}

const StockInfo: React.FC<StockInfoProps> = ({
  symbol,
  name,
  currentPrice,
  changePercent,
  alertPrice,
}) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          {symbol}
        </Typography>
        <Typography variant="body2" color="gray">
          {name}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          ${currentPrice.toFixed(2)}
        </Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ color: changePercent >= 0 ? "green" : "red" }}
        >
          {changePercent >= 0 ? "+" : ""}
          {changePercent.toFixed(2)}%
        </Typography>
        {alertPrice && (
          <Typography variant="caption" color="text.secondary">
            Alert Price: ${alertPrice.toFixed(2)}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default StockInfo;
