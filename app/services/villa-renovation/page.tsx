import CTA from "@/components/CTA";
import { phoneHref, whatsappHref } from "@/lib/siteData";

const renovationReasons = [
  "Improve the functionality and flow of your living space",
  "Upgrade plumbing, electrical, AC and finishing quality",
  "Create a more modern and energy-conscious home",
  "Increase property value and long-term appeal",
  "Enhance the overall comfort and appearance of your villa",
];

const steps = [
  {
    title: "Consultation",
    text: "We inspect the villa, understand your goals, discuss budget and identify the renovation scope.",
  },
  {
    title: "Design & Planning",
    text: "We plan materials, finishes, work sequence and coordination between renovation trades.",
  },
  {
    title: "Execution",
    text: "Our team handles the agreed civil, MEP, painting, flooring and finishing works with supervision.",
  },
  {
    title: "Finishing",
    text: "Final painting, repairs, fixtures, clean detailing and touch-ups are completed.",
  },
  {
    title: "Inspection & Handover",
    text: "We review the finished work, clean the site and hand over the completed renovation.",
  },
];

const includedServices = [
  {
    title: "Kitchen Renovation",
    image: "/assets/services/plumbing-works.png",
    points: [
      "Cabinet, counter and fixture upgrade support",
      "Plumbing and electrical coordination",
      "Modern finishing for daily-use spaces",
    ],
  },
  {
    title: "Flooring, Tiling & Ceiling Upgrades",
    image: "/assets/services/villa-renovation.png",
    points: [
      "Flooring and tile work support",
      "Ceiling repairs and finishing",
      "Skirting, surface preparation and handover cleaning",
    ],
  },
  {
    title: "Bathroom Design & Installation",
    image: "/assets/services/plumbing-works.png",
    points: [
      "Bathroom fixture and vanity upgrade support",
      "Plumbing repair and mixer replacement",
      "Tiling, waterproofing coordination and finishing",
    ],
  },
  {
    title: "Painting",
    image: "/assets/services/interior-painting.png",
    points: [
      "Interior and exterior painting",
      "Crack filling, sanding and surface preparation",
      "Clean premium wall and ceiling finishing",
    ],
  },
  {
    title: "Villa Extension & Outdoor Works",
    image: "/assets/services/pergola-garage-roof.png",
    points: [
      "Pergola and garage roof support",
      "Exterior finishing and repair works",
      "Outdoor shade and utility improvements",
    ],
  },
  {
    title: "Doors, Windows & Minor Carpentry",
    image: "/assets/services/villa-renovation.png",
    points: [
      "Door repairs and replacement coordination",
      "Window and frame finishing support",
      "Minor carpentry and adjustment works",
    ],
  },
];

const ideas = [
  "Open-plan living areas",
  "Luxury kitchen redesign",
  "Spa-style bathroom upgrades",
  "Smart lighting and electrical improvements",
  "Outdoor living, pergola and shaded seating",
];

const faqs = [
  {
    question: "How much does villa renovation cost in Dubai?",
    answer:
      "The cost depends on villa size, scope, materials and finish level. We inspect the site and provide a clear quotation before starting.",
  },
  {
    question: "Do you handle both full and partial villa renovation?",
    answer:
      "Yes, we support full villa renovation as well as partial upgrades such as painting, bathrooms, kitchen works, flooring and outdoor improvements.",
  },
  {
    question: "Do you help with material selection?",
    answer:
      "Yes, we can guide you on practical material and finish options based on budget, durability and your preferred look.",
  },
  {
    question: "Do you provide a site visit before quotation?",
    answer:
      "Yes, a site visit helps us understand the work properly and prepare a more accurate scope and quotation.",
  },
];

export default function VillaRenovationPage() {
  return (
    <main>
      <section className="relative min-h-[720px] overflow-hidden bg-slate-950 pt-32 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,.92),rgba(0,0,0,.58)_52%,rgba(0,0,0,.22)),url('/assets/services/villa-renovation.png')] bg-cover bg-center" />

        <div className="relative mx-auto max-w-[1500px] px-5 py-24 lg:px-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-red-500">
            Villa Renovation Dubai
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-black uppercase leading-tight md:text-6xl lg:text-7xl">
            Villa Renovation in Dubai: Turning Your Dream Home into Reality
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
            Upgrade your villa with professional renovation, finishing,
            painting, flooring, bathroom, kitchen, outdoor and maintenance
            support across Dubai.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote-form"
              className="rounded-md bg-red-500 px-7 py-4 text-center font-extrabold uppercase transition hover:bg-red-600"
            >
              Get Your Estimate
            </a>

            <a
              href={whatsappHref}
              className="rounded-md border border-white bg-white/10 px-7 py-4 text-center font-extrabold uppercase transition hover:bg-white hover:text-slate-950"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
              Complete Renovation
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              Maintain the Quality, Comfort and Elegance of Your Villa
            </h2>
          </div>

          <div className="grid gap-6 text-lg leading-8 text-slate-600">
            <p>
              Dubai villas are built for comfort, privacy and lifestyle. Over
              time, interiors, bathrooms, kitchens, flooring, ceilings and
              exterior areas may need renovation to restore function and
              appearance.
            </p>
            <p>
              A well-planned villa renovation is not only about aesthetics. It
              improves comfort, daily usability and long-term property value.
              Our team manages the scope from inspection to handover with clear
              planning and professional execution.
            </p>
            <a href="#quote-form" className="font-black uppercase text-red-500">
              Book a Consultation →
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black md:text-5xl">
            Why Renovate Your Villa in Dubai?
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Villa renovation can increase comfort, improve functionality and
            refresh the overall appeal of your home.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {renovationReasons.map((item) => (
              <div key={item} className="rounded-lg bg-white p-6 font-bold text-slate-700 shadow-lg">
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black md:text-5xl">
            What Are the Steps Involved in Villa Renovation?
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-lg border bg-white p-6 shadow-lg">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-slate-950 font-black text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
            Services Include
          </p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Our Villa Renovation Services Include
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {includedServices.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-lg bg-white text-slate-950 shadow-xl">
                <div
                  className="min-h-[230px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="p-7">
                  <h3 className="text-2xl font-black">{item.title}</h3>
                  <ul className="mt-5 grid gap-3 text-slate-600">
                    {item.points.map((point) => (
                      <li key={point}>✓ {point}</li>
                    ))}
                  </ul>
                  <a href="#quote-form" className="mt-6 inline-block font-black uppercase text-red-500">
                    Get Your Estimate →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div
            className="min-h-[440px] rounded-xl bg-cover bg-center shadow-lg"
            style={{ backgroundImage: "url('/assets/services/interior-painting.png')" }}
          />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
              What Sets Us Apart
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Quality Work, Transparent Process and Practical Coordination
            </h2>
            <div className="mt-6 grid gap-4">
              {[
                "Experienced team for multi-trade renovation work",
                "Clear scope, timeline and quotation before starting",
                "Proper supervision during execution",
                "Clean finishing and handover-focused workflow",
              ].map((item) => (
                <div key={item} className="rounded-lg bg-slate-50 p-5 font-bold text-slate-700">
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black md:text-5xl">
            Popular Villa Renovation Ideas in Dubai
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {ideas.map((item, index) => (
              <div key={item} className="rounded-lg bg-white p-6 shadow-lg">
                <span className="text-sm font-black text-red-500">0{index + 1}</span>
                <h3 className="mt-3 font-black">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quote-form" className="px-5 py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
              Free Estimate
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Plan Your Villa Renovation With Us
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Tell us about your villa, community and renovation requirement.
              We will help with a site visit, scope and clear quotation.
            </p>

            <div className="mt-8 grid gap-3">
              <a href={phoneHref} className="rounded-lg bg-slate-950 p-5 font-black text-white">
                Call Now
              </a>
              <a href={whatsappHref} className="rounded-lg bg-red-500 p-5 font-black text-white">
                WhatsApp Us
              </a>
            </div>
          </div>

          <form className="grid gap-4 rounded-xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-md border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-red-500" placeholder="Your Name" />
              <input className="rounded-md border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-red-500" placeholder="Phone Number" />
            </div>
            <input className="rounded-md border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-red-500" placeholder="Villa Community / Area" />
            <input className="rounded-md border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-red-500" value="Villa Renovation" readOnly />
            <textarea className="min-h-36 rounded-md border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-red-500" placeholder="Tell us what you want to renovate" />
            <button className="rounded-md bg-red-500 px-7 py-4 font-black uppercase text-white transition hover:bg-red-600" type="button">
              Send Request
            </button>
          </form>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black md:text-5xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-8 grid gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border bg-white p-6 shadow-lg">
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
