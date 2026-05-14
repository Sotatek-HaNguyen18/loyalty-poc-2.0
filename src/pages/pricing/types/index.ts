export type AssetTabId = "gold" | "re" | "carbon";

export type GoldHistoryRow = {
  by: string;
  onChain: boolean;
  price: number;
  sjc: number;
  time: string;
};

export type ReProjectRow = {
  freq: string;
  id: string;
  lastUpdate: string;
  name: string;
  next: string;
  price: number;
  type: string;
};

export type CcProjectRow = {
  id: string;
  lastUpdate: string;
  name: string;
  price: number;
  ref: number;
  registry: string;
  type: string;
};

export type CcMarketRef = {
  color: string;
  label: string;
  ref: number;
};
