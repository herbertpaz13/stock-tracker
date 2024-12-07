import React from "react";
import { Card, CardContent } from "@mui/material";
import { IStock } from "../../../interfaces/IStock";
import StockInfo from "./StockInfo";
import { getCardBorderColor } from "../../../helpers/StockHelpers";

const StockCard: React.FC<{ stock: IStock }> = ({ stock }) => {
  const { currentPrice, alertPrice } = stock;
  const cardBorderColor = getCardBorderColor(currentPrice, alertPrice);

  return (
    <Card
      className="stock-card"
      sx={{ "--card-border-color": cardBorderColor, borderRadius: "16px" }}
    >
      <CardContent>
        <StockInfo
          symbol={stock.symbol}
          name={stock.name}
          currentPrice={stock.currentPrice}
          changePercent={stock.changePercent}
          alertPrice={stock.alertPrice}
        />
      </CardContent>
    </Card>
  );
};

export default StockCard;
