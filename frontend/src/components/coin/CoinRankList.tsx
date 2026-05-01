import React from 'react';
import { StockData } from '../../types/coin';
import CoinRankItem from './CoinRankItem';

interface Props {
  stocks: StockData[];
  onSelectCoin: (coinName: string) => void;
}

const CoinRankList: React.FC<Props> = ({ stocks, onSelectCoin }) => {
  return (
    <div className="text-slate-900 dark:text-slate-100 rounded-2xl p-6 space-y-4">
      <h3 className="font-bold text-lg">List</h3>

      <div className="space-y-2">
        {stocks.slice(0, 5).map((stock, index) => (
          <CoinRankItem
            key={stock.name}
            stock={stock}
            index={index}
            onClick={onSelectCoin}
          />
        ))}
      </div>
    </div>
  );
};

export default CoinRankList;