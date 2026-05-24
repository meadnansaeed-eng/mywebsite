import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AMC Operations | 3Sixty Renovations",
  description:
    "Internal AMC management dashboard for contracts, properties, jobs, technicians, quotations and invoices.",
};

export default function AmcLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
