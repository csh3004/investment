import React from 'react';
import { StockData } from '../../types/coin';
import { formatPrice, getChangeClass } from '../../utils/coinFormat';

interface Props {
  stock: StockData;
  index: number;
  onClick: (coinName: string) => void;
}

const CoinRankItem: React.FC<Props> = ({ stock, index, onClick }) => {
  return (
    <div
      onClick={() => onClick(stock.name)}
      className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-900">
          {index + 1}
        </span>
        <span className="font-medium">{stock.name}</span>
      </div>

      <div className="text-right">
        <div className="font-bold">{formatPrice(stock.price)}</div>
        <div className={`text-xs ${getChangeClass(stock.change)}`}>
          {stock.changePercent.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default CoinRankItem;