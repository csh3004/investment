import React, { useEffect, useMemo, useState } from 'react';
import MainHeader from '../../components/Header';
import SelectedCoinPanel from '../../components/coin/SelectedCoinPanel';
import { useCoinTicker } from '../../hooks/useCoinTicker';

const TransationForm: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState('');
  const { stocks } = useCoinTicker();

  const selectedStock = useMemo(
    () => stocks.find((stock) => stock.name === selectedCoin),
    [stocks, selectedCoin]
  );

    const changeCoin = (coinName: string) => {
        // 코인 변경 되면 차트만 바꿔줄지 페이지 자체를 변경 해줄지는 고민좀...
        setSelectedCoin(coinName);
        console.log('🔄 변경:', coinName);
    };

  useEffect(() => {
  
  }, []);


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <MainHeader />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <SelectedCoinPanel // 얘는 다른 패널로 바꿔서 순수 차트만 보여지게.
          selectedCoin={selectedCoin}
          selectedStock={selectedStock}
        />

        {/* <CoinRankList // 이 부분 레버리지랑 금액 롱/숏 지정 및 제출 구역으로 변경
          stocks={stocks}
          onSelectCoin={changeCoin}
        /> */}
      </div>

        {/* 아래 부분 현재 자신의 포지션 가져와서 보여주기. */}
      {/* <CoinStatusTable
        stocks={stocks}
        selectedCoin={selectedCoin}
        onChangeCoin={changeCoin}
      /> */}
    </div>
  );
};

export default TransationForm;