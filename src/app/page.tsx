"use client";
import * as React from 'react';

function useReveal() {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: 0.15 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Home() {
  useReveal();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://detailflow.vercel.app';
  const priceStarter = process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || '';
  const pricePro = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || '';
  const priceEnterprise = process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || '';
  const checkout = (price: string) => {
    const url = `${appUrl}/api/payments/checkout?price_id=${encodeURIComponent(price)}`;
    window.location.href = url;
  };
  return (
    <main className="min-h-screen">
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1220] to-[#0e1526] text-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div data-reveal className="reveal">
              <div className="text-sm uppercase tracking-wider text-white/60">DetailFlow</div>
              <h1 className="mt-2 text-4xl md:text-6xl font-semibold leading-tight">🚀 Transform Your Mobile Service Business with Enterprise-Grade Automation</h1>
              <p className="mt-5 text-xl text-white/80">Run your entire operation — bookings, payments, customer management — on autopilot.</p>
              <div className="mt-8 flex gap-3">
                <button onClick={() => checkout(priceStarter)} className="rounded-xl bg-white text-black px-6 py-3 font-medium">Start Free Trial</button>
                <a href={`${appUrl}/signin`} className="rounded-xl border border-white/20 px-6 py-3 font-medium">See Demo</a>
              </div>
            </div>
            <div data-reveal className="reveal relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
              <div className="h-64 md:h-80 rounded-lg bg-gradient-to-br from-white/10 to-white/0" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div data-reveal className="reveal">
            <h2 className="text-2xl md:text-3xl font-semibold">The Challenge Every Mobile Service Business Faces</h2>
          </div>
          <ul data-reveal className="reveal space-y-3 text-[var(--df-muted,#9aa3b2)]">
            <li>• Losing customers to phone tag and booking friction</li>
            <li>• Spending hours on manual scheduling and payment chasing</li>
            <li>• Missing revenue with outdated pricing models</li>
            <li>• Drowning in admin work instead of service delivery</li>
            <li>• Competing against tech-enabled businesses with better systems</li>
          </ul>
        </div>
      </section>

      {/* 3. Solution */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">A Complete, Production-Ready Business Automation Platform</h2>
          <p className="mt-3 text-[var(--df-muted,#9aa3b2)]">From booking to payment — every step is streamlined.</p>
        </div>
      </section>

      {/* 4. Feature Sections */}
      <section className="mx-auto max-w-6xl px-6 py-16 space-y-10">
        {[
          { title: 'Complete Business Automation', stat: '90% reduction in manual booking tasks, 100% booking accuracy' },
          { title: 'Customer Experience That Converts', stat: 'Book in under 3 minutes from any device' },
          { title: 'Intelligent Pricing & Revenue Optimization', stat: '25–40% more revenue through smart pricing' },
          { title: 'Powerful Admin Command Center', stat: 'Data-driven decisions at a glance' },
          { title: 'Marketing Automation That Works', stat: 'Retention without manual follow-up' },
          { title: 'Enterprise-Grade Technology', stat: '99.9% uptime, bulletproof reliability' },
        ].map((f, i) => (
          <div key={f.title} className="grid gap-6 md:grid-cols-2 items-center">
            <div data-reveal className="reveal">
              <div className="text-sm uppercase tracking-wider text-[var(--df-muted,#9aa3b2)]">Feature {i+1}</div>
              <h3 className="mt-1 text-2xl md:text-3xl font-semibold">{f.title}</h3>
              <div className="mt-3 text-lg text-[var(--df-primary,#2563eb)]">{f.stat}</div>
            </div>
            <div data-reveal className="reveal rounded-xl border p-6 h-56" />
          </div>
        ))}
      </section>

      {/* 5. ROI Timeline */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">ROI You Can Measure in 90 Days</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div data-reveal className="reveal rounded-xl border p-6">
            <div className="text-lg font-medium">Month 1–3</div>
            <ul className="mt-2 space-y-2 text-[var(--df-muted,#9aa3b2)]">
              <li>• Immediate impact stats</li>
            </ul>
          </div>
          <div data-reveal className="reveal rounded-xl border p-6">
            <div className="text-lg font-medium">Month 4–12</div>
            <ul className="mt-2 space-y-2 text-[var(--df-muted,#9aa3b2)]">
              <li>• Sustained growth stats</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Competitive Advantage */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Why We Outperform Generic Booking Platforms</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div data-reveal className="reveal rounded-xl border p-6">
            <ul className="space-y-2 text-[var(--df-muted,#9aa3b2)]">
              <li>• End-to-end automation vs. isolated booking widget</li>
              <li>• Smart pricing engine vs. flat pricing</li>
              <li>• Realtime ops dashboard vs. static calendar</li>
              <li>• Built for mobile service workflows</li>
            </ul>
          </div>
          <div data-reveal className="reveal rounded-xl border p-6 h-48" />
        </div>
      </section>

      {/* 7. Pricing / Investment Justification */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Investment that pays for itself</h2>
            <p className="mt-3 text-[var(--df-muted,#9aa3b2)]">Positioned to return value in under 90 days through conversion lift and admin time saved.</p>
            <div className="mt-6 grid gap-3">
              <button onClick={() => checkout(priceStarter)} className="rounded-xl bg-[var(--df-primary,#2563eb)] text-white px-6 py-3 font-medium">Start Free Trial</button>
              <a href={`${appUrl}/signin`} className="rounded-xl border px-6 py-3 font-medium">See Demo</a>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: 'Starter', price: '£49.99', pid: priceStarter, popular: false },
              { name: 'Pro', price: '£99.99', pid: pricePro, popular: true },
              { name: 'Enterprise', price: '£199.99', pid: priceEnterprise, popular: false },
            ].map((p) => (
              <div key={p.name} className={`rounded-xl border p-6 ${p.popular ? 'ring-2 ring-[var(--df-primary,#2563eb)]' : ''}`}>
                <div className="flex items-center justify-between"><div className="font-semibold">{p.name}</div>{p.popular && <span className="rounded-full bg-[var(--df-primary,#2563eb)]/10 text-[var(--df-primary,#2563eb)] px-2 py-0.5 text-xs">Most popular</span>}</div>
                <div className="mt-2 text-3xl font-semibold">{p.price}<span className="text-base font-normal text-[var(--df-muted,#9aa3b2)]">/mo</span></div>
                <ul className="mt-4 space-y-2 text-sm text-[var(--df-muted,#9aa3b2)]"><li>Automation suite</li><li>Unlimited bookings</li><li>Email support</li></ul>
                <button className="mt-6 w-full rounded-lg bg-[var(--df-primary,#2563eb)] text-white py-2 font-medium" onClick={() => checkout(p.pid)}>Choose {p.name}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="bg-gradient-to-b from-[#0e1526] to-[#0b1220] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-4 md:grid-cols-2 items-center">
          <div>
            <div className="text-3xl md:text-4xl font-semibold">Your Business — Fully Automated</div>
            <div className="text-white/80">Start growing today with a platform that pays for itself in 90 days.</div>
          </div>
          <div className="flex gap-3 md:justify-end">
            <button onClick={() => checkout(priceStarter)} className="rounded-xl bg-white text-black px-6 py-3 font-medium">Start Free Trial</button>
            <a href={`${appUrl}/signin`} className="rounded-xl border border-white/20 px-6 py-3 font-medium">See Demo</a>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-[var(--df-muted,#9aa3b2)]">
        <div>&copy; {new Date().getFullYear()} DetailFlow. All rights reserved.</div>
      </footer>
    </main>
  );
}
