import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "hoyoverse",
        // domains:
        //   "gamespot.com,gizmodo.com,kotaku.com,ign.com,hypebeast.com,slashfilm.com,animenewsnetwork.com",
        language: "en",
        sortBy: "publishedAt",
        apiKey,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Server-side fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
