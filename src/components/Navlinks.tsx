import Link from "next/link";
import React from "react";

export interface ICategory {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

export interface ICategoryResponse {
  success: boolean;
  count: number;
  cachedAt: string;
  data: ICategory[];
}

const Navlinks = async () => {
  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
      next: {
        revalidate: 60,
      },
    });

    const data: ICategoryResponse = await res.json();

    const navs = data.data ?? [];

    const filterNaves = navs.filter((item) => item.scrapable);

    return (
      <nav className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1 overflow-x-auto py-2 sm:gap-3 sm:py-3">
            {/* Home */}
            <Link
              href="/"
              className="shrink-0 whitespace-nowrap rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-blue-700 sm:px-5 sm:py-2 sm:text-base"
            >
              হোম
            </Link>

            {/* Categories */}
            {filterNaves.map((item) => (
              <Link
                key={item.slug}
                href={`/category/${item.slug}`}
                className="shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600 sm:px-5 sm:py-2 sm:text-base"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  } catch (error) {
    console.error("Categories fetch error:", error);

    return (
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Link href="/" className="font-semibold text-blue-600">
            হোম
          </Link>
        </div>
      </nav>
    );
  }
};

export default Navlinks;
