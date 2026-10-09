import Image from "next/image";
import Link from "next/link";
import React from "react";

interface News {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string;
  source: string;
}

interface MainNewsProps {
  news: News[];
}

const MainNews = ({ news }: MainNewsProps) => {
  if (!news.length) {
    return <p>কোনো নিউজ পাওয়া যায়নি।</p>;
  }

  const [firstNews, ...otherNews] = news;

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Featured News */}
        <article className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg lg:col-span-3">
          <Link href={`/news/${firstNews.id}`} className="block">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={firstNews.imageUrl}
                alt={firstNews.imageAlt}
                fill
                priority
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5">
                <span className="mb-2 inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                  {firstNews.category}
                </span>

                <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl">
                  {firstNews.title.trim()}
                </h2>
              </div>
            </div>
          </Link>

          <div className="p-5">
            <p className="line-clamp-3 text-sm leading-6 text-gray-600 sm:text-base">
              {firstNews.description}
            </p>

            <Link
              href={`/news/${firstNews.id}`}
              className="mt-4 inline-block font-semibold text-red-600 transition hover:text-red-800"
            >
              বিস্তারিত পড়ুন →
            </Link>
          </div>
        </article>

        {/* Latest News */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between border-b pb-3">
            <h2 className="text-xl font-bold">সর্বশেষ খবর</h2>
          </div>

          <div className="space-y-4">
            {otherNews.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="group flex gap-4 rounded-xl border bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* News Image */}
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="128px"
                  />
                </div>

                {/* News Content */}
                <div className="min-w-0">
                  <h3 className="line-clamp-3 text-sm font-bold leading-5 text-gray-800 transition group-hover:text-red-600 sm:text-base">
                    {item.title.trim()}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500">{item.source}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainNews;
