import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CommonStoreProvider } from "@/store/Common";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RohJooHoon - Portfolio",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CommonStoreProvider>
      <html lang="kr">
        <body className={inter.className}>{children}</body>
      </html>
    </CommonStoreProvider>
  );
}
