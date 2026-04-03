import { useEffect, useState } from 'react';
import { StockData } from '../types/coin';

const initialStocks: StockData[] = [
  { name: 'BTC', price: 0, change: 0, changePercent: 0, high24: 0, low24: 0, volume24: 0 },
  { name: 'ETH', price: 0, change: 0, changePercent: 0, high24: 0, low24: 0, volume24: 0 },
  { name: 'SOL', price: 0, change: 0, changePercent: 0, high24: 0, low24: 0, volume24: 0 },
  { name: 'XRP', price: 0, change: 0, changePercent: 0, high24: 0, low24: 0, volume24: 0 },
];

const symbolMap: Record<string, string> = {
  BTCUSDT: 'BTC',
  ETHUSDT: 'ETH',
  SOLUSDT: 'SOL',
  XRPUSDT: 'XRP',
};

export const useCoinTicker = () => {
  const [stocks, setStocks] = useState<StockData[]>(initialStocks);

  useEffect(() => {
    const symbols = ['btcusdt', 'ethusdt', 'solusdt', 'xrpusdt'];
    const streamNames = symbols.map((s) => `${s}@ticker`).join('/');

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streamNames}`
    );

    ws.onmessage = (event) => {
      const streamData = JSON.parse(event.data);
      const data = streamData.data;
      const displayName = symbolMap[data.s];

      if (!displayName) return;

      setStocks((prev) =>
        prev.map((stock) =>
          stock.name === displayName
            ? {
                ...stock,
                price: parseFloat(data.c),
                change: parseFloat(data.p),
                changePercent: parseFloat(data.P),
                high24: parseFloat(data.h),
                low24: parseFloat(data.l),
                volume24: parseFloat(data.v),
              }
            : stock
        )
      );
    };

    ws.onerror = (err) => {
      console.error('WebSocket 오류:', err);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { stocks };
};