import { useState } from "react";
import FinnhubService from "../../services/finnhubService";
import { IStock } from "../../interfaces/IStock";


/**
 * Custom hook for managing and updating a list of stocks.
 * @returns UseStocksReturn - The stocks and a function to add a new stock to the list.
 */
type UseStocksReturn = {
  /**
   * A list of stocks, where each stock has data like symbol, current price, change percentage, and alert price.
   */
  stocks: IStock[];

  /**
   * Adds a new stock to the list and subscribes to updates for that stock. 
   * @param string symbol - The symbol of the stock to be added (e.g., "AAPL").
   * @param number alertPrice - The alert price for triggering notifications when the stock reaches a certain price.
   * @returns Promise<void> A promise that resolves when the stock is added and updates are subscribed to.
   */
  addStock: (symbol: string, alertPrice: number) => Promise<void>;
};

const useStocks = (): UseStocksReturn => {
  // State to hold the list of stocks
  const [stocks, setStocks] = useState<IStock[]>([]);

  /**
   * Calculates the percentage change between two prices.
   * @param number oldPrice - The initial price of the stock.
   * @param number newPrice - The updated price of the stock.
   * @returns number The percentage change between the old and new prices.
   */
  const calculateChangePercent = (oldPrice: number, newPrice: number): number =>
    ((newPrice - oldPrice) / oldPrice) * 100;

  /**
   * Adds a new stock to the list and subscribes to updates for that stock. 
   * @param string symbol - The symbol of the stock to be added (e.g., "AAPL").
   * @param number alertPrice - The alert price for triggering notifications when the stock reaches a certain price.
   * @returns Promise<void> A promise that resolves when the stock is added and updates are subscribed to.
   */
  const addStock = async (symbol: string, alertPrice: number) => {
    try {
      const stockData = await FinnhubService.fetchStockData(symbol);
      const newStock: IStock = { ...stockData, alertPrice };

      // Subscribe to stock updates from Finnhub
      FinnhubService.subscribeToStockUpdates(symbol, (updatedStock) => {
        // Update the stock list with the new stock price and calculated percentage change
        setStocks((prevStocks) =>
          prevStocks.map((stock) =>
            stock.symbol === symbol
              ? {
                  ...stock,
                  currentPrice: updatedStock.currentPrice,
                  changePercent: calculateChangePercent(stock.currentPrice, updatedStock.currentPrice),
                }
              : stock
          )
        );
      });
      
      // Add the new stock to the state
      setStocks((prevStocks) => [...prevStocks, newStock]);
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  return {
    stocks,
    addStock,
  };
};

export default useStocks;