"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function SiteChrome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isInternalApp =
    pathname === "/login" || pathname === "/amc" || pathname.startsWith("/amc/");

  if (isInternalApp) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
