import React, { useEffect, useMemo, useState } from 'react';
import MainHeader from '../../components/Header';
import SelectedCoinPanel from '../../components/coin/SelectedCoinPanel';
import { useCoinTicker } from '../../hooks/useCoinTicker';
import MakeTransaction from '../../components/transaction/MakeTransaction';

const TransationForm: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState('');
  const { stocks } = useCoinTicker();

  const selectedStock = useMemo(
    () => stocks.find((stock) => stock.name === selectedCoin),
    [stocks, selectedCoin]
    );
    
    useEffect(() => {
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

        <MakeTransaction
            selectedCoin={selectedStock}
            selectedSymbol={selectedCoin}
            coinList={stocks}
            onChangeSelectedSymbol={setSelectedCoin}
        />
      </div>
    </div>
  );
};

export default TransationForm;