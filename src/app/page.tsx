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
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
      }
    );
    
    elements.forEach((el) => {
      // Ensure initial state
      el.classList.add("opacity-0", "translate-y-5");
      observer.observe(el);
    });
    
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

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DetailFlow",
    "applicationCategory": "BusinessApplication",
    "description": "White-label booking and payments platform for mobile service businesses",
    "operatingSystem": "Web-based",
    "offers": {
      "@type": "Offer",
      "price": "49",
      "priceCurrency": "GBP",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "billingDuration": "P1M",
        "price": "49",
        "priceCurrency": "GBP"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen">
      {/* Hero: pure white, minimalist */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-24 lg:py-32 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Run your mobile service business on 
              <span className="text-blue-600"> autopilot</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl leading-relaxed">
              DetailFlow is the white-label booking and payments platform built for mobile service operators — bookings, scheduling, payments, and messaging in one place.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => handleCheckout(priceStarter)} 
                className="h-12 px-8 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md font-medium"
              >
                Start Free Trial
              </button>
              <a 
                href={`${appUrl}/signin`} 
                className="h-12 px-6 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center font-medium"
              >
                Sign in
              </a>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              14-day free trial • No credit card required
            </div>
          </div>
          <div className="relative">
            <div 
              className="relative w-full aspect-[4/3] rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100" 
              style={{ 
                transform: mockupReady ? "scale(1)" : "scale(0.95)", 
                opacity: mockupReady ? 1 : 0, 
                transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s" 
              }}
            >
              <Image 
                src="/window.svg" 
                alt="DetailFlow dashboard showing booking management interface" 
                fill 
                priority 
                sizes="(min-width: 1024px) 560px, 100vw" 
                onLoadingComplete={() => setMockupReady(true)} 
                className="object-contain p-4" 
              />
            </div>
            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full opacity-50" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-50 rounded-full opacity-30" />
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
      <section className="relative">
        {steps.map((_, i) => (
          <div key={i} data-step-section data-index={i} className="h-screen flex items-center">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-8 w-full" />
          </div>
        ))}
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-[64px]">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left steps */}
            <div className="lg:sticky lg:top-20 self-start">
              <div className="space-y-12">
                {steps.map((s, i) => (
                  <div key={s.title} className="flex items-start gap-6" data-animate="fade-up" style={{ transition: "opacity 400ms ease-out, transform 600ms ease-out" }}>
                    <div className="flex flex-col items-center">
                      <div className={`h-10 w-1 rounded-full transition-all duration-400 ${activeStep === i ? "bg-blue-600" : "bg-gray-200"}`} />
                    </div>
                    <div className={`flex-1 transition-all duration-400 ease-out ${activeStep === i ? "opacity-100 scale-100" : "opacity-30 scale-95"}`}>
                      <div className="text-blue-600 font-mono text-sm tracking-wide">{s.number}</div>
                      <div className="text-2xl font-semibold mb-3 text-gray-900">{s.title}</div>
                      <div className="text-gray-600 leading-relaxed text-base">{s.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right device with crossfade screens */}
            <div className="lg:sticky lg:top-20 self-start">
              <div className="relative w-full aspect-[9/16] rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
                {steps.map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute inset-0 will-change-transform backface-hidden" 
                    style={{ 
                      opacity: activeStep === i ? 1 : 0, 
                      transform: activeStep === i ? "scale3d(1.03,1.03,1)" : "scale3d(1,1,1)", 
                      transition: "opacity 300ms ease, transform 300ms ease" 
                    }}
                  >
                    <Image 
                      src="/window.svg" 
                      alt={`Step ${i + 1} screen`}
                      fill 
                      sizes="(min-width:1024px) 420px, 100vw" 
                      className="object-contain" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-[64px]">
        <div className="text-center mb-16" data-animate="fade-up">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">Everything you need to scale</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Professional tools for modern mobile service businesses</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "White-label ready", desc: "Your brand, your domain, your customer experience.", icon: IconShield },
            { title: "Realtime ops", desc: "Live updates for bookings, payments, and messages.", icon: IconBolt },
            { title: "Smart pricing", desc: "Dynamic pricing to lift revenue by 25–40%.", icon: IconChart },
            { title: "Customer portal", desc: "Self-serve reschedules, invoices, and payments.", icon: IconUser },
            { title: "Messaging automation", desc: "Reminders, follow-ups, and review requests.", icon: IconMail },
            { title: "Insights", desc: "Track KPIs that matter and export your data.", icon: IconGraph },
          ].map((f, index) => (
            <div 
              key={f.title} 
              className="group cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-2 hover:shadow-lg rounded-xl p-6"
              data-animate="fade-up"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-blue-600 mb-4">
                <f.icon className="h-12 w-12 transition-all duration-200 group-hover:scale-110" strokeWidth={2} />
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{f.title}</div>
              <div className="text-sm text-gray-600 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-[64px]">
        <div className="text-center mb-16" data-animate="fade-up">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that fits your business needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Starter", price: "£49", popular: false, pid: priceStarter, features: ["Unlimited bookings", "Invoices & payments", "Email support", "Basic analytics", "Customer portal"] },
            { name: "Pro", price: "£99", popular: true, pid: pricePro, features: ["Everything in Starter", "Automation suite", "Branding & domain", "Advanced analytics", "Priority support"] },
            { name: "Enterprise", price: "£199", popular: false, pid: priceEnterprise, features: ["Everything in Pro", "Custom integrations", "Dedicated support", "Custom SLAs", "Advanced reporting"] },
          ].map((p, index) => (
            <div 
              key={p.name} 
              className={`relative bg-white border rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-blue-200 ${p.popular ? 'border-blue-200 shadow-md' : 'border-gray-200'}`}
              data-animate="fade-up"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">Most popular</div>
              )}
              <div className="text-lg font-semibold text-gray-900">{p.name}</div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">{p.price}</span>
                <span className="text-gray-500 text-base font-medium">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-gray-700">
                    <svg className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleCheckout(p.pid)} 
                className={`mt-8 w-full h-12 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] ${
                  p.popular 
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md" 
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                Choose {p.name}
              </button>
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
    </>
  );
}

function Testimonials() {
  const items = [
    { 
      name: "Alex Martinez", 
      role: "Owner, Shine Mobile Detailing", 
      quote: "DetailFlow completely transformed my business. The automated scheduling and payment system paid for itself in the first month. My customers love the convenience.", 
      avatar: "/next.svg",
      location: "Denver, CO"
    },
    { 
      name: "Sam Chen", 
      role: "Founder, RapidClean Services", 
      quote: "Our no-show rate dropped by 60% with the automated reminders. The white-label solution means it feels like our own platform. Game changer.", 
      avatar: "/vercel.svg",
      location: "Austin, TX"
    },
    { 
      name: "Riley Thompson", 
      role: "Operations Manager, GoDetail Pro", 
      quote: "Scheduling finally just works. The real-time updates keep our entire team synchronized, and customers can reschedule without calling us.", 
      avatar: "/globe.svg",
      location: "Miami, FL"
    },
  ];
  const [index, setIndex] = React.useState(0);
  const next = React.useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  // Auto-advance testimonials
  React.useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-[64px]">
      <div className="text-center mb-16" data-animate="fade-up">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">Loved by service professionals</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join thousands of mobile service businesses growing with DetailFlow</p>
      </div>
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((t) => (
              <div key={t.name} className="min-w-full px-0">
                <div className="bg-white shadow-md rounded-xl p-8 mx-4">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-600 flex-shrink-0">
                      <Image src={t.avatar} alt={`${t.name} avatar`} width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.role}</div>
                      <div className="text-xs text-gray-400">{t.location}</div>
                    </div>
                  </div>
                  <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation arrows */}
        <button 
          aria-label="Previous testimonial" 
          onClick={prev} 
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-10 w-10 rounded-full bg-white shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-900"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          aria-label="Next testimonial" 
          onClick={next} 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-10 w-10 rounded-full bg-white shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-900"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Dots indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)} 
              className={`h-2 w-2 rounded-full transition-all duration-200 ${
                i === index ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { 
      q: "Can I use my own domain and branding?", 
      a: "Yes, DetailFlow is completely white-label. You can add your own domain, upload your logo, customize colors, and create a seamless branded experience for your customers. It will look and feel like your own platform." 
    },
    { 
      q: "How does the free trial work?", 
      a: "Start your free trial instantly with no credit card required. You get full access to all features for 14 days. No charges during the trial period, and you can upgrade to a paid plan at any time." 
    },
    { 
      q: "Do you support Stripe payments?", 
      a: "Yes, we have built-in Stripe integration for subscription billing, one-time payments, invoices, and customer portals. Connect your Stripe account and start accepting payments immediately." 
    },
    { 
      q: "Is there a setup fee or long-term contract?", 
      a: "No setup fees and no long-term contracts. Pay month-to-month and cancel anytime. We believe our platform should earn your business every month." 
    },
    { 
      q: "Can I import my existing customer data?", 
      a: "Yes, we provide data import tools and can help migrate your existing customer information, service history, and other business data. Our team will guide you through the process." 
    },
    { 
      q: "What kind of support do you provide?", 
      a: "All plans include email support with detailed documentation. Pro and Enterprise plans get priority support with faster response times. Enterprise customers also get phone support and dedicated account management." 
    },
  ];
  const [open, setOpen] = React.useState<number | null>(0);
  
  return (
    <section id="faq" className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-[64px]">
      <div className="text-center mb-16" data-animate="fade-up">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">Frequently asked questions</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to know about DetailFlow</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="py-6" data-animate="fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                <button 
                  onClick={() => setOpen(isOpen ? null : i)} 
                  className="w-full flex items-center justify-between text-left group hover:text-blue-600 transition-colors duration-200"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-medium text-gray-900 group-hover:text-blue-600 pr-8">{item.q}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-all duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-blue-600" : "rotate-0 group-hover:text-blue-600"
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  id={`faq-answer-${i}`}
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-4 text-gray-600 leading-relaxed">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
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