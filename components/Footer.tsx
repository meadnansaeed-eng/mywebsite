import Link from "next/link";
import { phone, phoneHref, whatsappHref } from "@/lib/siteData";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-50 text-slate-900">
      <div
  className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-contain bg-bottom bg-repeat-x opacity-10 mix-blend-multiply"
  style={{
    backgroundImage: "url('/assets/dubai-skyline-footer.png')",
  }}
/>


      <div className="relative mx-auto grid min-h-[430px] max-w-[1500px] gap-10 px-5 py-20 md:grid-cols-[1.2fr_.7fr_.8fr] lg:px-12">

        <div>
          <div className="text-3xl font-black uppercase tracking-[0.14em]">
            <span className="text-red-500">3</span>Sixty
          </div>

          <p className="mt-2 text-xs font-black uppercase tracking-[0.32em] text-slate-500">
            Renovations
          </p>

          <p className="mt-6 max-w-xl leading-8 text-slate-600">
            Professional villa renovation, waterproofing, painting, AMC
            maintenance and technical services across Dubai.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={phoneHref}
              className="rounded-md bg-red-500 px-6 py-4 text-center text-sm font-black uppercase text-white transition hover:bg-red-600"
            >
              Call Now
            </a>

            <a
              href={whatsappHref}
              className="rounded-md border border-slate-300 bg-white px-6 py-4 text-center text-sm font-black uppercase text-slate-950 transition hover:border-red-500 hover:text-red-500"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
            Quick Links
          </h3>

          <div className="mt-5 grid gap-3 font-bold text-slate-600">
            <Link href="/" className="hover:text-red-500">Home</Link>
            <Link href="/about" className="hover:text-red-500">About</Link>
            <Link href="/services" className="hover:text-red-500">Services</Link>
            <Link href="/projects" className="hover:text-red-500">Projects</Link>
            <Link href="/contact" className="hover:text-red-500">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
            Contact
          </h3>

          <div className="mt-5 grid gap-3 font-bold text-slate-600">
            <a href={phoneHref} className="hover:text-red-500">{phone}</a>
            <a href={whatsappHref} className="hover:text-red-500">WhatsApp Support</a>
            <span>Serving all areas across Dubai</span>
            <span>Villas • Apartments • Townhouses</span>
          </div>
        </div>
      </div>

      <div className="relative border-t border-slate-200 px-5 py-5 text-center text-xs font-semibold text-slate-500">
        © 2026 3Sixty Renovations. All rights reserved.
      </div>
    </footer>
  );
}
