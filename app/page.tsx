import Link from "next/link";
import { slugify } from "./utils/slugify";
import BackToTop from "./components/BackToTop";
import Image from "next/image";
import SearchInput from "./components/SearchInput";

interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  return data.articles;
}

interface HomeProps {
  searchParams: { q?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const articles = await getArticles();
  const query = searchParams.q || "";

  const filteredArticles = query
    ? articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.description?.toLowerCase().includes(query.toLowerCase())
      )
    : articles;

  return (
    <>
      <div className="min-h-screen">
        <BackToTop />
        <div className="flex justify-center">
          <SearchInput initialValue={query} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0.5">
            {filteredArticles.map((article) => (
              <Link
                key={article.url}
                href={`/news/${slugify(
                  `${article.title}-${article.publishedAt}`
                )}`}
                className="group h-full"
              >
                <div className="bg-black/20 backdrop-blur-sm border border-white/10 h-full">
                  <div className="relative overflow-hidden flex-shrink-0 h-48 w-full">
                    {article.urlToImage ? (
                      <Image
                        fill
                        unoptimized
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center">
                        <div className="text-indigo-400">
                          <svg
                            className="w-16 h-16"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col group-hover:scale-105 transition-transform duration-500">
                    <h2 className="group-hover:text-indigo-400 text-lg font-bold text-gray-300 transition-colors duration-200 line-clamp-3 leading-tight min-h-[4.5rem]">
                      {article.title}
                    </h2>

                    <p className="text-sm text-gray-400 mt-3 line-clamp-3 leading-relaxed flex-1 min-h-[4.5rem]">
                      {article.description || "No description available..."}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-indigo-900 flex-shrink-0">
                      <p className="text-xs font-medium text-gray-300 bg-indigo-900 px-3 py-1 rounded-full truncate max-w-[60%]">
                        {article.source?.name || "News"}
                      </p>

                      <div className="flex items-center justify-center text-gray-400 group-hover:text-indigo-400 transition-colors flex-shrink-0">
                        <span className="text-xs font-medium mr-0.5">
                          Read more
                        </span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No results found */}
          {filteredArticles.length === 0 && query && (
            <div className="text-center py-16">
              <div className="text-indigo-200 mb-6">
                <svg
                  className="w-24 h-24 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No articles found for &quot;{query}&quot;
              </h3>
              <p className="text-gray-400">
                Try different keywords or{" "}
                <Link href="/" className="text-indigo-400 hover:underline">
                  view all articles
                </Link>
              </p>
            </div>
          )}

          {/* No articles at all */}
          {articles.length === 0 && (
            <div className="text-center py-16">
              <div className="text-indigo-200 mb-6">
                <svg
                  className="w-24 h-24 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No news articles found
              </h3>
              <p className="text-gray-400">
                Please try again later or check your connection.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
