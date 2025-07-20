"use client";

import Loading from "@/app/components/Loading";
import { useNews } from "@/app/contexts/NewsContext";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import React from "react";

const NewsDetailPage = () => {
  const { slug } = useParams();
  const { articles, loading } = useNews();
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  const article = articles.find((a) => encodeURIComponent(a.title) === slug);

  if (!article) return notFound();

  return (
    <div className="min-h-screen pt-26">
      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Featured Image */}
          {article.urlToImage && (
            <div className="relative">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
          )}

          {/* Article Header */}
          <div className="p-6 md:p-8">
            {/* Source and Date */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className="inline-flex items-center bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full">
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clipRule="evenodd"
                  />
                </svg>
                {article.source?.name || "Tesla News"}
              </span>

              {article.publishedAt && (
                <span className="text-sm text-gray-500 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {new Date(article.publishedAt).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>

            {/* Author */}
            {article.author && (
              <div className="flex items-center text-gray-600 mb-6">
                <svg
                  className="w-5 h-5 mr-2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">โดย {article.author}</span>
              </div>
            )}

            {/* Description */}
            {article.description && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
                  <p className="text-lg leading-relaxed text-gray-800 font-normal">
                    {article.description}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                อ่านต้นฉบับ
              </a>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("ลิงก์ถูกคัดลอกแล้ว!");
                  }
                }}
                className="flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                แชร์ข่าว
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-300 mb-6">
            ข่าวที่เกี่ยวข้อง
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles
              .filter((a) => a.title !== article.title)
              .slice(0, 3)
              .map((relatedArticle, index) => (
                <div
                  key={index}
                  onClick={() =>
                    router.push(
                      `/news/${encodeURIComponent(relatedArticle.title)}`
                    )
                  }
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1 group"
                >
                  {relatedArticle.urlToImage && (
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedArticle.urlToImage}
                        alt={relatedArticle.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
                      {relatedArticle.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{relatedArticle.source?.name}</span>
                      {relatedArticle.publishedAt && (
                        <span>
                          {new Date(
                            relatedArticle.publishedAt
                          ).toLocaleDateString("th-TH", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetailPage;
