"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

interface NewsContextType {
  articles: Article[];
  loading: boolean;
}

export const NewsContext = createContext<NewsContextType | undefined>(
  undefined
);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  if (!apiKey) {
    console.error("NEXT_PUBLIC_NEWS_API_KEY is not defined");
  }

  const fetchData = async () => {
    try {
      const response = await axios.get<{ articles: Article[] }>(
        "https://newsapi.org/v2/everything",
        {
          params: {
            q: "anime",
            apiKey: apiKey,
          },
        }
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value = {
    articles,
    loading,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};
