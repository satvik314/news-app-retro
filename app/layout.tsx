import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RETRO NEWS TERMINAL v1.0",
  description: "AI-powered retro news terminal using SerpAPI and OpenAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
