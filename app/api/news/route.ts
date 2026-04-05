import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getJson } from "serpapi";

export interface NewsItem {
  title: string;
  source: string;
  date: string;
  snippet: string;
  url: string;
  summary: string;
}

export interface NewsResponse {
  topic: string;
  summary: string;
  articles: NewsItem[];
  fetchedAt: string;
}

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const serpApiKey = process.env.SERP_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    if (!serpApiKey) {
      return NextResponse.json({ error: "SERP_API_KEY is not configured" }, { status: 500 });
    }
    if (!openAiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY is not configured" }, { status: 500 });
    }

    // Search for news using SerpAPI
    const searchResults = await getJson({
      engine: "google_news",
      q: topic,
      api_key: serpApiKey,
      num: 10,
      hl: "en",
      gl: "us",
    });

    const rawArticles = (searchResults.news_results || []).slice(0, 8);

    if (rawArticles.length === 0) {
      return NextResponse.json({ error: "No news found for this topic" }, { status: 404 });
    }

    // Prepare article data
    const articles: NewsItem[] = rawArticles.map((article: Record<string, unknown>) => ({
      title: (article.title as string) || "Untitled",
      source: (typeof article.source === "object" && article.source !== null
        ? (article.source as Record<string, string>).name
        : article.source as string) || "Unknown Source",
      date: (article.date as string) || "Unknown Date",
      snippet: (article.snippet as string) || "",
      url: (article.link as string) || "#",
      summary: "",
    }));

    // Use OpenAI to summarize each article and create an overall summary
    const openai = new OpenAI({ apiKey: openAiKey });

    const articleTexts = articles
      .map((a, i) => `[${i + 1}] ${a.title}\nSource: ${a.source}\nDate: ${a.date}\nSnippet: ${a.snippet}`)
      .join("\n\n");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a news analyst. Given news articles, provide: 1) A 2-3 sentence overall summary of the topic, 2) A brief 1-sentence summary for each article. Respond in JSON format.",
        },
        {
          role: "user",
          content: `Topic: "${topic}"\n\nArticles:\n${articleTexts}\n\nRespond with JSON in this exact format:\n{\n  "overallSummary": "...",\n  "articleSummaries": ["summary1", "summary2", ...]\n}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content || "{}");

    // Merge AI summaries into articles
    const enrichedArticles = articles.map((article, i) => ({
      ...article,
      summary: aiResponse.articleSummaries?.[i] || article.snippet,
    }));

    const response: NewsResponse = {
      topic: topic.trim(),
      summary: aiResponse.overallSummary || `Latest news about ${topic}`,
      articles: enrichedArticles,
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("News API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
