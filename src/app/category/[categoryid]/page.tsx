
import NewsCard from "@/components/NewsCard";
import { notFound } from "next/navigation";
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

interface CategoryData {
  title: string;
  data: News[];
}

interface CategoryPageProps {
  params: Promise<{
    categoryid: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categoryid } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryid}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category news");
  }

  const data: CategoryData = await res.json();

  const categoryNews = data.data;
  if(!categoryNews){
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="mb-8 flex items-center gap-3 border-b pb-4">
          <div className="h-8 w-1.5 rounded-full bg-red-600" />

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {data.title}
          </h1>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
