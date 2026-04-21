// components/chart/CoinChart.tsx
import React, { useEffect, useRef, memo } from 'react';

interface CoinChartProps {
  symbol: string; // 예: "BTC", "ETH"
  theme: string;
}

const CoinChart: React.FC<CoinChartProps> = ({ symbol, theme}) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!symbol || !container.current) return;

    const scriptId = 'tradingview-advanced-chart-script';
    const containerId = 'tradingview-advanced-chart-container';

    // 기존 스크립트/컨테이너 제거
    const oldScript = document.getElementById(scriptId);
    const oldContainer = document.getElementById(containerId);
    if (oldScript) oldScript.remove();
    if (oldContainer) oldContainer.remove();

    const tvSymbol = `BINANCE:${symbol.toUpperCase()}USDT`; // 예: BINANCE:BTCUSDT
    const backgroundColor = theme === 'dark' ? "#0F0F0F" : "#FFFFFF";
    const gridColor = theme === 'dark' ? "rgba(242, 242, 242, 0.06)" : "rgba(46, 46, 46, 0.06)";

    const config = {
      autosize: true,
      symbol: tvSymbol,
      interval: 'D',
      timezone: 'Asia/Seoul',
      theme: theme,
      style: '1',
      locale: 'kr',
      allow_symbol_change: true,
      hide_side_toolbar: true,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_volume: false,
      hotlist: false,
      save_image: true,
      backgroundColor: backgroundColor,
      gridColor: gridColor,
      watchlist: [],
      withdateranges: false,
      compareSymbols: [],
      studies: [],
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    script.innerHTML = JSON.stringify(config);

    container.current.innerHTML = '';
    container.current.appendChild(script);

    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'tradingview-widget-copyright';
    copyrightDiv.innerHTML = `
      <a href="https://www.tradingview.com" rel="noopener nofollow" target="_blank">
        <span class="blue-text">Track all markets</span>
      </a>
      <span class="trademark"> by TradingView</span>
    `;
    container.current.appendChild(copyrightDiv);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [symbol, theme]);

  return (
    <div
      ref={container}
      className="tradingview-widget-container"
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default memo(CoinChart);