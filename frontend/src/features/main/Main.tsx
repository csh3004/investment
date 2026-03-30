import React, { useState, useEffect } from 'react';
import CoinChart from '../../components/chart/CoinChart';
import MainHeader from '../../components/Header';

interface StockData {
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const MainForm: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [stocks, setStocks] = useState<StockData[]>([
      {name: 'BTC', price: 69250, change: 1250, changePercent: 1.84 },
      { name: 'ETH', price: 2580, change: 45, changePercent: 1.77 },
      { name: 'SOL', price: 168, change: -2.5, changePercent: -1.47 },
      { name: 'XRP', price: 0.58, change: 0.01, changePercent: 1.76 }
    ]);
  
  const [highPrice24, setHighPrice24] = useState("100000");
  const [lowPrice24, setLowPrice24] = useState("80000");
  const [tradeAmount, setTradeAmount] = useState("12345");

const changeCoin = (coinName: string) => {  // arrow function도 깔끔!
  setSelectedCoin(coinName);
  console.log('🔄 변경:', coinName);
  
  setHighPrice24(`${coinName} setHighPrice24 price (API 연동 예정)`);
  setLowPrice24(`${coinName} setLowPrice24 (API 연동 예정)`);
  setTradeAmount(`${coinName} setTradeAmount (API 연동 예정)`);
};

useEffect(() => {
  const symbols = ['btcusdt', 'ethusdt', 'solusdt', 'xrpusdt'];
  const streamNames = symbols.map(s => `${s}@ticker`).join('/');
  
  const ws = new WebSocket(
    `wss://stream.binance.com:9443/stream?streams=${streamNames}`
  );

  ws.onmessage = (event) => {
    const streamData = JSON.parse(event.data);
    const data = streamData.data; // Binance stream 구조
    
    const symbolMap: Record<string, string> = {
      BTCUSDT: 'BTC',
      ETHUSDT: 'ETH',
      SOLUSDT: 'SOL',
      XRPUSDT: 'XRP',
    };

    const symbol = data.s; // 'BTCUSDT' 등
    const displayName = symbolMap[symbol]; // 이제 타입 안전

    if (displayName) {
      setStocks(prev => {
        const updated = [...prev];
        const idx = updated.findIndex(s => s.name === displayName);
        if (idx !== -1) {
          updated[idx] = {
            name: displayName,
            price: parseFloat(data.c),
            change: parseFloat(data.p),
            changePercent: parseFloat(data.P),
          };
        }
        if(displayName === selectedCoin) {
          setHighPrice24(`${displayName} 24h 최고: ${parseInt(data.h)} 원`);
          setLowPrice24(`${displayName} 24h 최저: ${parseInt(data.l)} 원`);
          setTradeAmount(`${displayName} 24h 거래량: ${parseInt(data.v)} 원`);
        }
        return updated;
      });
    }
  };

  ws.onerror = (err) => console.error('WebSocket 오류:', err);

  return () => ws.close();
}, [selectedCoin]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const getChangeClass = (change: number) => {
    return change >= 0 ? 'text-red-500' : 'text-blue-500';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between mb-6">
          <MainHeader />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* 왼쪽 패널 */}
        <div className="bg-gray-800 rounded-2xl p-6 col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">{selectedCoin} / KRW</h2>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <span>24hr 변동률</span>
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            </div>
          </div>

          {/* 현재가 차트 영역 */}
          <div className="w-full h-[500px] bg-gray-900 rounded-xl mb-6 flex items-start justify-center border-2 border-dashed border-gray-700 p-4">
            <CoinChart symbol={selectedCoin} />
          </div>

          {/* 가격 정보 테이블 */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">24h 최고</span>
              <span className="font-bold">{highPrice24}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">24h 최저</span>
              <span className="font-bold">{lowPrice24}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">24h 거래량</span>
              <span className="font-bold">{tradeAmount}</span>
            </div>
          </div>
        </div>

        {/* 오른쪽 패널 */}
        <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-lg">List</h3>
          
          {/* 상승 순위 테이블 */}
          <div className="space-y-2">
            {stocks.slice(0, 5).map((stock, index) => (
              <div key={stock.name} onClick={() => changeCoin(stock.name)} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-all">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-900">
                    {index + 1}
                  </span>
                  <span className="font-medium">{stock.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatPrice(stock.price)}</div>
                  <div className={`text-xs ${getChangeClass(stock.change)}`}>
                    {stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 테이블 */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">코인 현황</h3>
          <select 
            value={selectedCoin} 
            onChange={(e) => changeCoin(e.target.value)}
            className="bg-gray-700 px-3 py-1 rounded text-sm"
          >
            <option>BTC</option>
            <option>ETH</option>
            <option>SOL</option>
          </select>
        </div>

        {/* 코인 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3">코인</th>
                <th className="text-right py-3">현재가</th>
                <th className="text-right py-3">변동</th>
                <th className="text-right py-3">변동률</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.name} className="border-b border-gray-700/50 hover:bg-gray-700">
                  <td className="py-3 font-medium">{stock.name}</td>
                  <td className="text-right py-3">{formatPrice(stock.price)}</td>
                  <td 
                    className={`text-right py-3 font-medium ${getChangeClass(stock.change)}`}
                  >
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                  </td>
                  <td className="text-right py-3">
                    <span className={`font-medium ${getChangeClass(stock.change)}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainForm;