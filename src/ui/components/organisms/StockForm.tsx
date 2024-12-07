import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import SelectField from "../molecules/SelectField";
import InputWithAdornment from "../atoms/InputWithAdornment";
import Button from "../atoms/Button";
import Title from "../atoms/Title";

interface StockFormProps {
  onStockSelect: (symbol: string, alertPrice: number) => void;
}

const STOCK_OPTIONS = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];

const StockForm: React.FC<StockFormProps> = ({ onStockSelect }) => {
  const [selectedStock, setSelectedStock] = useState<string>("");
  const [alertPrice, setAlertPrice] = useState<string>("");
  const [usedStocks, setUsedStocks] = useState<string[]>([]);

  const availableStocks = useMemo(
    () => STOCK_OPTIONS.filter((stock) => !usedStocks.includes(stock)),
    [usedStocks]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(alertPrice);
    if (selectedStock && !isNaN(price)) {
      onStockSelect(selectedStock, price);
      setUsedStocks((prev) => [...prev, selectedStock]);
      setSelectedStock("");
      setAlertPrice("");
    }
  };

  const isButtonDisabled =
    !selectedStock || !alertPrice || isNaN(parseFloat(alertPrice));

  return (
    <Box component="form" onSubmit={handleSubmit} className="stock-form">
      <SelectField
        label="Stock"
        value={selectedStock}
        options={availableStocks}
        onChange={setSelectedStock}
        disabled={availableStocks.length === 0}
      />
      <InputWithAdornment
        adornment="$"
        label="Price Alert"
        type="number"
        fullWidth
        value={alertPrice}
        onChange={(value) => setAlertPrice(value)}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        disabled={isButtonDisabled}
        fullWidth
        sx={{
          padding: "14px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#10B98D",
          },
        }}
      >
        Add Stock
      </Button>
      <Title text="STOCK" sx={{ marginTop: "20px", marginBottom: "-20px" }} />
      <Title text="TRACKER" />
    </Box>
  );
};

export default StockForm;
