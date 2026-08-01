import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TopArk | Your Game. Your World.",
  description:
    "TopArk connects American football athletes with professional teams internationally. Verified, real-time, direct — no agency in between.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
