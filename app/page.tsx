import Link from "next/link";
import CTA from "@/components/CTA";
import ServiceCard from "@/components/ServiceCard";
import { areas, reviews, services } from "@/lib/siteData";

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-[760px] overflow-hidden bg-slate-950 text-white md:min-h-[92vh]">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,.88),rgba(0,0,0,.58)_48%,rgba(0,0,0,.24)),linear-gradient(0deg,rgba(0,0,0,.5),transparent_45%,rgba(0,0,0,.28)),url('/assets/dubai-villa-renovation-hero.png')] bg-cover bg-center" />

        <div className="relative mx-auto grid min-h-[760px] max-w-[1500px] items-center gap-12 px-5 pb-12 pt-32 md:min-h-[92vh] lg:grid-cols-[1fr_420px] lg:px-12">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-4 text-xs font-black uppercase tracking-wide text-white/90 md:text-sm">
              <span className="h-0.5 w-8 bg-red-500" />
              Renovating Spaces. Elevating Lifestyles.
            </div>

            <h1 className="text-4xl font-black uppercase leading-tight tracking-normal sm:text-5xl md:text-7xl lg:text-8xl">
              Premium Villa Renovation & Maintenance in{" "}
              <span className="text-red-500">Dubai</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
              Complete renovation and maintenance solutions that transform
              villas and enhance every detail.
            </p>

            <div className="mt-9 grid max-w-2xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "On-Time Delivery",
                "Expert Team",
                "Premium Quality",
                "Customer Satisfaction",
              ].map((item) => (
                <div
                  key={item}
                  className="border-b border-red-500/40 pb-3 font-black uppercase leading-tight lg:border-b-0 lg:border-r"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="rounded-md bg-red-500 px-7 py-4 text-center font-extrabold uppercase transition hover:bg-red-600"
              >
                Explore Our Services
              </Link>

              <Link
                href="/contact"
                className="rounded-md border border-white bg-white/10 px-7 py-4 text-center font-extrabold uppercase transition hover:bg-white hover:text-slate-950"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <aside className="hidden rounded-xl bg-white p-8 text-slate-950 shadow-2xl lg:block">
            <h2 className="text-3xl font-black uppercase">
              Get a <span className="text-red-500">Free Quote</span>
            </h2>

            <p className="mt-2 text-slate-500">
              Share your requirements and we will get back to you shortly.
            </p>

            <div className="mt-6 grid gap-4">
              {["Your Name", "Phone Number", "Email Address", "Select Service"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-md bg-slate-100 px-4 py-4 text-sm text-slate-500"
                  >
                    {item}
                  </div>
                )
              )}

              <div className="h-28 rounded-md bg-slate-100 px-4 py-4 text-sm text-slate-500">
                Your Message
              </div>

              <Link
                href="/contact"
                className="rounded-md bg-red-500 px-6 py-4 text-center font-extrabold uppercase text-white transition hover:bg-red-600"
              >
                Send Request
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-9 grid items-stretch gap-8 lg:grid-cols-[.82fr_.48fr]">
            <div className="border-t-4 border-red-500 pt-7 lg:border-l-4 lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-red-500">
                What We Do
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                Renovation, Waterproofing & Technical Services
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                From villa upgrades to annual maintenance, every service is
                scoped clearly, supervised properly and finished with the clean
                handover customers expect.
              </p>
            </div>

            <div className="relative min-h-[260px] overflow-hidden rounded-lg bg-[linear-gradient(180deg,rgba(15,23,42,.08),rgba(15,23,42,.76)),url('/assets/dubai-villa-renovation-hero.png')] bg-cover bg-center shadow-lg">
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between border-t border-white/30 pt-4 font-black uppercase text-white">
                <span className="text-xs tracking-widest">
                  Dubai Villa Specialists
                </span>
                <span className="text-2xl">9 Services</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-12 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["10+", "Years of Experience"],
            ["500+", "Projects Completed"],
            ["100%", "Customer Satisfaction"],
            ["24/7", "Support Available"],
          ].map(([num, label]) => (
            <div key={label}>
              <strong className="block text-4xl font-black text-red-500">
                {num}
              </strong>
              <span className="mt-2 block text-sm font-bold text-slate-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 text-white lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-300">
              Annual Maintenance
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              AMC Plans for Villas & Properties
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Prevent sudden breakdowns with scheduled maintenance for AC,
              plumbing, electrical, drainage, doors, minor civil repairs and
              general property checks.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              "Scheduled preventive visits",
              "Emergency call-out support",
              "AC, plumbing and electrical checks",
              "Transparent quotation for major repairs",
            ].map((item) => (
              <div key={item} className="rounded-lg bg-white/10 p-5 font-bold">
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              Service Areas
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Serving All Areas Across Dubai
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              We provide renovation, maintenance and waterproofing services
              across Dubai. These are some of the communities we frequently
              serve.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {areas.map((area) => (
              <div
                key={area}
                className="rounded-lg bg-slate-50 p-4 font-bold text-slate-700"
              >
                ⌖ {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
                Customer Reviews
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-5xl">
                Trusted by Villa Owners Across Dubai
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Customers choose 3Sixty Renovations for clear communication,
                tidy execution and reliable handover.
              </p>
            </div>

            <div className="rounded-lg bg-white p-7 shadow-lg">
              <strong className="block text-5xl font-black text-red-500">
                4.9/5
              </strong>
              <span className="mt-2 block text-amber-500">★★★★★</span>
              <span className="mt-2 block font-bold text-slate-500">
                Based on customer feedback
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-lg border bg-white p-7 shadow-lg">
                <div className="text-amber-500">★★★★★</div>
                <p className="mt-4 text-[15px] leading-8 text-[#17345c]">
                  {review.text}
                </p>

                <div className="mt-6 flex items-center gap-3 border-t pt-5">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-red-500 font-black text-white">
                    {review.initials}
                  </div>
                  <div>
                    <strong>{review.name}</strong>
                    <span className="block text-sm font-bold text-slate-500">
                      {review.area}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
