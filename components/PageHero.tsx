type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
};

export default function PageHero({ eyebrow, title, text }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-32 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,.88),rgba(0,0,0,.56)),url('/assets/dubai-villa-renovation-hero.png')] bg-cover bg-center" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 lg:px-12">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-red-500">
          {eyebrow}
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-black uppercase leading-tight md:text-6xl">
          {title}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
          {text}
        </p>
      </div>
    </section>
  );
}
