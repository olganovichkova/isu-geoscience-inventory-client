import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geoscience",
  description: "Geoscience Sample Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar token={sessionStorage.getItem("id_token")} /> */}
        <div className="sticky top-0 w-full z-50 bg-zinc-950">
          <div className="flex justify-between">
            <div>
              <Link href="/" className="">
                <div className="p-3">
                  <img src="/Bengal.png" className="h-10"></img>
                </div>
              </Link>
            </div>
            <div className="text-white w-full hidden lg:block">
              <div className="flex justify-end items-center h-full">
                <div className="mr-5  cursor-pointer hover:text-lg w-40  text-center">
                  <Link href="/">HOME</Link>
                </div>
                <div className="mr-5  cursor-pointer hover:text-lg w-40 text-center">
                  <Link href="/search/filters">FILTER SEARCH</Link>
                </div>
                <div className="mr-5   cursor-pointer hover:text-lg w-40  text-center">
                  <Link href="/search/map">MAP SEARCH</Link>
                </div>
                <div className="mr-5  cursor-pointer hover:text-lg w-40 text-center">
                  <Link href="/search/term">TEXT SEARCH</Link>
                </div>
                <div
                  className={`mr-5 cursor-pointer hover:text-lg w-52 text-center`}
                >
                  <Link href="/newsample">NEW SAMPLE / UPLOAD</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
