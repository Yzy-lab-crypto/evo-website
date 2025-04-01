"use client";
import { useEffect, useRef } from 'react';

interface TradingViewChartProps {
  symbol: string;
}
declare global {
  interface Window {
    TradingView: {
      widget: new (config: TradingViewConfig) => void;
    };
  }
}

interface TradingViewConfig {
  symbol: string;
  interval: string;
  timezone: string;
  theme: 'light' | 'dark';
  style: string;
  locale: string;
  toolbar_bg: string;
  enable_publishing: boolean;
  allow_symbol_change: boolean;
  container_id: string;
  height: string;
  width: string;
  fullscreen: boolean;
  autosize: boolean;
  studies: string[];
  hide_side_toolbar: boolean;
  details: boolean;
  hotlist: boolean;
  calendar: boolean;
}

export default function TradingViewChart({ symbol }: TradingViewChartProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (container.current) {
        new window.TradingView.widget({
          symbol: `BINANCE:${symbol}USDT`,
          interval: "D",
          timezone: "Asia/Shanghai",
          theme: "dark",
          style: "1",
          locale: "zh_CN",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: container.current.id,
          height: "800",
          width: "100%",
          fullscreen: true,
          autosize: true,
          studies: ["RSI@tv-basicstudies"],
          hide_side_toolbar: false,
          details: true,
          hotlist: true,
          calendar: true,
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [symbol]);

  return (
    <div className="w-full">
      <div 
        id={`tradingview_${symbol}`} 
        ref={container} 
        className="w-full h-[95dvh] min-h-[400px]"
      />
    </div>
  );
}