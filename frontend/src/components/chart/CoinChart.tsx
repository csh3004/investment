// CoinChart.tsx 수정
import { createChart, LineSeries } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';

interface PriceData {
  time: string;
  value: number;
}

const CoinChart: React.FC<{ symbol: string; height?: number }> = ({ symbol, height = 320 }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [priceData, setPriceData] = useState<PriceData[]>([]);

  // CoinGecko API 가격 가져오기
  const fetchPriceData = async () => {
    try {
      const coinId = symbol.toLowerCase();  // BTC → btc
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=krw&days=1&interval=hourly`
      );
      const data = await response.json();
      
      const prices = data.prices.map(([timestamp, price]: [number, number]) => ({
        time: new Date(timestamp).toISOString().split('T')[0],
        value: price,
      }));
      console.log(prices);
      setPriceData(prices.slice(-20));  // 최근 20개만
    } catch (error) {
      console.error('가격 데이터 오류:', error);
      // mock 데이터
      setPriceData([
        { time: '2026-03-27', value: 69200 },
        { time: '2026-03-28', value: 69400 },
      ]);
    }
  };

  useEffect(() => {
    fetchPriceData();  // 초기 데이터 로드
  }, [symbol]);

  useEffect(() => {
    const element = chartContainerRef.current;
    if (!element || priceData.length === 0) return;

    const chart = createChart(element, {
      width: element.clientWidth,
      height,
      layout: { 
        background: { color: '#1a1a2e' }, 
        textColor: '#d1d4dc' 
      },
      grid: { 
        vertLines: { color: '#374151' }, 
        horzLines: { color: '#374151' } 
      },
    });

    const lineSeries = chart.addSeries(LineSeries);
    lineSeries.setData(priceData);

    const handleResize = () => {
      chart.applyOptions({ width: element.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [priceData]);

  return (
    <div 
      ref={chartContainerRef} 
      className="w-full h-full rounded-xl border border-gray-700"
    />
  );
};

export default CoinChart;