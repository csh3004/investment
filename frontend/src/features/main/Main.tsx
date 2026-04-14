import React, { useEffect, useMemo, useState } from 'react';
// import MainHeader from '../../components/Header'; // <-- 1. 삭제
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
    // 트뷰 렌더링 문제 해결을 위한 초기값 설정 (그대로 유지)
    setSelectedCoin('BTC');
  }, []);

  return (
    // 2. 전체 배경색과 min-h-screen은 MainLayout이 담당하므로 여기서는 padding 정도만 남깁니다.
    // mt-16 또는 pt-20 정도를 주어 Header(absolute)와 겹치지 않게 합니다.
    <div className="p-6 pt-24 text-white">

      {/* 3. MainHeader 삭제 (부모인 MainLayout에서 이미 보여줌) */}

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