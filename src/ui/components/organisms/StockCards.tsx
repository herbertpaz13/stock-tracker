import React from "react";
import { IStock } from "../../../interfaces/IStock";
import StockCarousel from "../molecules/StockCarousel";

const StockCards: React.FC<{ stocks: IStock[] }> = ({ stocks }) => {
  return <StockCarousel stocks={stocks} />;
};

export default StockCards;
