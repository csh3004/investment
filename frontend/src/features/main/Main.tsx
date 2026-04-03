import React, { useEffect, useMemo, useState } from 'react';
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

  useEffect(() => {
    // 시발..... 이거 안해주면 처음에 번들 에러남.... 이유 모르겠음 ㅠㅠㅠ 미래의 나에게 맡긴다. ( 트뷰 렌더링 문제인듯 )
    setSelectedCoin('BTC');
  }, []);


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