import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";

const projects = [
  {
    title: "Villa Interior Upgrade",
    area: "Arabian Ranches",
    image: "/assets/services/interior-painting.png",
    text: "Surface preparation, painting, finishing touch-ups and handover cleaning for a family villa.",
  },
  {
    title: "Roof Waterproofing",
    area: "Dubai Hills",
    image: "/assets/services/roof-waterproofing.png",
    text: "Crack treatment, PU coating and terrace protection before the summer season.",
  },
  {
    title: "Pergola Roof Works",
    area: "Jumeirah",
    image: "/assets/services/pergola-garage-roof.png",
    text: "Outdoor shade structure with steel framing, roofing panels and clean finishing.",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Projects"
        title="Recent Renovation & Maintenance Work"
        text="A preview of the type of villa renovation, waterproofing and outdoor works we handle across Dubai communities."
      />

      <section className="px-5 py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-lg border bg-white shadow-lg"
            >
              <div
                className="min-h-[240px] bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image})` }}
              />

              <div className="p-7">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
                  {project.area}
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  {project.title}
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  {project.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
            Project Standards
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Every Job Needs a Clear Finish
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            We document the scope, coordinate materials, supervise execution and
            review the final result before handover.
          </p>
        </div>
      </section>

      <CTA />
    </main>
  );
}
