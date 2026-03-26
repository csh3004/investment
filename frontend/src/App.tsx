import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Position {
  _id: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  size: number;
  entryPrice: number;
  leverage: number;
  margin?: number;
  createdAt?: string;
  pnl?: number;
}

function App() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [balance, setBalance] = useState(10000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('wss://fstream.binance.com/ws/btcusdt@markPrice@1s/ethusdt@markPrice@1s');
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setPrices(prev => ({ ...prev, [data.s]: parseFloat(data.p) }));
      } catch {}
    };
    return () => ws.close();
  }, []);

  const fetchPositions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/positions');
      setPositions(res.data.positions || []);
      setBalance(parseFloat(res.data.balance || 10000));
    } catch (error) {
      console.error('포지션 로드 실패:', error);
    }
  };

  const openPosition = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/positions/open', {
        symbol: 'BTCUSDT',
        side: 'LONG',
        size: 1000,
        leverage: 20
      });
      fetchPositions();
    } catch (error) {
      console.error('포지션 오픈 실패:', error);
    }
    setLoading(false);
  };

  const closePosition = async (id: string) => {
    try {
      await axios.post(`http://localhost:5000/api/positions/${id}/close`);
      fetchPositions();
    } catch (error) {
      console.error('청산 실패:', error);
    }
  };

  useEffect(() => {
    fetchPositions(); // 초기 로드
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
          🚀 BTC/ETH 선물 모의투자
        </h1>
        <p className="text-xl opacity-80">실시간 거래 연습</p>
      </header>

      {/* 대시보드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700">
          <div className="text-3xl font-bold text-green-400">${balance.toLocaleString()}</div>
          <div className="text-sm opacity-70">💰 사용 가능 잔고</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700">
          <div className="text-2xl font-mono">${prices.BTCUSDT?.toLocaleString()}</div>
          <div className="text-sm opacity-70">₿ BTCUSDT</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700">
          <div className="text-2xl font-mono">${prices.ETHUSDT?.toLocaleString()}</div>
          <div className="text-sm opacity-70">Ξ ETHUSDT</div>
        </div>
      </div>

      {/* 포지션 오픈 */}
      <div className="mb-12">
        <button
          onClick={openPosition}
          disabled={loading}
          className="w-full max-w-md mx-auto block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
        >
          {loading ? '⏳ 생성중...' : '📈 BTC 롱 포지션 오픈 (1,000 USDT, 20배)'}
        </button>
      </div>

      {/* 포지션 테이블 */}
      <div className="bg-gray-800/30 backdrop-blur rounded-3xl p-8 border border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">📊 내 포지션 ({positions.length})</h2>
          <button 
            onClick={fetchPositions}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
          >
            🔄 새로고침
          </button>
        </div>

        {positions.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <div className="text-6xl mb-4">📈</div>
            <p>포지션이 없습니다. 위 버튼으로 시작하세요!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {positions.map(pos => (
              <div key={pos._id} className="group bg-gray-800/50 hover:bg-gray-700 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
  <div className="flex justify-between items-start mb-4">
    <div>
      <div className="text-2xl font-bold text-blue-400">{pos.symbol}</div>
      <div className="text-sm opacity-75">{pos.side} | {pos.size.toLocaleString()} USDT</div>
    </div>
    <div className="text-right">
      <div className="text-lg font-mono">${pos.entryPrice.toLocaleString()}</div>
      <div className="text-xs opacity-75">진입가</div>
    </div>
  </div>
  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
    <div className="text-lg opacity-80">레버리지: {pos.leverage}x</div>
    
    {/* 실시간 P&L 계산 */}
    {prices[pos.symbol] ? (() => {
      const currentPrice = prices[pos.symbol];
      const pnl = pos.side === 'LONG' 
        ? (currentPrice - pos.entryPrice) / pos.entryPrice * pos.size * pos.leverage
        : (pos.entryPrice - currentPrice) / pos.entryPrice * pos.size * pos.leverage;
      const pnlColor = pnl >= 0 ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20';
      return (
        <div className={`px-4 py-2 rounded-xl border font-bold text-xl ${pnlColor}`}>
          ${pnl.toFixed(2)}
        </div>
      );
    })() : (
      <div className="px-4 py-2 rounded-xl bg-gray-600 text-gray-400">
        계산중...
      </div>
    )}
    
    <button
      onClick={() => closePosition(pos._id)}
      className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold transition-colors"
    >
      청산
    </button>
  </div>
</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
