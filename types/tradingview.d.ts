interface TradingViewWidget {
  symbol: string;
  interval: string;
  timezone: string;
  theme: string;
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

declare global {
  interface Window {
    TradingView: {
      widget: new (config: TradingViewWidget) => any;
    };
  }
}