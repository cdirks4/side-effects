import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import Navbar from "./components/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Am I the Only One",
  description: "AI side effect discovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen bg-white`}>
        <div className="scale-75 origin-top-left min-h-screen w-[133.33%]">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
