import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "morning paper — daily reading log",
  description: "A personal journal for the articles I read each day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto max-w-[680px] px-5 pb-20">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
