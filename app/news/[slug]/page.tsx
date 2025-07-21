import { notFound } from "next/navigation";
import { slugify } from "@/app/utils/slugify";
import type { Metadata } from "next";
import Link from "next/link";
import PublishedDate from "@/app/components/PublishedDate";
import ShareButton from "@/app/components/ShareButton";
import Image from "next/image";

async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await res.json();
  return data.articles;
}

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: { name: string };
  author: string;
  publishedAt: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }

    const data = await res.json();
    const articles = data.articles;

    const article: Article | undefined = articles.find(
      (a: Article) => slugify(`${a.title}-${a.publishedAt}`) === slug
    );

    if (!article) {
      return {
        title: "Not Found | News Hub",
        description: "Sorry, we couldn't find this news article.",
      };
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://news-blogs-projectz.vercel.app";
    const articleUrl = `${baseUrl}/news/${slug}`;

    return {
      title: article.title,
      description:
        article.description || `Reading more about: ${article.source?.name}`,
      authors: article.author ? [{ name: article.author }] : undefined,
      category: "news",
      keywords: [
        article.source?.name,
        "news",
        "article",
        ...article.title.split(" ").slice(0, 5),
      ].filter(Boolean),

      openGraph: {
        title: article.title,
        description:
          article.description || `Reading more about: ${article.source?.name}`,
        url: articleUrl,
        siteName: "News Hub",
        type: "article",
        publishedTime: article.publishedAt,
        authors: article.author ? [article.author] : undefined,
        images: article.urlToImage
          ? [
              {
                url: article.urlToImage,
                width: 1200,
                height: 630,
                alt: article.title,
              },
            ]
          : [
              {
                url: `${baseUrl}/default-news-image.jpg`,
                width: 1200,
                height: 630,
                alt: "News Hub Default Image",
              },
            ],
      },

      twitter: {
        card: "summary_large_image",
        title: article.title,
        description:
          article.description || `Reading more about: ${article.source?.name}`,
        images: article.urlToImage ? [article.urlToImage] : undefined,
        creator: article.author
          ? `@${article.author.replace(/\s+/g, "")}`
          : undefined,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error | News Hub",
      description: "An error occurred while loading this article.",
    };
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((a) => {
    const generatedSlug = slugify(`${a.title}-${a.publishedAt}`);
    return generatedSlug === slug;
  });

  if (!article) return notFound();

  return (
    <main className="min-h-screen pt-[104px]">
      <article className="max-w-4xl mx-auto px-6 py-8">
        <div className="overflow-hidden bg-black/20 backdrop-blur-sm rounded-md border border-white/10">
          {article.urlToImage && (
            <div className="relative h-64 md:h-80 w-full">
              <Image
                fill
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className="inline-flex items-center bg-indigo-900 text-gray-300 text-sm font-medium px-3 py-1.5 rounded-full">
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
                {article.source?.name || "News"}
              </span>

              {article.publishedAt && (
                <span className="text-sm text-gray-400 flex items-center">
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
                  <span className="text-gray-400">
                    <PublishedDate dateString={article.publishedAt} />
                  </span>
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 leading-tight mb-4">
              {article.title}
            </h1>

            {article.author && (
              <div className="flex items-center text-gray-400 mb-6">
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
                <span className="font-medium">
                  By <span className="text-gray-300">{article.author}</span>
                </span>
              </div>
            )}

            {article.description && (
              <div className="mb-8">
                <div className="border-l-4 border-indigo-400 p-6 rounded-r-lg">
                  <p className="text-lg leading-relaxed text-gray-400 font-normal">
                    {article.description}
                  </p>
                </div>
              </div>
            )}

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
                Read Full Article
              </a>
              <ShareButton title={article.title} />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-300 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles
              .filter((a) => a.title !== article.title)
              .slice(0, 3)
              .map((relatedArticle) => {
                console.log(relatedArticle.urlToImage);
                return (
                  <Link
                    key={relatedArticle.url}
                    href={`/news/${slugify(
                      `${relatedArticle.title}-${relatedArticle.publishedAt}`
                    )}`}
                    className="bg-black/20 backdrop-blur-sm rounded-md shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1 group"
                  >
                    {relatedArticle.urlToImage && (
                      <div className="relative overflow-hidden h-40 w-full">
                        <Image
                          fill
                          src={relatedArticle.urlToImage}
                          alt={relatedArticle.title}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-300 text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
                        {relatedArticle.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{relatedArticle.source?.name}</span>
                        {relatedArticle.publishedAt && (
                          <span>
                            <PublishedDate
                              dateString={relatedArticle.publishedAt}
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </article>
    </main>
  );
}
