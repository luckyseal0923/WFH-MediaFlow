import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "多媒體中心｜製作申請平台",
  description: "多媒體中心製作申請表單原型。",
  openGraph: {
    title: "多媒體中心｜製作申請平台",
    description: "線上提出多媒體製作申請，清楚提供規格與聯絡方式。",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "多媒體中心製作申請平台" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "多媒體中心｜製作申請平台",
    description: "線上提出多媒體製作申請。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
