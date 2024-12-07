import React from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import StockCard from "./StockCard";
import { IStock } from "../../../interfaces/IStock";
import EmptyStateMessage from "../molecules/EmptyStateMessage";

const carouselSettings = {
  dots: true,
  infinite: false,
  slidesToShow: 4,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const StockCarousel: React.FC<{ stocks: IStock[] }> = ({ stocks }) => {
  return (
    <Box display="flex" flexDirection="column" gap={3} paddingTop={3}>
      {stocks.length === 0 ? (
        <Box className="stock-card-empty">
          <EmptyStateMessage
            title="No stocks to display"
            subtitle="Add a new stock to start"
          />
        </Box>
      ) : (
        <Box>
          <Slider {...carouselSettings}>
            {[...stocks].reverse().map((stock) => (
              <div key={stock.symbol}>
                <StockCard stock={stock} />
              </div>
            ))}
          </Slider>
        </Box>
      )}
    </Box>
  );
};

export default StockCarousel;
