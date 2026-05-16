import CTA from "@/components/CTA";
import { services } from "@/lib/siteData";
import { notFound } from "next/navigation";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};


export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);


  if (!service) {
    notFound();
  }

  const includes = service.includes ?? [
    "Site inspection and requirement review",
    "Clear scope of work and quotation",
    "Material selection and approval",
    "Professional execution by skilled team",
    "Final inspection, cleaning and handover",
  ];

  const benefits = service.benefits ?? [
    "Clear communication from start to finish",
    "Professional team with practical experience",
    "Clean work process and reliable handover",
    "Suitable for villas, apartments and commercial properties",
  ];

  const process = service.process ?? [
    "Inspect the site and understand the requirement",
    "Prepare scope, quotation and timeline",
    "Execute work with proper supervision",
    "Review the completed work with the customer",
  ];

  const faqs = service.faqs ?? [
    {
      question: `Do you provide ${service.title} across Dubai?`,
      answer:
        "Yes, we provide this service across Dubai for villas, apartments, townhouses and commercial properties.",
    },
    {
      question: "Do you provide a quotation before starting?",
      answer:
        "Yes, we review the requirement and provide a clear quotation before work begins.",
    },
  ];

  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950 pt-32 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(115deg, rgba(0,0,0,.88), rgba(0,0,0,.58), rgba(0,0,0,.25)), url(${service.image})`,
          }}
        />

        <div className="relative mx-auto max-w-[1500px] px-5 py-24 lg:px-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-red-500">
            Service
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black uppercase leading-tight md:text-6xl">
            {service.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
            {service.heroText ?? service.text}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#service-form"
              className="rounded-md bg-red-500 px-7 py-4 text-center font-extrabold uppercase transition hover:bg-red-600"
            >
              Request Quote
            </a>

            <a
              href="/contact"
              className="rounded-md border border-white bg-white/10 px-7 py-4 text-center font-extrabold uppercase transition hover:bg-white hover:text-slate-950"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
              3Sixty Renovations
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              {service.introTitle ?? `Professional ${service.title} in Dubai`}
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {service.introText ??
                `${service.text} Our team provides site inspection, clear scope, proper material selection, professional execution and clean handover for villas, apartments and commercial properties.`}
            </p>
          </div>

          <div
            className="min-h-[360px] rounded-xl bg-cover bg-center shadow-lg"
            style={{ backgroundImage: `url(${service.image})` }}
          />
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
              What Is Included
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Scope of Work
            </h2>

            <div className="mt-8 grid gap-4">
              {includes.map((item) => (
                <div
                  key={item}
                  className="rounded-lg bg-white p-5 font-bold text-slate-700 shadow"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
              Benefits
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Why This Service Matters
            </h2>

            <div className="mt-8 grid gap-4">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="rounded-lg bg-white p-5 font-bold text-slate-700 shadow"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
            Process
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            How We Handle {service.title}
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

      <section id="service-form" className="bg-slate-950 px-5 py-20 text-white lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
              Request a Quote
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Need {service.title}?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Share your property details and our team will contact you for a
              site visit, quotation or service recommendation.
            </p>
          </div>

          <form className="grid gap-4 rounded-xl bg-white p-6 text-slate-950 shadow-lg md:p-8">
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
              value={service.title}
              readOnly
            />

            <textarea
              className="min-h-36 rounded-md border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-red-500"
              placeholder="Tell us about your property and requirement"
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

      <section className="px-5 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
            FAQs
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Common Questions
          </h2>

          <div className="mt-8 grid gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border bg-white p-6 shadow">
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
