import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-slate-950 text-white lg:grid-cols-[.9fr_1.1fr]">
      <section className="flex min-h-[420px] flex-col justify-between bg-[linear-gradient(115deg,rgba(2,6,23,.96),rgba(2,6,23,.72)),url('/assets/services/amc-maintenance.png')] bg-cover bg-center p-6 md:p-10">
        <Link href="/" className="w-fit">
          <div className="text-3xl font-black uppercase tracking-[0.14em]">
            <span className="text-red-500">3</span>Sixty
          </div>
          <div className="mt-1 text-xs font-black uppercase tracking-[0.32em] text-white/70">
            Renovations
          </div>
        </Link>

        <div className="max-w-xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300">
            AMC Operations
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            Manage every villa contract, visit and invoice from one place.
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/75">
            Built for Dubai maintenance teams handling AMC contracts, work
            orders, technicians, quotations, payments and renewal reminders.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md rounded-lg bg-white p-6 text-slate-950 shadow-2xl md:p-8">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-md bg-red-50 text-red-500">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <h2 className="text-2xl font-black">Sign in to AMC System</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
            Supabase Auth will power secure admin, technician and customer
            access in the production version.
          </p>

          <form className="mt-7 space-y-4">
            <label className="block">
              <span className="text-sm font-black text-slate-700">Email</span>
              <span className="mt-2 flex items-center gap-3 rounded-md border border-slate-200 px-4 py-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="admin@3sixtyrenovations.ae"
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                />
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-black text-slate-700">
                Password
              </span>
              <span className="mt-2 flex items-center gap-3 rounded-md border border-slate-200 px-4 py-3">
                <LockKeyhole className="h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                />
              </span>
            </label>

            <Link
              href="/amc"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-red-500 px-5 py-4 text-sm font-black uppercase text-white transition hover:bg-red-600"
            >
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </form>

          <p className="mt-6 text-center text-xs font-bold leading-5 text-slate-500">
            Demo screen only. Connect Supabase before using real customer data.
          </p>
        </div>
      </section>
    </main>
  );
}
