const POSITIVE_COLOR = "#34D399";
const NEGATIVE_COLOR = "#F87171";

/**
 * Determines the color to represent a percentage change.
 * @param changePercent - The percentage change value.
 * @returns string - The positive color if the change is greater than or equal to 0, otherwise the negative color.
 */
export const getChangePercentColor = (changePercent: number): string => {
  return changePercent >= 0 ? POSITIVE_COLOR : NEGATIVE_COLOR;
};

/**
 * Determines the border color for a card based on the current price and an optional alert price.
 * @param currentPrice - The current price of the asset.
 * @param alertPrice - (Optional) The price threshold for the alert.
 * @returns string - The positive color if the current price is above the alert price,
 *                   the negative color if it is below or equal, 
 *                   and an empty string if no alert price is provided.
 */
export const getCardBorderColor = (currentPrice: number, alertPrice?: number): string => {
  if (!alertPrice) return "";
  return currentPrice > alertPrice ? POSITIVE_COLOR : NEGATIVE_COLOR;
};