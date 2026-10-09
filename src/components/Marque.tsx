import React from "react";
import MarqueeText from "react-marquee-text";

const Marque = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");

  const data = await res.json();
  const headlines = data.data;

  return (
    <section className="w-full sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden lg:rounded-xl border border-red-200 bg-white shadow-sm">
        <div className="flex min-h-12 items-stretch">
          {/* Latest News Badge */}
          <div className="relative z-10 flex shrink-0 items-center bg-red-600 px-4 sm:px-5">
            <span className="flex items-center gap-2 text-sm font-bold text-white sm:text-base">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              সর্বশেষ
            </span>
          </div>

          {/* Marquee */}
          <div className="flex min-w-0 flex-1 items-center bg-red-50">
            <MarqueeText
              direction="right"
              duration={10}
            
              className="px-1 lg:px-5 text-sm font-medium text-gray-800 sm:text-base"
            >
              {headlines.map((h: { title: string }, index: number) => (
                <span key={index} className="inline-flex items-center ">
                  <span className="font-bold px-2 text-red-500">•</span>
                  <span className="transition-colors hover:text-red-600">
                    {h.title}
                  </span>
                </span>
              ))}
            </MarqueeText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marque;
