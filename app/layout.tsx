import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "3Sixty Renovations | Villa Renovation & Maintenance Dubai",
  description:
    "Professional villa renovation, waterproofing, painting, AMC maintenance and technical services across Dubai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
