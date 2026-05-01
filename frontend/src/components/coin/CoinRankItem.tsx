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
      className="
        flex items-center justify-between p-3 rounded-xl cursor-pointer border
        border-slate-200 bg-white hover:bg-slate-50
        dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-700
        transition-all
      "
    >
      <div className="flex items-center gap-3">
        <span
          className="
            flex items-center justify-center w-6 h-6 rounded-full
            bg-yellow-400 text-xs font-bold text-slate-900
            dark:bg-yellow-300 dark:text-slate-900
          "
        >
          {index + 1}
        </span>

        <span className="font-medium text-slate-900 dark:text-slate-100">
          {stock.name}
        </span>
      </div>

      <div className="text-right">
        <div className="font-bold text-slate-900 dark:text-white">
          {formatPrice(stock.price)}
        </div>
        <div className={`text-xs ${getChangeClass(stock.change)}`}>
          {stock.changePercent.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default CoinRankItem;