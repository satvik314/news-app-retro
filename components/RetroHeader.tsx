"use client";

import { useEffect, useState } from "react";

export default function RetroHeader() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
      setDate(now.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "2-digit" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-green-500/40 px-4 py-3 crt-flicker">
      <div className="max-w-5xl mx-auto">
        {/* Top status bar */}
        <div className="flex items-center justify-between text-xs mb-2" style={{ color: "var(--green-dim)" }}>
          <span>SYS: ONLINE</span>
          <span className="cursor-blink">{time}</span>
          <span>{date}</span>
        </div>

        {/* ASCII art title */}
        <pre
          className="text-center leading-tight select-none hidden sm:block"
          style={{
            fontSize: "clamp(6px, 1.2vw, 13px)",
            color: "var(--green)",
            textShadow: "0 0 8px var(--green), 0 0 16px var(--green)",
          }}
        >
{`███╗   ██╗███████╗██╗    ██╗███████╗    ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗
████╗  ██║██╔════╝██║    ██║██╔════╝    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║
██╔██╗ ██║█████╗  ██║ █╗ ██║███████╗       ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║
██║╚██╗██║██╔══╝  ██║███╗██║╚════██║       ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║
██║ ╚████║███████╗╚███╔███╔╝███████║       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝ ╚══════╝       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝`}
        </pre>

        {/* Mobile title */}
        <div
          className="text-center block sm:hidden glow-green"
          style={{ fontFamily: "'VT323', monospace", fontSize: "2.5rem" }}
        >
          NEWS TERMINAL
        </div>

        {/* Subtitle */}
        <div className="flex items-center justify-center gap-3 mt-2">
          <span style={{ color: "var(--green-dim)" }}>━━━</span>
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--amber)", textShadow: "0 0 6px var(--amber)" }}
          >
            AI-Powered Intelligence Feed
          </span>
          <span style={{ color: "var(--green-dim)" }}>━━━</span>
        </div>

        {/* Status indicators */}
        <div className="flex items-center justify-center gap-6 mt-2 text-xs" style={{ color: "var(--green-dim)" }}>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#00ff41]"></span>
            <span>SERP API</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#00ff41]"></span>
            <span>OPENAI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "var(--amber)", boxShadow: "0 0 6px var(--amber)" }}></span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </header>
  );
}
