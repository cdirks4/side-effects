import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import Navbar from "./components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} h-screen bg-white`}>
          <Navbar />
          <div className="origin-top-left min-h-screen pt-16">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
