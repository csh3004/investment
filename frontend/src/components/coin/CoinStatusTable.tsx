import React from 'react';
import { StockData } from '../../types/coin';
import { formatPrice, getChangeClass } from '../../utils/coinFormat';

interface Props {
  stocks: StockData[];
  selectedCoin: string;
  onChangeCoin: (coinName: string) => void;
}

const CoinStatusTable: React.FC<Props> = ({
  stocks,
  selectedCoin,
  onChangeCoin,
}) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">코인 현황</h3>
        <select
          value={selectedCoin}
          onChange={(e) => onChangeCoin(e.target.value)}
          className="bg-gray-700 px-3 py-1 rounded text-sm"
        >
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="SOL">SOL</option>
          <option value="XRP">XRP</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3">코인</th>
              <th className="text-right py-3">현재가</th>
              <th className="text-right py-3">변동</th>
              <th className="text-right py-3">변동률</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr
                key={stock.name}
                className="border-b border-gray-700/50 hover:bg-gray-700"
              >
                <td className="py-3 font-medium">{stock.name}</td>
                <td className="text-right py-3">{formatPrice(stock.price)}</td>
                <td
                  className={`text-right py-3 font-medium ${getChangeClass(
                    stock.change
                  )}`}
                >
                  {stock.change >= 0 ? '+' : ''}
                  {stock.change.toFixed(2)}
                </td>
                <td className="text-right py-3">
                  <span className={`font-medium ${getChangeClass(stock.change)}`}>
                    {stock.changePercent >= 0 ? '+' : ''}
                    {stock.changePercent.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinStatusTable;