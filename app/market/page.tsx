"use client";
import React, { useState } from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import dynamic from "next/dynamic";

import "./css/Slide.css";
import { Slide } from "./components/Slide";
import ScrollBanner from "@/components/ScrollBanner";
import Link from "next/link";

const TradingViewChart = dynamic(
  () => import("@/components/TradingViewChart"),
  {
    ssr: false,
  }
);

const data = [
  {
    image: "/market-scroll/1.png",
    text: "CAKE",
    symbol: "CAKE",
  },
  {
    image: "/market-scroll/2.png",
    text: "ADA",
    symbol: "ADA",
  },
  {
    image: "/market-scroll/3.png",
    text: "EVO-AI",
    symbol: "EVO",
  },
  {
    image: "/market-scroll/4.png",
    text: "DOGE",
    symbol: "DOGE",
  },
  {
    image: "/market-scroll/5.png",
    text: "BNB",
    symbol: "BNB",
  },
];

// 添加图片预加载逻辑
const CardExample = () => {
  const ref = React.useRef(StackedCarousel);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // 添加自动轮播
  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      if (ref.current) {
        // @ts-expect-error 忽略类型错误
        ref.current.goNext();
      }
    }, 2000);
  };

  // 添加预加载逻辑
  React.useEffect(() => {
    data.forEach(item => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  React.useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (selectedSymbol) {
    return (
      <div className="h-screen bg-black">
        <button
          onClick={() => setSelectedSymbol(null)}
          className="absolute top-4 left-4 z-10 px-4 py-2 bg-blue-500 text-white rounded"
        >
          返回
        </button>
        <TradingViewChart symbol={selectedSymbol} />
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: -1 }}>
        {data.map((item, index) => (
          <div
            key={item.symbol}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "0 15%",
              backgroundRepeat: "no-repeat",
              opacity: index === activeIndex ? 1 : 0,
              transform: "translate3d(0, 0, 0)",
              visibility: index === activeIndex ? "visible" : "hidden",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(0, 0, 0, 0.80)",
              }}
            />
          </div>
        ))}
      </div>
      <div
        className="fixed inset-0 flex flex-col justify-between"
        style={{ zIndex: -1 }}
      >
        <div>
          <ScrollBanner />
        </div>
        <div>
          <ScrollBanner direction="right" />
        </div>
      </div>
      <div className="card flex  h-fit items-center">
        <div style={{ width: "100%", position: "relative" }}>
          <ResponsiveContainer
            // @ts-expect-error 忽略类型错误
            carouselRef={ref}
            render={(width, carouselRef) => {
              return (
                <StackedCarousel
                  ref={carouselRef}
                  slideComponent={(props) => (
                    <Link
                      href={`/market/${data[props.dataIndex].symbol}`}
                      style={{
                        opacity:
                          props.slideIndex === -2
                            ? 0.25 // 最左边
                            : props.position === -1
                            ? 0.5 // 左二
                            : props.slideIndex === 0
                            ? 1 // 中间
                            : props.position === 1
                            ? 0.5 // 右二
                            : 0.25, // 最右边
                      }}
                    >
                      <Slide {...props} />
                    </Link>
                  )}
                  slideWidth={window.innerWidth * 0.2125}
                  carouselWidth={width}
                  data={data}
                  maxVisibleSlide={5}
                  disableSwipe
                  customScales={[1, 0.624, 0.415, 0.3]}
                  transitionTime={450}
                  onActiveSlideChange={setActiveIndex}
                />
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CardExample;
