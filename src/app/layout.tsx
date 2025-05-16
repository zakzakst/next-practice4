import type { Metadata } from "next";
import { fontNotoSansJp, fontNotoSansMono } from "@/app/fonts";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import styles from "./layout.module.css";

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
        <Toaster className={styles.toaster} />
      </body>
    </html>
  );
}
