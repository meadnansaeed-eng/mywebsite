import { phoneHref, whatsappHref } from "@/lib/siteData";

export default function CTA() {
  return (
    <section className="px-5 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-2xl bg-slate-950 p-8 text-center text-white md:p-14">
        <h2 className="text-3xl font-black md:text-5xl">
          Need Renovation or Maintenance Work?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Contact 3Sixty Renovations for a site visit, quotation or AMC
          maintenance plan for your villa or property in Dubai.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={phoneHref}
            className="rounded-md bg-white px-7 py-4 font-extrabold uppercase text-slate-950 transition hover:bg-slate-100"
          >
            Call Now
          </a>

          <a
            href={whatsappHref}
            className="rounded-md border border-white px-7 py-4 font-extrabold uppercase text-white transition hover:bg-white hover:text-slate-950"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
