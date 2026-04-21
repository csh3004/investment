import React, { useEffect, useMemo, useState } from 'react';
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
    <div className="p-6 pt-24 text-white">
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