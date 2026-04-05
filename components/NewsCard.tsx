"use client";

import { NewsItem } from "@/app/api/news/route";

interface NewsCardProps {
  article: NewsItem;
  index: number;
}

export default function NewsCard({ article, index }: NewsCardProps) {
  return (
    <div
      className="retro-card retro-card-hover p-4 animate-fade-in"
      style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 text-xs shrink-0">
          <span
            className="font-bold"
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "1.1rem",
              color: "var(--amber)",
              textShadow: "0 0 6px var(--amber)",
            }}
          >
            [{String(index + 1).padStart(2, "0")}]
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs shrink-0" style={{ color: "var(--green-dim)" }}>
          <span
            className="px-2 py-0.5 text-xs"
            style={{
              border: "1px solid rgba(0,255,65,0.3)",
              color: "var(--green-dim)",
              whiteSpace: "nowrap",
              maxWidth: "120px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={article.source}
          >
            {article.source}
          </span>
          <span style={{ whiteSpace: "nowrap" }}>{article.date}</span>
        </div>
      </div>

      {/* Title */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-sm font-bold leading-snug mb-2 transition-all duration-100"
        style={{
          color: "var(--green)",
          textDecoration: "none",
          textShadow: "0 0 4px var(--green)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--amber)";
          e.currentTarget.style.textShadow = "0 0 6px var(--amber)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--green)";
          e.currentTarget.style.textShadow = "0 0 4px var(--green)";
        }}
      >
        {article.title}
      </a>

      {/* Divider */}
      <div className="my-2" style={{ borderTop: "1px solid rgba(0,255,65,0.15)" }} />

      {/* AI Summary */}
      {article.summary && (
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs px-1"
              style={{
                border: "1px solid rgba(255,176,0,0.4)",
                color: "var(--amber)",
                fontFamily: "'VT323', monospace",
                fontSize: "0.85rem",
              }}
            >
              AI SUMMARY
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--green-dim)" }}>
            {article.summary}
          </p>
        </div>
      )}

      {/* Snippet */}
      {article.snippet && article.snippet !== article.summary && (
        <div>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "rgba(0,255,65,0.45)", fontStyle: "italic" }}
          >
            {article.snippet}
          </p>
        </div>
      )}

      {/* Footer link */}
      <div className="mt-3 flex items-center justify-between">
        <div
          className="h-px flex-1 mr-3"
          style={{ background: "linear-gradient(90deg, rgba(0,255,65,0.2), transparent)" }}
        />
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs retro-btn px-3 py-1"
          style={{ textDecoration: "none" }}
        >
          READ →
        </a>
      </div>
    </div>
  );
}
