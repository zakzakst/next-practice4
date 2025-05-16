import { Noto_Sans_JP, Noto_Sans_Mono } from "next/font/google";

export const fontNotoSansJp = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "sans-serif"],
});

export const fontNotoSansMono = Noto_Sans_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-mono",
  display: "swap",
  fallback: ["monospace"],
});
