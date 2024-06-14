"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";
import TopBanner from "@/components/TopBanner";
import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import Sidemenu from "@/components/Sidemenu";

const inter = Inter({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilRoot>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full text-xs bg-light">
            <Sidemenu />
            <TopBanner />
            <TopBar />
            <NavBar />
            {children}
          </div>
        </body>
      </html>
    </RecoilRoot>
  );
}
