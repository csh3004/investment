import React, { useMemo, useState } from 'react';
import MainHeader from '../../components/Header';
import SelectedCoinPanel from '../../components/coin/SelectedCoinPanel';
import CoinRankList from '../../components/coin/CoinRankList';
import CoinStatusTable from '../../components/coin/CoinStatusTable';
import { useCoinTicker } from '../../hooks/useCoinTicker';

const MainForm: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState('');
  const { stocks } = useCoinTicker();

  const selectedStock = useMemo(
    () => stocks.find((stock) => stock.name === selectedCoin),
    [stocks, selectedCoin]
  );

  const changeCoin = (coinName: string) => {
    setSelectedCoin(coinName);
    console.log('🔄 변경:', coinName);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <MainHeader />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <SelectedCoinPanel
          selectedCoin={selectedCoin}
          selectedStock={selectedStock}
        />

        <CoinRankList
          stocks={stocks}
          onSelectCoin={changeCoin}
        />
      </div>

      <CoinStatusTable
        stocks={stocks}
        selectedCoin={selectedCoin}
        onChangeCoin={changeCoin}
      />
    </div>
  );
};

export default MainForm;