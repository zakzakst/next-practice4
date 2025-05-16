import type { Metadata } from "next";
import { fontNotoSansJp, fontNotoSansMono } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "サンプルサイト",
  description: "サンプルサイトの概要",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${fontNotoSansJp.variable} ${fontNotoSansMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
