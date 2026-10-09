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

interface NewsCardProps {
  news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <article className="overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md">
      {/* Image */}
      <Link href={`/news/${news.id}`} className="block">
        <div className="relative h-30 w-full lg:h-52">
          <Image
            src={news.imageUrl}
            alt={news.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition duration-300 hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="mb-2 inline-block text-sm font-semibold text-red-600">
          {news.category}
        </span>

        {/* Title */}
        <h2 className="line-clamp-2 text-lg font-bold leading-snug text-red-700">
          <Link
            href={`/news/${news.id}`}
            className="transition hover:text-red-500"
          >
            {news.title.trim()}
          </Link>
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
          {news.description}
        </p>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">{news.source}</span>

          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-red-600 hover:underline"
          >
            বিস্তারিত →
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
