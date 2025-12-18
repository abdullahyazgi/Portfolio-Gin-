import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";


export const metadata: Metadata = {
  title: "Portfolio",
  description: "Abdullah Yazji Portfolio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
