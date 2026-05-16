import PageHero from "@/components/PageHero";
import { phone, phoneHref, services, whatsappHref } from "@/lib/siteData";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Request a Site Visit or Quotation"
        text="Tell us what you need and our team will help with renovation, waterproofing, painting, AMC or technical maintenance support."
      />

      <section className="px-5 py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
              Get in Touch
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Speak With the Team
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Call or message us to discuss your property requirements. We
              serve villas, apartments, townhouses and commercial properties
              across Dubai.
            </p>

            <div className="mt-8 grid gap-3">
              <a
                href={phoneHref}
                className="rounded-lg bg-slate-950 p-5 font-black text-white"
              >
                {phone}
              </a>

              <a
                href={whatsappHref}
                className="rounded-lg bg-red-500 p-5 font-black text-white"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <form className="grid gap-4 rounded-xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded-md border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-red-500"
                placeholder="Your Name"
              />

              <input
                className="rounded-md border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-red-500"
                placeholder="Phone Number"
              />
            </div>

            <input
              className="rounded-md border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-red-500"
              placeholder="Email Address"
            />

            <select
              className="rounded-md border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-red-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select Service
              </option>

              {services.map((service) => (
                <option key={service.title}>{service.title}</option>
              ))}
            </select>

            <textarea
              className="min-h-36 rounded-md border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-red-500"
              placeholder="Your Message"
            />

            <button
              className="rounded-md bg-red-500 px-7 py-4 font-black uppercase text-white transition hover:bg-red-600"
              type="button"
            >
              Send Request
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
