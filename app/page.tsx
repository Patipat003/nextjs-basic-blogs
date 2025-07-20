"use client";

import { useNews } from "./contexts/NewsContext";
import Link from "next/link";

export default function Home() {
  const { articles, loading } = useNews();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="text-indigo-600 text-lg font-medium animate-pulse">
            Loading news...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-26">
      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <Link
              key={`${article.title}-${index}`}
              href={`/news/${encodeURIComponent(article.title)}`}
              className="group h-full"
            >
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 h-full rounded-xl">
                {/* Image Container */}
                <div className="relative overflow-hidden flex-shrink-0">
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
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

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-lg font-bold text-indigo-300 transition-colors duration-200 line-clamp-3 leading-tight min-h-[4.5rem]">
                    {article.title}
                  </h2>

                  <p className="text-sm text-gray-300 mt-3 line-clamp-3 leading-relaxed flex-1 min-h-[4.5rem]">
                    {article.description || "No description available..."}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-indigo-50 flex-shrink-0">
                    <p className="text-xs font-medium text-gray-300 bg-indigo-900 px-3 py-1 rounded-full truncate max-w-[60%]">
                      {article.source?.name || "News"}
                    </p>

                    <div className="flex items-center justify-center text-indigo-500 group-hover:text-indigo-700 transition-colors flex-shrink-0">
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

        {/* Empty state */}
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
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No news articles found
            </h3>
            <p className="text-gray-500">
              Please try again later or check your connection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
