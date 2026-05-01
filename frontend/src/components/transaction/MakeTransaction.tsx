import React, { useEffect, useMemo, useState } from 'react';
import { StockData } from '../../types/coin';

interface Props {
  selectedCoin?: StockData | null;
  coinList?: StockData[];
  selectedSymbol: string;
  onChangeSelectedSymbol: (symbol: string) => void;
}

const MakeTransaction: React.FC<Props> = ({
  selectedCoin,
  coinList = [],
  selectedSymbol,
  onChangeSelectedSymbol,
}) => {
  const [entryPrice, setEntryPrice] = useState(
    selectedCoin?.price ? String(selectedCoin.price) : ''
  );
  const [quantityPercent, setQuantityPercent] = useState(50);
  const [positionType, setPositionType] = useState<'LONG' | 'SHORT'>('LONG');

  const create = () => {
    console.log("진입가격 = " + entryPrice)
    console.log("진입 포지션 = " + positionType)
    console.log("진입 수량 = " + quantityPercent)
  }

  const currentCoin = useMemo(() => {
    return coinList.find((coin) => coin.name === selectedSymbol) || selectedCoin;
  }, [coinList, selectedCoin, selectedSymbol]);

  useEffect(() => {
    if (currentCoin?.price != null) {
      setEntryPrice(String(currentCoin.price));
    }
  }, [currentCoin]);

  return (
    <div className="bg-gray-800 rounded-2xl p-6 space-y-5 w-full max-w-md">
      <h3 className="font-bold text-lg text-white">포지션 생성</h3>

      <div className="space-y-2">
        <label className="block text-sm text-gray-300">현재 코인</label>
        <div className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white">
          {currentCoin?.name || '선택된 코인 없음'}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="coin-select" className="block text-sm text-gray-300">
          코인 리스트
        </label>
        <select
          id="coin-select"
          value={selectedSymbol}
          onChange={(e) => onChangeSelectedSymbol(e.target.value)}
          className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          <option value="">코인을 선택하세요</option>
          {coinList.map((coin) => (
            <option key={coin.name} value={coin.name}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="entry-price" className="block text-sm text-gray-300">
          진입 포지션 가격
        </label>
        <input
          id="entry-price"
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
          placeholder="진입 가격 입력"
          className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="quantity-range" className="block text-sm text-gray-300">
            전체 수량
          </label>
          <span className="text-sm font-semibold text-blue-400">
            {quantityPercent}%
          </span>
        </div>

        <input
          id="quantity-range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={quantityPercent}
          onChange={(e) => setQuantityPercent(Number(e.target.value))}
          className="w-full cursor-pointer accent-blue-500"
        />

        <div className="flex justify-between text-xs text-gray-400">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-gray-300">포지션</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPositionType('LONG')}
            className={`rounded-xl px-4 py-3 font-semibold transition ${
              positionType === 'LONG'
                ? 'bg-green-600 text-white'
                : 'bg-gray-900 text-gray-300 border border-gray-700'
            }`}
          >
            롱
          </button>

          <button
            type="button"
            onClick={() => setPositionType('SHORT')}
            className={`rounded-xl px-4 py-3 font-semibold transition ${
              positionType === 'SHORT'
                ? 'bg-red-600 text-white'
                : 'bg-gray-900 text-gray-300 border border-gray-700'
            }`}
          >
            숏
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-gray-900 border border-gray-700 p-4 space-y-1 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>선택 코인</span>
          <span className="text-white">{currentCoin?.name || '-'}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>진입 가격</span>
          <span className="text-white">{entryPrice || '-'}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>수량 비율</span>
          <span className="text-white">{quantityPercent}%</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>포지션</span>
          <span
            className={`font-semibold ${
              positionType === 'LONG' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {positionType}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => create()}
        className="w-full cursor-pointer rounded-xl px-4 py-3 font-semibold transition-all duration-200 bg-gray-900 text-gray-300 border border-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:shadow-lg"
      >
        포지션 진입
      </button>
    </div>
  );
};

export default MakeTransaction;