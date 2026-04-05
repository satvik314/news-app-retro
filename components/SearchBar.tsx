"use client";

import { useState, FormEvent, KeyboardEvent } from "react";

interface SearchBarProps {
  onSearch: (topic: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = [
  "Artificial Intelligence",
  "Climate Change",
  "Space Exploration",
  "Cybersecurity",
  "Quantum Computing",
  "Electric Vehicles",
  "Cryptocurrency",
  "Renewable Energy",
];

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e as unknown as FormEvent);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    if (!isLoading) {
      setQuery(suggestion);
      onSearch(suggestion);
    }
  };

  return (
    <div className="retro-card p-4 mb-6">
      {/* Terminal prompt */}
      <div className="text-xs mb-2" style={{ color: "var(--green-dim)" }}>
        <span style={{ color: "var(--amber)" }}>ROOT@NEWSTERMINAL</span>
        <span style={{ color: "var(--green-dim)" }}>:~$</span>
        <span className="ml-2">search --topic</span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 flex items-center retro-input px-3 py-2">
          <span className="mr-2 shrink-0" style={{ color: "var(--amber)" }}>{">"}</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="enter search topic..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
            style={{ color: "var(--green)", fontFamily: "'Share Tech Mono', monospace" }}
            disabled={isLoading}
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="retro-btn px-5 py-2 text-sm font-bold"
        >
          {isLoading ? (
            <span className="flex items-center gap-1">
              <span className="dot-pulse">■</span>
              <span className="dot-pulse-2">■</span>
              <span className="dot-pulse-3">■</span>
            </span>
          ) : (
            "SCAN"
          )}
        </button>
      </form>

      {/* Quick suggestions */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs" style={{ color: "var(--green-dim)" }}>QUICK SCAN:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => handleSuggestion(s)}
            disabled={isLoading}
            className="text-xs px-2 py-0.5 border transition-all duration-100 disabled:opacity-40"
            style={{
              borderColor: "rgba(0, 255, 65, 0.3)",
              color: "var(--green-dim)",
              fontFamily: "'Share Tech Mono', monospace",
              background: "transparent",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.borderColor = "var(--green)";
                e.currentTarget.style.color = "var(--green)";
                e.currentTarget.style.background = "rgba(0,255,65,0.08)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 255, 65, 0.3)";
              e.currentTarget.style.color = "var(--green-dim)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
