export interface Coin {
  symbol: string;
  name: string;
  description: string;
  image: string;
  market_cap: number;
  current_price: number;
  price_change_24h: number;
}
export interface Item {
  text: string;
}
export interface chartCoin {
  // name: string;
  initialInvestment: number;
  // ?percentage : number
}
