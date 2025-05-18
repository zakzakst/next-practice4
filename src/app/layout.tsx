import type { Metadata } from "next";
import { fontNotoSansJp, fontNotoSansMono } from "@/app/fonts";
import { Footer } from "@/components/molecules/footer";
import { Header } from "@/components/molecules/header";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/providers/user/provider";
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
        <UserProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header className="sticky top-0" />
            <main className="flex-grow place-content-center">{children}</main>
            <Footer className="sticky bottom-0" />
          </div>
          <Toaster className={styles.toaster} />
        </UserProvider>
      </body>
    </html>
  );
}
