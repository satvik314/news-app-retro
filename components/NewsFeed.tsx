"use client";

import { NewsResponse } from "@/app/api/news/route";
import NewsCard from "./NewsCard";

interface NewsFeedProps {
  data: NewsResponse;
}

export default function NewsFeed({ data }: NewsFeedProps) {
  const fetchedAt = new Date(data.fetchedAt).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="space-y-4">
      {/* Results header */}
      <div className="retro-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div
            className="text-xl font-bold"
            style={{ fontFamily: "'VT323', monospace", color: "var(--amber)", textShadow: "0 0 8px var(--amber)" }}
          >
            ■ INTELLIGENCE REPORT
          </div>
          <div className="text-xs" style={{ color: "var(--green-dim)" }}>
            <span>FETCHED: </span>
            <span style={{ color: "var(--green)" }}>{fetchedAt}</span>
          </div>
        </div>

        {/* Topic */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs" style={{ color: "var(--green-dim)" }}>TOPIC:</span>
          <span
            className="text-sm px-3 py-0.5"
            style={{
              color: "var(--green)",
              border: "1px solid var(--green)",
              fontFamily: "'VT323', monospace",
              fontSize: "1.1rem",
              textShadow: "0 0 6px var(--green)",
            }}
          >
            {data.topic.toUpperCase()}
          </span>
          <span className="text-xs" style={{ color: "var(--green-dim)" }}>
            {data.articles.length} ARTICLES FOUND
          </span>
        </div>

        {/* AI Overall Summary */}
        <div
          className="p-3"
          style={{
            background: "rgba(0,10,0,0.6)",
            border: "1px solid rgba(255,176,0,0.3)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: "1rem",
                color: "var(--amber)",
                textShadow: "0 0 6px var(--amber)",
              }}
            >
              ◈ AI ANALYSIS
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--green-dim)" }}>
            {data.summary}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex gap-6 mt-3 text-xs" style={{ color: "var(--green-dim)" }}>
          <div>
            <span>SOURCES: </span>
            <span style={{ color: "var(--green)" }}>
              {[...new Set(data.articles.map((a) => a.source))].length}
            </span>
          </div>
          <div>
            <span>ARTICLES: </span>
            <span style={{ color: "var(--green)" }}>{data.articles.length}</span>
          </div>
          <div>
            <span>STATUS: </span>
            <span
              style={{ color: "var(--green)", textShadow: "0 0 4px var(--green)" }}
            >
              COMPLETE
            </span>
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <div className="space-y-3">
        {data.articles.map((article, i) => (
          <NewsCard key={i} article={article} index={i} />
        ))}
      </div>

      {/* Footer */}
      <div
        className="text-center text-xs py-3"
        style={{ color: "rgba(0,255,65,0.3)", borderTop: "1px solid rgba(0,255,65,0.15)" }}
      >
        ─── END OF TRANSMISSION ─── POWERED BY SERP API + OPENAI ───
      </div>
    </div>
  );
}
