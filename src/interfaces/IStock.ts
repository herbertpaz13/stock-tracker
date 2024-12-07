
/**
 * Represents a stock and its related information.
 */
export interface IStock {
  /** The stock's unique symbol (e.g., "AAPL" for Apple). */
  symbol: string;
  /** The name of the stock or company (e.g., "Apple Inc."). */
  name: string;
  /** The current price of the stock. */
  currentPrice: number;
  /** The percentage change in the stock's price, between the previous and current prices. */
  changePercent: number;
  /** (Optional) The user-defined price threshold to trigger an alert. */
  alertPrice?: number;
}

/**
 * Defines the methods provided by finnhub service to fetch and manage stock data.
 */
export interface IStockService {
  /**
   * Fetches list of available stocks for a specific market
   * @param market - Stock exchange market (default: 'US')
   * @returns Promise<string[]> - resolving to an array of stock symbols
   */
  fetchAvailableStocks(market: string): Promise<string[]>

  /**
   * Retrieves detailed information for a specific stock
   * @param symbol - Stock symbol to fetch data for
   * @returns Promise<IStock> - resolving to stock information
   */
  fetchStockData(symbol: string): Promise<IStock>;

  /**
   * Subscribes to real-time updates for a specific stock symbol
   * @param symbol - Stock symbol to track
   * @param callback - Function to handle incoming stock updates
   */
  subscribeToStockUpdates(symbol: string, callback: (data: IStock) => void): void;

  /**
   * Removes real-time updates subscription for a stock symbol
   * @param symbol - Stock symbol to unsubscribe from
   */
  unsubscribeFromStockUpdates(symbol: string): void;
}