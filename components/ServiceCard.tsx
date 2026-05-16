type Service = {
  title: string;
  image: string;
  icon: string;
  text: string;
};

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:border-red-200">
      <div
        className="relative min-h-[190px] bg-cover bg-center md:min-h-[210px]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0) 35%, rgba(2,6,23,.92) 100%), url(${service.image})`,
        }}
      >
        <div className="absolute bottom-5 left-5 grid h-12 w-12 place-items-center rounded-full bg-red-500 text-lg font-black text-white shadow-xl">
          {service.icon}
        </div>

        <h3 className="absolute bottom-7 left-20 right-4 text-xl font-black leading-tight text-white md:text-2xl">
          {service.title}
        </h3>
      </div>

      <div className="flex min-h-[172px] flex-col p-6">
        <p className="text-[15px] leading-8 text-[#17345c]">
          {service.text}
        </p>

        <a
          href="/contact"
          className="mt-auto pt-6 text-sm font-black uppercase tracking-wide text-red-500"
        >
          Learn More →
        </a>
      </div>
    </article>
  );
}
