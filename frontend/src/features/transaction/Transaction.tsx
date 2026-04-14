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

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };
    
     useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'light') {
            root.classList.remove('dark');
        } else {
            root.classList.add('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    

    useEffect(() => {
        setSelectedCoin('BTC');
    }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <MainHeader theme={theme} toggleTheme={toggleTheme} />
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