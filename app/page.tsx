"use client";

import { useState } from "react";
import RetroHeader from "@/components/RetroHeader";
import SearchBar from "@/components/SearchBar";
import LoadingScreen from "@/components/LoadingScreen";
import NewsFeed from "@/components/NewsFeed";
import { NewsResponse } from "@/app/api/news/route";

type AppState = "idle" | "loading" | "results" | "error";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [currentTopic, setCurrentTopic] = useState("");
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (topic: string) => {
    setCurrentTopic(topic);
    setAppState("loading");
    setNewsData(null);
    setErrorMessage("");

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setNewsData(data as NewsResponse);
      setAppState("results");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Unknown error occurred");
      setAppState("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <RetroHeader />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <SearchBar onSearch={handleSearch} isLoading={appState === "loading"} />

        {/* Idle state */}
        {appState === "idle" && (
          <div className="retro-card p-8 text-center">
            <pre
              className="text-xs leading-relaxed mb-4 select-none"
              style={{ color: "rgba(0,255,65,0.4)" }}
            >
{`
    ╔═══════════════════════════════════════════╗
    ║                                           ║
    ║   RETRO NEWS TERMINAL  ■  READY           ║
    ║                                           ║
    ║   > Enter a topic to begin scanning       ║
    ║   > AI analysis powered by GPT-4o-mini    ║
    ║   > News data via SerpAPI Google News     ║
    ║                                           ║
    ╚═══════════════════════════════════════════╝
`}
            </pre>
            <p
              className="text-sm cursor-blink"
              style={{ color: "var(--green-dim)" }}
            >
              AWAITING QUERY INPUT
            </p>
          </div>
        )}

        {/* Loading state */}
        {appState === "loading" && <LoadingScreen topic={currentTopic} />}

        {/* Error state */}
        {appState === "error" && (
          <div className="retro-card p-6">
            <div
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "'VT323', monospace", color: "#ff4444", textShadow: "0 0 8px #ff4444" }}
            >
              ✗ SYSTEM ERROR
            </div>
            <div
              className="p-3 mb-4 text-sm"
              style={{
                background: "rgba(20,0,0,0.8)",
                border: "1px solid rgba(255,68,68,0.4)",
                color: "#ff6666",
              }}
            >
              <span style={{ color: "#ff4444" }}>ERROR:</span> {errorMessage}
            </div>
            <p className="text-xs mb-4" style={{ color: "var(--green-dim)" }}>
              Ensure SERP_API_KEY and OPENAI_API_KEY are configured in .env.local
            </p>
            <button
              onClick={() => setAppState("idle")}
              className="retro-btn px-4 py-2 text-sm"
            >
              ↩ RETRY
            </button>
          </div>
        )}

        {/* Results */}
        {appState === "results" && newsData && <NewsFeed data={newsData} />}
      </main>

      {/* Footer */}
      <footer
        className="text-center py-3 text-xs"
        style={{
          borderTop: "1px solid rgba(0,255,65,0.2)",
          color: "rgba(0,255,65,0.3)",
        }}
      >
        RETRO NEWS TERMINAL v1.0 ■ SERP API + OPENAI ■ NEXT.JS
      </footer>
    </div>
  );
}
