import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { CommonStoreProvider } from "@/store/Common";
import Header from "@/components/header";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "노주훈 | Frontend Engineer Portfolio",
  description: "프론트엔드 구조 설계, 성능 개선, 개발 생산성 자동화를 경험한 개발자 노주훈의 포트폴리오입니다.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={poppins.className}>
        <CommonStoreProvider>
          <Header />
          {children}
        </CommonStoreProvider>
      </body>
    </html>
  );
}
