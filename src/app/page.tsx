import MainNews from "@/components/MainNews";
import Marque from "@/components/Marque";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

const Page = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");

  const data = await res.json();

  const sections = data.data;

  const mainNews = sections[0].articles;
  const otherSections = sections.slice(1);

  return (
    <div>
      <Marque />

      <div className="mx-auto mt-1 grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-3">
        {/* News Section */}
        <main className="lg:col-span-2">
          <MainNews news={mainNews} />

          <div className="mt-6 space-y-8">
            {otherSections.map((section) => (
              <section
                key={section.curationId}
                className="border-b-2 border-red-700 pb-5"
              >
                {/* Section Title */}
                <h2 className="mb-4 border-l-4 border-red-600 pl-3 text-xl font-bold">
                  {section.title}
                </h2>

                {/* News Cards */}
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-2">
                  {section.articles.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>

        {/* Most Read */}

        <div>
          <MostRead />
        </div>
      </div>
    </div>
  );
};

export default Page;
