import React from 'react';
import CoinChart from '../chart/CoinChart';
import { StockData } from '../../types/coin';
import { formatPrice } from '../../utils/coinFormat';

interface Props {
  selectedCoin: string;
  selectedStock?: StockData;
}

const SelectedCoinPanel: React.FC<Props> = ({ selectedCoin, selectedStock }) => {
    if(!selectedCoin) selectedCoin = "BTC"
  return (
    <div className="bg-gray-800 rounded-2xl p-6 col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">{selectedCoin} / KRW</h2>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <span>24hr 변동률</span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
        </div>
      </div>

      <div className="w-full h-[500px] bg-gray-900 rounded-xl mb-6 flex items-start justify-center border-2 border-dashed border-gray-700 p-4">
        <CoinChart symbol={selectedCoin} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">24h 최고</span>
          <span className="font-bold">
            {selectedStock ? `${formatPrice(selectedStock.high24)} 원` : '-'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">24h 최저</span>
          <span className="font-bold">
            {selectedStock ? `${formatPrice(selectedStock.low24)} 원` : '-'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">24h 거래량</span>
          <span className="font-bold">
            {selectedStock ? `${formatPrice(selectedStock.volume24)} 원` : '-'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectedCoinPanel;