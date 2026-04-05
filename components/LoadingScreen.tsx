"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  topic: string;
}

const BOOT_LINES = [
  "Initializing search protocol...",
  "Connecting to SerpAPI nodes...",
  "Authenticating access credentials...",
  "Dispatching search query...",
  "Retrieving news feeds...",
  "Parsing article metadata...",
  "Engaging OpenAI processor...",
  "Analyzing content patterns...",
  "Generating intelligence report...",
  "Compiling results...",
];

export default function LoadingScreen({ topic }: LoadingScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setVisibleLines(0);
    setProgress(0);

    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < BOOT_LINES.length) return prev + 1;
        clearInterval(lineInterval);
        return prev;
      });
    }, 300);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 8;
      });
    }, 200);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
  }, [topic]);

  return (
    <div className="retro-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="text-lg font-bold glow-amber"
          style={{ fontFamily: "'VT323', monospace", color: "var(--amber)" }}
        >
          ⚡ SCAN IN PROGRESS
        </div>
        <div className="text-xs" style={{ color: "var(--green-dim)" }}>
          PID: {Math.floor(Math.random() * 9000) + 1000}
        </div>
      </div>

      {/* Topic display */}
      <div
        className="text-sm mb-5 px-3 py-2"
        style={{
          border: "1px solid rgba(0,255,65,0.3)",
          color: "var(--green-dim)",
          background: "rgba(0,20,0,0.5)",
        }}
      >
        <span style={{ color: "var(--amber)" }}>QUERY: </span>
        <span className="glow-green-sm" style={{ color: "var(--green)" }}>
          &ldquo;{topic}&rdquo;
        </span>
      </div>

      {/* Boot log */}
      <div
        className="font-mono text-xs mb-5 p-3 space-y-1"
        style={{
          background: "rgba(0,10,0,0.6)",
          border: "1px solid rgba(0,255,65,0.15)",
          minHeight: "180px",
        }}
      >
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="boot-line flex items-center gap-2"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span style={{ color: "var(--green-dim)" }}>[</span>
            <span
              style={{ color: "var(--green)", textShadow: "0 0 4px var(--green)" }}
              className="text-xs"
            >
              OK
            </span>
            <span style={{ color: "var(--green-dim)" }}>]</span>
            <span style={{ color: "var(--green-dim)" }}>{line}</span>
          </div>
        ))}
        {visibleLines < BOOT_LINES.length && (
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--amber)" }}>[</span>
            <span className="dot-pulse text-xs" style={{ color: "var(--amber)" }}>
              ..
            </span>
            <span style={{ color: "var(--amber)" }}>]</span>
            <span style={{ color: "var(--amber)" }}>
              {BOOT_LINES[visibleLines]}
            </span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs" style={{ color: "var(--green-dim)" }}>
          <span>PROGRESS</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div
          className="h-3 w-full"
          style={{
            background: "rgba(0,20,0,0.8)",
            border: "1px solid rgba(0,255,65,0.3)",
          }}
        >
          <div
            className="h-full transition-all duration-200"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--green-dark), var(--green))",
              boxShadow: "0 0 8px var(--green)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
