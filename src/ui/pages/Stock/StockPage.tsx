import React from "react";
import { Container, Box } from "@mui/material";
import StockForm from "../../components/organisms/StockForm";
import StockGraph from "../../components/organisms/StockGraph";
import StockCards from "../../components/organisms/StockCards";
import useStocks from "../../hooks/useStocks";

/**
 * Page component for displaying stock information including a form to add stocks,
 * a list of stock cards, and a graph displaying the stock price changes.
 * @component
 * @returns JSX.Element A stock page with a form, stock cards, and a price comparison graph.
 */
const StockPage: React.FC = () => {
  // Custom hook for managing stocks and adding new stocks
  const { stocks, addStock } = useStocks();

  return (
    <Container maxWidth="lg" className="container">
      {/* Container for the stock cards */}
      <Box className="cardsContainer">
        <StockCards stocks={stocks} />
      </Box>
      <Box className="mainContent">
        {/* Sidebar containing the form to add a stock */}
        <Box className="sidebar">
          <StockForm onStockSelect={addStock} />
        </Box>
        {/* Section to display the stock price graph */}
        <Box className="graph">
          <StockGraph stocks={stocks} />
        </Box>
      </Box>
    </Container>
  );
};

export default StockPage;
