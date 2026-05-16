import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";

const process = [
  "Free consultation and site visit",
  "Clear scope of work and quotation",
  "Material selection and approval",
  "Professional execution by skilled team",
  "Final inspection, cleaning and handover",
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Us"
        title="Dubai Renovation Specialists Focused on Quality Handover"
        text="3Sixty Renovations provides villa renovation, waterproofing, painting and technical maintenance services with clear scopes, practical solutions and reliable supervision."
      />

      <section className="px-5 py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
              Our Approach
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              Built for Villa Owners Who Want Clarity
            </h2>
          </div>

          <div className="grid gap-6 text-lg leading-8 text-slate-600">
            <p>
              Renovation and maintenance work can become stressful when the
              scope is unclear. Our team focuses on practical site inspection,
              transparent quotation, professional execution and clean handover.
            </p>

            <p>
              Whether it is a full villa upgrade, a roof leakage issue, a
              painting project or annual maintenance, the goal is the same:
              reliable work, tidy sites and long-term confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[
            [
              "Clear Scope",
              "Every job begins with site understanding, service requirements and a practical quotation.",
            ],
            [
              "Skilled Team",
              "Experienced technicians handle civil, finishing, waterproofing and maintenance work.",
            ],
            [
              "Clean Handover",
              "We inspect, clean and review the completed scope before closing the project.",
            ],
          ].map(([title, text]) => (
            <article key={title} className="rounded-lg bg-white p-7 shadow-lg">
              <h3 className="text-2xl font-black">{title}</h3>

              <p className="mt-4 leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
            Process
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            How We Work
          </h2>

          <div className="mt-8 grid gap-4">
            {process.map((item, index) => (
              <div
                key={item}
                className="flex gap-4 rounded-lg bg-slate-50 p-5 font-bold text-slate-700"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-slate-950 text-white">
                  {index + 1}
                </span>

                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
