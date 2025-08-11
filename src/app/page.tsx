"use client";
import * as React from "react";
import Image from "next/image";

function useFadeUp() {
  React.useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-animate='fade-up']"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://detailflow.vercel.app";
  const priceStarter = process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "";
  const pricePro = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || "";
  const priceEnterprise = process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || "";
  const [mockupReady, setMockupReady] = React.useState(false);
  useFadeUp();

  const handleCheckout = (priceId: string) => {
    const url = `${appUrl}/api/payments/checkout?price_id=${encodeURIComponent(priceId)}`;
    window.location.href = url;
  };

  const steps = [
    {
      number: "01",
      title: "Frictionless booking",
      description: "Customers book in under 3 minutes from any device — no phone tag.",
    },
    {
      number: "02",
      title: "Smart scheduling",
      description: "Prevent overbooking with dynamic slots and travel-aware routing.",
    },
    {
      number: "03",
      title: "Instant payments",
      description: "Get paid on time with checkout links, invoices, and customer portal.",
    },
    {
      number: "04",
      title: "Automated follow-ups",
      description: "Win repeat business with hands-off reminders and reviews.",
    },
  ];
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-step-section]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index || 0);
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero: pure white, minimalist */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-24 lg:py-32 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">Run your mobile service business on autopilot</h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">DetailFlow is the white-label booking and payments platform built for mobile service operators — bookings, scheduling, payments, and messaging in one place.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button onClick={() => handleCheckout(priceStarter)} className="h-12 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition transform-gpu hover:scale-[1.02] shadow-sm hover:shadow-md">Start Free Trial</button>
              <a href={`${appUrl}/signin`} className="h-12 px-6 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition flex items-center">Sign in</a>
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl border border-gray-200 shadow-sm overflow-hidden" style={{ transform: mockupReady ? "scale(1)" : "scale(0.95)", opacity: mockupReady ? 1 : 0, transition: "opacity .6s ease .2s, transform .6s ease .2s", }}>
              <Image src="/window.svg" alt="App mockup" fill priority sizes="(min-width:1024px) 560px, 100vw" onLoadingComplete={() => setMockupReady(true)} className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12">
          <div className="text-sm text-gray-500 uppercase tracking-wider text-center">Trusted by modern mobile service brands</div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
            {["globe.svg", "file.svg", "window.svg"].map((src) => (
              <div key={src} className="w-[120px] opacity-60 grayscale hover:opacity-100 transition">
                <Image src={`/${src}`} alt="Partner logo" width={120} height={28} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pinned scrollytelling */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-[64px]">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left steps */}
          <div className="lg:sticky lg:top-20 self-start">
            <div className="space-y-10">
              {steps.map((s, i) => (
                <div key={s.title} className="flex items-start gap-4" data-animate="fade-up" style={{ transition: "opacity .4s ease-out, transform .6s ease-out" }}>
                  <div className="h-10 w-1 rounded-full bg-gray-200 overflow-hidden">
                    <div className={`h-full w-full ${activeStep === i ? "bg-blue-600" : "bg-transparent"}`} />
                  </div>
                  <div className={`flex-1 transition-opacity duration-300 ${activeStep === i ? "opacity-100" : "opacity-30"}`}>
                    <div className="text-blue-600 font-mono text-sm">{s.number}</div>
                    <div className="text-2xl font-semibold mb-3">{s.title}</div>
                    <div className="text-gray-600 leading-relaxed">{s.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right device with crossfade screens */}
          <div className="lg:sticky lg:top-20 self-start">
            <div className="relative w-full aspect-[9/16] rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {steps.map((_, i) => (
                <div key={i} className="absolute inset-0 will-change-transform" style={{ opacity: activeStep === i ? 1 : 0, transform: activeStep === i ? "scale3d(1.03,1.03,1)" : "scale3d(1,1,1)", transition: "opacity .3s ease, transform .3s ease" }}>
                  <Image src="/window.svg" alt="Screen" fill sizes="(min-width:1024px) 420px, 100vw" className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-[64px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "White-label ready", desc: "Your brand, your domain, your customer experience.", icon: IconShield },
            { title: "Realtime ops", desc: "Live updates for bookings, payments, and messages.", icon: IconBolt },
            { title: "Smart pricing", desc: "Dynamic pricing to lift revenue by 25–40%.", icon: IconChart },
            { title: "Customer portal", desc: "Self-serve reschedules, invoices, and payments.", icon: IconUser },
            { title: "Messaging automation", desc: "Reminders, follow-ups, and review requests.", icon: IconMail },
            { title: "Insights", desc: "Track KPIs that matter and export your data.", icon: IconGraph },
          ].map((f) => (
            <div key={f.title} className="group">
              <div className="text-blue-600"><f.icon className="h-12 w-12 transition-transform group-hover:scale-110" /></div>
              <div className="mt-4 text-lg font-semibold text-gray-900">{f.title}</div>
              <div className="mt-2 text-sm text-gray-600">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-[64px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Starter", price: "£49", popular: false, pid: priceStarter, features: ["Unlimited bookings", "Invoices & payments", "Email support"] },
            { name: "Pro", price: "£99", popular: true, pid: pricePro, features: ["All Starter", "Automation suite", "Branding & domain"] },
            { name: "Enterprise", price: "£199", popular: false, pid: priceEnterprise, features: ["All Pro", "Priority support", "Custom SLAs"] },
          ].map((p) => (
            <div key={p.name} className="relative bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition">
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Most popular</div>
              )}
              <div className="text-lg font-semibold text-gray-900">{p.name}</div>
              <div className="mt-2 text-4xl font-bold text-gray-900">{p.price}<span className="text-gray-500 text-base">/month</span></div>
              <ul className="mt-4 space-y-2">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-gray-700">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-blue-600 text-blue-600">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => handleCheckout(p.pid)} className={`mt-6 w-full h-12 rounded-lg ${p.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-gray-300 text-gray-700 hover:bg-gray-50"} transition transform-gpu hover:scale-[1.02]`}>Choose {p.name}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials carousel */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA: blue strip only colored section */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-white text-3xl font-semibold">Launch your white-label booking platform</div>
            <div className="text-blue-100">Start your free trial — be live today.</div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleCheckout(priceStarter)} className="h-12 px-6 rounded-lg bg-white text-blue-600 hover:opacity-90 transition">Start Free Trial</button>
            <a href={`${appUrl}/signin`} className="h-12 px-6 rounded-lg border border-white text-white hover:bg-white/10 transition flex items-center">Sign in</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">© {new Date().getFullYear()} DetailFlow</div>
          <div className="flex gap-6">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition">Features</a>
            <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition">Pricing</a>
            <a href="#faq" className="text-sm text-gray-500 hover:text-gray-900 transition">FAQ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Testimonials() {
  const items = [
    { name: "Alex", role: "Owner, Shine Mobile", quote: "DetailFlow paid for itself in the first month.", avatar: "/next.svg" },
    { name: "Sam", role: "Founder, RapidClean", quote: "Our no-show rate dropped by 60%.", avatar: "/vercel.svg" },
    { name: "Riley", role: "Ops, GoDetail", quote: "Scheduling finally just works.", avatar: "/globe.svg" },
  ];
  const [index, setIndex] = React.useState(0);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  return (
    <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-[64px]">
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-400 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
            {items.map((t) => (
              <div key={t.name} className="min-w-full px-0">
                <div className="bg-white shadow-md rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-600">
                      <Image src={t.avatar} alt="avatar" width={48} height={48} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.role}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-gray-700 italic">“{t.quote}”</div>
                  <div className="mt-3 flex gap-1 text-yellow-400">{"★★★★★".split("").map((s, i) => (<span key={i}>★</span>))}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button aria-label="Previous" onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-sm border border-gray-200 hover:shadow-md">‹</button>
        <button aria-label="Next" onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-sm border border-gray-200 hover:shadow-md">›</button>
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`h-2 w-2 rounded-full ${i === index ? "bg-blue-600" : "bg-gray-300"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Can I use my own domain and branding?", a: "Yes. DetailFlow is white-label — add your domain, logo, and colours." },
    { q: "How does the free trial work?", a: "Start instantly. No charge during the trial. Upgrade any time." },
    { q: "Do you support Stripe?", a: "Yes. Built-in subscription checkout, invoices, and customer portal." },
  ];
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-[64px]">
      <div className="divide-y divide-gray-200 border-t border-b">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={it.q} className="py-4">
              <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between text-left">
                <span className="font-medium text-gray-900">{it.q}</span>
                <span className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}>⌄</span>
              </button>
              <div className={`overflow-hidden transition-[max-height] duration-300 ease-out ${isOpen ? "max-h-40" : "max-h-0"}`}>
                <div className="mt-2 text-gray-600">{it.a}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconBolt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}
function IconChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <path d="M3 3v18h18" /><path d="M7 13h2v5H7zM11 9h2v9h-2zM15 5h2v13h-2z" />
    </svg>
  );
}
function IconUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function IconGraph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className}>
      <path d="M3 12l6-6 4 4 7-7" /><path d="M21 21H3V3" />
    </svg>
  );
}
