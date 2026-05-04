import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SelectedCoinPanel from '../../components/coin/SelectedCoinPanel';
import { useCoinTicker } from '../../hooks/useCoinTicker';
import MakeTransaction from '../../components/transaction/MakeTransaction';
import PositionList from '../../components/transaction/PositionList';

const TransationForm: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState('');
  const { stocks } = useCoinTicker();
  const [positionRefreshKey, setPositionRefreshKey] = useState(0);

  const selectedStock = useMemo(
    () => stocks.find((stock) => stock.name === selectedCoin),
    [stocks, selectedCoin]
  );

  const handlePositionCreated = useCallback(() => {
    setPositionRefreshKey((prev) => prev + 1);
  }, []);

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
            onPositionCreated={handlePositionCreated}
        />
        <PositionList refreshKey={positionRefreshKey} />
      </div>
    </div>
  );
};

export default TransationForm;