import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/siteData";

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="Complete Renovation & Maintenance Services in Dubai"
        text="Explore our core villa renovation, waterproofing, painting, AC, plumbing, electrical and AMC maintenance services."
      />

      <section className="px-5 py-20 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Services Built Around Real Property Needs
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Select a service for a site visit, detailed scope and quotation.
              We support one-time jobs and ongoing maintenance plans.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 text-white lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[
            "Site inspection",
            "Detailed quotation",
            "Professional handover",
          ].map((item) => (
            <div key={item} className="rounded-lg bg-white/10 p-7">
              <h3 className="text-2xl font-black">{item}</h3>

              <p className="mt-4 leading-7 text-slate-300">
                A structured step that keeps the work clear, supervised and
                easy to approve.
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </main>
  );
}
