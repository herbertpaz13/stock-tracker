import axios from 'axios';
import { IStock, IStockService } from '../interfaces/IStock';

/**
 * FinnhubService provides stock-related services using the Finnhub API
 * This service handles:
 * - Fetching available stocks
 * - Retrieving individual stock data
 * - Real-time stock price updates via WebSocket
 */
class FinnhubService implements IStockService {
  // API key stored as an environment variable for security
  private apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
  private baseUrl = 'https://finnhub.io/api/v1';
  private socket: WebSocket | null = null;
  private subscriptions: Map<string, (data: IStock) => void> = new Map();

  constructor() {
    // Initialize WebSocket connection on service instantiation
    this.initializeWebSocket();
  }
  
  /**
   * Establishes and manages WebSocket connection for real-time stock updates
   * - Connects to Finnhub WebSocket endpoint
   * - Handles connection, message, error, and reconnection scenarios
   */
  private initializeWebSocket(): void {
    this.socket = new WebSocket(`wss://ws.finnhub.io?token=${this.apiKey}`);

    // Event handler for successful connection
    this.socket.addEventListener('open', () => {
      this.subscriptions.forEach((_, symbol) => {
        this.socket?.send(JSON.stringify({'type': 'subscribe', 'symbol': symbol}));
      });
    });

    // Event handler for incoming messages
    this.socket.addEventListener('message', (event) => {
      try {
        
        const data = JSON.parse(event.data);
        if (data.type === 'trade' && data.data && data.data.length > 0) {
          const symbol = data.data[0].s;
          const callback = this.subscriptions.get(symbol);
          
          // Trigger callback for subscribed symbols
          if (callback) {
            callback({
              symbol,
              name: symbol,
              currentPrice: data.data[0].p,
              changePercent: 0,
            });
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    // Event handler for connection closure
    this.socket.addEventListener('close', () => {
      setTimeout(() => this.initializeWebSocket(), 5000);
    });

    // Event handler for WebSocket errors
    this.socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }


  /**
   * Fetches list of available stocks for a specific market
   * @param market - Stock exchange market (default: 'US')
   * @returns Promise<string[]> - resolving to an array of stock symbols
   */
  async fetchAvailableStocks(market: string = 'US'): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/stock/symbol?exchange=${market}&token=${this.apiKey}`);

      return response.data.map((stock: { symbol: string }) => stock.symbol);

    } catch (error) {
      console.error('Error fetching available stocks:', error);
      throw error;
    }
  }

  /**
   * Retrieves detailed information for a specific stock
   * @param symbol - Stock symbol to fetch data for
   * @returns Promise<IStock> - resolving to stock information
   */
  async fetchStockData(symbol: string): Promise<IStock> {
    try {
      const [quoteResponse, profileResponse] = await Promise.all([
        axios.get(`${this.baseUrl}/quote?symbol=${symbol}&token=${this.apiKey}`),
        axios.get(`${this.baseUrl}/stock/profile2?symbol=${symbol}&token=${this.apiKey}`)
      ]);

      return {
        symbol,
        name: profileResponse.data.name,
        currentPrice: quoteResponse.data.c,
        changePercent: quoteResponse.data.dp,
      };
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  }

  /**
   * Subscribes to real-time updates for a specific stock symbol
   * @param symbol - Stock symbol to track
   * @param callback - Function to handle incoming stock updates
   */
  subscribeToStockUpdates(symbol: string, callback: (data: IStock) => void): void {
    this.subscriptions.set(symbol, callback);

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({'type': 'subscribe', 'symbol': symbol}));
    }
  }

  /**
   * Removes real-time updates subscription for a stock symbol
   * @param symbol - Stock symbol to unsubscribe from
   */
  unsubscribeFromStockUpdates(symbol: string): void {
    this.subscriptions.delete(symbol);

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({'type': 'unsubscribe', 'symbol': symbol}));
    }
  }
}

export default new FinnhubService();