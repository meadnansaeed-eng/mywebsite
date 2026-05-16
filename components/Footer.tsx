import Link from "next/link";
import { phone, phoneHref, whatsappHref } from "@/lib/siteData";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-10 text-sm text-slate-600 md:grid-cols-[1fr_auto_auto] lg:px-12">
        <div>
          <div className="text-2xl font-black uppercase tracking-[0.14em] text-slate-950">
            <span className="text-red-500">3</span>Sixty
          </div>
          <p className="mt-3 max-w-xl leading-7">
            Villa renovation, waterproofing, painting, AMC maintenance and technical services across Dubai.
          </p>
        </div>

        <div className="grid gap-2 font-semibold">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="grid gap-2 font-semibold">
          <a href={phoneHref}>{phone}</a>
          <a href={whatsappHref}>WhatsApp Us</a>
          <span>Serving all areas across Dubai</span>
        </div>
      </div>

      <div className="border-t px-5 py-5 text-center text-xs text-slate-500">
        © 2026 3Sixty Renovations. All rights reserved.
      </div>
    </footer>
  );
}
