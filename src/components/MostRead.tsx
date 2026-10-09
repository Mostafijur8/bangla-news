import Link from "next/link";
import React from "react";

interface News {
  id: string;
  title: string;
  link: string;
}

const MostRead = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");

  const data = await res.json();

  const news: News[] = data.data;

  return (
    <div className="rounded-lg bg-gray-100 p-4">
      <h2 className="mb-4 border-b-2 border-red-600 pb-2 text-xl font-bold text-red-700">
        সর্বাধিক পঠিত
      </h2>

      <div>
        {news.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-3 border-b py-3 last:border-b-0"
          >
            {/* Number */}
            <span className="text-2xl font-bold text-red-600">{index + 1}</span>

            {/* Title */}
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold leading-6 text-gray-800 transition hover:text-red-600"
            >
              {item.title.trim()}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostRead;
