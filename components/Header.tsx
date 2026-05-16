import Link from "next/link";
import { phone, phoneHref } from "@/lib/siteData";

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
];

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 py-4 lg:px-12">
        <Link href="/" aria-label="3Sixty Renovations home" className="leading-none">
          <div className="text-[25px] font-black uppercase tracking-[0.16em] sm:text-3xl">
            <span className="text-red-500">3</span>Sixty
          </div>
          <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.3em] text-white/80 sm:text-xs">
            Renovations
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-extrabold uppercase tracking-wide lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="text-white/90 transition hover:text-white">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a href={phoneHref} className="text-sm font-bold">
            {phone}
          </a>
          <Link
            href="/contact"
            className="rounded-md bg-red-500 px-6 py-4 text-sm font-extrabold uppercase transition hover:bg-red-600"
          >
            Get a Quote
          </Link>
        </div>

        <a
          href={phoneHref}
          className="grid h-10 w-10 place-items-center rounded-full bg-red-500 font-black shadow-xl md:hidden"
          aria-label="Call 3Sixty Renovations"
        >
          C
        </a>
      </div>
    </header>
  );
}
