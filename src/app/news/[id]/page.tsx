import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  firstPublished: string | null;
  lastPublished: string | null;
  source: string;
}

interface Section {
  title: string;
  curationId: string;
  curationType: string;
  link: string | null;
  count: number;
  articles: News[];
}

interface NewsResponse {
  success: boolean;
  count: number;
  cachedAt: string;
  data: Section[];
}

interface NewsDetailsPageProps {
  params: Promise<{ id: string }>;
}

const NewsDetailsPage = async ({ params }: NewsDetailsPageProps) => {
  const { id } = await params;
  const normalizedId = decodeURIComponent(id).trim();

  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data: NewsResponse = await res.json();

  if (!Array.isArray(data.data)) {
    throw new Error("Invalid news API response");
  }

  const allNews = data.data.flatMap((section) => section.articles ?? []);

  const news = allNews.find((item) => String(item.id).trim() === normalizedId);

  // Development-এ ID mismatch খুঁজে পেতে সাহায্য করবে
  if (!news) {
    console.error("News not found:", {
      requestedId: normalizedId,
      availableIds: allNews.slice(0, 10).map((item) => item.id),
    });

    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
          {news.category}
        </span>

        <h1 className="mt-4 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
          {news.title.trim()}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span className="font-semibold text-gray-700">{news.source}</span>

          {news.firstPublished && (
            <>
              <span aria-hidden="true">•</span>
              <time dateTime={news.firstPublished}>
                {new Date(news.firstPublished).toLocaleDateString("bn-BD", {
                  dateStyle: "long",
                })}
              </time>
            </>
          )}
        </div>

        {news.imageUrl && (
          <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-gray-200 shadow-sm">
            <Image
              src={news.imageUrl}
              alt={news.imageAlt || news.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">
            {news.description}
          </p>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <Link
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200"
            >
              মূল সংবাদ দেখুন →
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
};

export default NewsDetailsPage;
