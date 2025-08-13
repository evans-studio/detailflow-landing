"use client";
import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://admin.detailor.co.uk";
  const launchActive = (process.env.NEXT_PUBLIC_LAUNCH_ACTIVE ?? 'true') === 'true';

  // New pricing IDs
  const PRICES = {
    starter: {
      monthly: { intro: 'price_1RvFduQJVipO0E7Taws14yS5', standard: 'price_1RvFgcQJVipO0E7Tmh8Gqp87' },
      annual: { launch: 'price_1RvFiyQJVipO0E7TBKzDOW3q', standard: 'price_1RvFmQQJVipO0E7TnTOnYBhG' },
    },
    pro: {
      monthly: { intro: 'price_1RvFpnQJVipO0E7TWLul7XZw', standard: 'price_1RvFrTQJVipO0E7Tc6kr6cez' },
      annual: { launch: 'price_1RvFwZQJVipO0E7TDQfLTL80', standard: 'price_1RvFyWQJVipO0E7Ttmxm4xq2' },
    },
    business: {
      monthly: { intro: 'price_1RvGATQJVipO0E7T6jtE1rUO', standard: 'price_1RvGCLQJVipO0E7T7JKuSQZL' },
      annual: { launch: 'price_1RvGEdQJVipO0E7Ty5kiGmCf', standard: 'price_1RvGIPQJVipO0E7Td22lY1VK' },
    },
    addOns: {
      sms100: 'price_1RvGJrQJVipO0E7TTLe0cv4X',
      sms500: 'price_1RvGKqQJVipO0E7TWgsghOCn',
      sms1000: 'price_1RvGLVQJVipO0E7TzeqjIDi4',
      storage5gb: 'price_1RvGMUQJVipO0E7TFPZyq7mH',
    }
  } as const;

  const handleCheckout = (priceId: string) => {
    const url = `${appUrl}/api/payments/checkout?price_id=${encodeURIComponent(priceId)}`;
    window.location.href = url;
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Detailor",
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
        {/* Hero Section - Authentic Detailor Branding */}
        <section className="relative overflow-hidden detailor-hero-gradient">
          {/* Detailor Brand Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-white"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-100/15 rounded-full blur-3xl animate-float animate-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-yellow-400/5 rounded-full blur-3xl"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8">
            <div className="text-center max-w-5xl mx-auto">
              <div className="animate-fade-in-scale">
                <h1 className="text-enterprise-display text-6xl lg:text-7xl tracking-tight text-gray-900 mb-8">
                  Run your mobile service business on{" "}
                  <span className="detailor-brand-text animate-shimmer">
                    autopilot
                  </span>
                </h1>
              </div>
              
              <div className="animate-slide-in-up animate-delay-200">
                <p className="text-enterprise-body text-xl leading-relaxed text-gray-700 mb-12 max-w-3xl mx-auto">
                  The only enterprise-grade, white-label platform that transforms mobile service operations. Trusted by industry leaders for sophisticated scheduling, seamless payments, intelligent automation, and real-time analytics that drive 30%+ revenue growth.
                </p>
              </div>

              <div className="animate-slide-in-up animate-delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => handleCheckout(PRICES.starter.monthly.intro)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <span>Start Free Trial</span>
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <a
                  href={`${appUrl}/signin`}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-base font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <span>Sign in</span>
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                  </svg>
                </a>
              </div>

              <div className="animate-fade-in animate-delay-500">
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-white/40">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-medium">Enterprise 14-day trial</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-700 font-medium">White-label ready</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-700 font-medium">5-minute setup</span>
                </div>
              </div>

              {/* Trust indicators with animation */}
              <div className="animate-slide-in-up animate-delay-700 mt-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center opacity-70">
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>SOC2 Compliant</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
                    <svg className="w-5 h-5 text-[var(--detailor-blue)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                    <span>99.97% Uptime</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
                    <svg className="w-5 h-5 text-[var(--detailor-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Enterprise API</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
                    <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Bank-Level Security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* How It Works / Scrollytelling Section */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>How it works</span>
              </div>
              <h2 className="text-enterprise-display text-4xl font-bold tracking-tight text-gray-900">
                From booking to payment — all in one flow
              </h2>
              <p className="text-enterprise-body text-lg text-gray-700 mt-3 max-w-2xl mx-auto">
                A frictionless experience for your customers and a powerful control center for your team.
              </p>
            </div>
          </div>
          <ScrollytellingSection />
        </section>

        {/* Features Grid - Enterprise Layout */}
        <section id="features" className="py-32 bg-white relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-grid-gray-100/50 bg-[size:32px_32px] opacity-30"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20 scroll-reveal">
              <div className="inline-flex items-center gap-2 bg-[var(--detailor-blue-light)] text-[var(--detailor-blue)] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span>Enterprise Features</span>
              </div>
              <h2 className="text-enterprise-display text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Everything you need to <span className="detailor-brand-text">scale professionally</span>
              </h2>
              <p className="text-enterprise-body text-xl text-gray-700 max-w-3xl mx-auto">
                Enterprise-grade features that power the world&apos;s most successful mobile service operations. Built for scale, designed for growth.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: IconShield,
                  title: "Enterprise White-Label",
                  description: "Complete brand sovereignty with custom domains, advanced theming, and seamless customer experiences. Deploy under your brand in minutes with enterprise-grade customization."
                },
                {
                  icon: IconBolt,
                  title: "Real-Time Intelligence",
                  description: "Enterprise-grade real-time operations with live analytics, instant cross-platform synchronization, and intelligent automation that scales with your team from 1 to 1000+."
                },
                {
                  icon: IconChart,
                  title: "AI-Powered Revenue Optimization",
                  description: "Machine learning algorithms that automatically optimize pricing based on 50+ factors including demand, seasonality, location, and competitor analysis. Enterprise clients see 35-45% revenue increases."
                },
                {
                  icon: IconUser,
                  title: "Enterprise Customer Portal",
                  description: "White-label customer portal with advanced self-service capabilities, automated communication flows, and integrated payment processing. Reduce support overhead by 60%."
                },
                {
                  icon: IconMail,
                  title: "Intelligent Marketing Engine",
                  description: "Enterprise marketing automation with behavioral triggers, A/B testing, advanced segmentation, and ROI tracking. Increase customer lifetime value by 40%."
                },
                {
                  icon: IconGraph,
                  title: "Enterprise Analytics & BI",
                  description: "Advanced business intelligence with predictive analytics, custom KPI dashboards, real-time reporting, and data export APIs. Make data-driven decisions at scale."
                }
              ].map((feature) => (
                <div key={feature.title} className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Call to action within features */}
            <div className="mt-20 text-center scroll-reveal">
              <div className="bg-gradient-to-r from-[var(--detailor-blue-light)] to-blue-50 rounded-2xl p-12 border-2 border-[var(--detailor-blue-light)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--detailor-gold)]/10 to-transparent rounded-full blur-xl"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to <span className="detailor-brand-text">transform</span> your mobile service business?
                  </h3>
                  <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                    Join hundreds of service professionals who have already scaled their operations with Detailor&apos;s enterprise platform.
                  </p>
                  <button
                    onClick={() => handleCheckout(PRICES.starter.monthly.intro)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-semibold rounded-lg transition-colors duration-200"
                  >
                    Start Your Free Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - Enterprise Design */}
        <section id="pricing" className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-20"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20 scroll-reveal">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-4 border border-blue-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Transparent Pricing</span>
              </div>
              <h2 className="text-enterprise-display text-5xl font-bold tracking-tight text-gray-900 mb-2">
                Simple pricing that <span className="text-blue-600">scales with you</span>
              </h2>
              <p className="text-enterprise-body text-xl text-gray-700 max-w-3xl mx-auto">
                Choose the perfect plan for your business size. Upgrade anytime as you grow. No hidden fees, no surprises.
              </p>
              
              {/* Pricing toggle */}
              <div className="mt-8 inline-flex items-center bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                <button className="px-6 py-3 text-sm font-semibold text-gray-900 bg-white rounded-lg shadow-sm">
                  Monthly
                </button>
                <button className="px-6 py-3 text-sm font-semibold text-gray-500 hover:text-gray-900 rounded-lg transition-colors">
                  Annual <span className="ml-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">Save 20%</span>
                </button>
              </div>
            </div>
            {/* Three-tier pricing (Starter, Pro, Business) */}
            <div className="grid md:grid-cols-3 gap-8">
              {([
                {
                  key: 'starter',
                  name: 'Starter',
                  monthly: { standard: 15, intro: 7.5 },
                  annual: { standard: 150, launch: 135 },
                  features: [
                    '25 bookings/month (soft cap)',
                    '1 staff account',
                    '3 services maximum',
                    'Basic email notifications',
                    '1GB photo storage',
                    '“Powered by DetailFlow” branding'
                  ]
                },
                {
                  key: 'pro',
                  name: 'Pro',
                  popular: true,
                  monthly: { standard: 25, intro: 12.5 },
                  annual: { standard: 250, launch: 225 },
                  features: [
                    '80 bookings/month (soft cap)',
                    '3 staff accounts',
                    'Unlimited services & add-ons',
                    'Remove branding + custom logo',
                    'Full automation suite',
                    'Dynamic pricing rules',
                    'Bulk messaging',
                    'Customer self-service portal',
                    'Advanced analytics',
                    '5GB photo storage',
                    'SMS add-on available'
                  ]
                },
                {
                  key: 'business',
                  name: 'Business',
                  monthly: { standard: 55, intro: 27.5 },
                  annual: { standard: 550, launch: 495 },
                  features: [
                    '200 bookings/month (soft cap)',
                    '8 staff accounts',
                    '3 locations/territories',
                    'Custom domain',
                    'Full brand theming',
                    'Team roles & permissions',
                    'Advanced reporting & cohorts',
                    'Refund management',
                    'Unlimited CSV exports',
                    'Priority email support',
                    '15GB photo storage',
                    'SMS add-on available'
                  ]
                }
              ] as const).map((plan) => {
                const monthlyIntroPriceId = PRICES[plan.key as 'starter'|'pro'|'business'].monthly.intro;
                const annualPriceId = launchActive
                  ? PRICES[plan.key as 'starter'|'pro'|'business'].annual.launch
                  : PRICES[plan.key as 'starter'|'pro'|'business'].annual.standard;
                const isPopular = plan.key === 'pro';
                return (
                  <div
                    key={plan.name}
                    className={`relative bg-white rounded-2xl p-8 ${
                      isPopular 
                        ? 'border-2 border-blue-500 shadow-lg' 
                        : 'border-2 border-gray-200 shadow-sm hover:shadow-md'
                    } transition-shadow duration-200`}
                  >
                    {/* Popular badge */}
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                          Popular
                        </span>
                      </div>
                    )}

                    {/* Plan header */}
                    <div className="text-center mb-8">
                      <div className="text-sm font-bold tracking-wider text-gray-500 uppercase mb-2">{plan.name}</div>
                      
                      {/* Pricing display */}
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center gap-2 mb-2">
                          <span className="text-5xl font-black text-gray-900">£{plan.monthly.standard}</span>
                          <span className="text-gray-500 font-medium">/month</span>
                        </div>
                        
                        {/* Intro pricing callout */}
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200">
                          <span className="line-through text-green-500">£{plan.monthly.standard}</span>
                          <span>£{plan.monthly.intro} first month</span>
                        </div>
                      </div>

                      {/* Annual pricing note */}
                      <div className="text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
                        Annual: <span className="font-semibold text-gray-900">£{plan.annual.standard}/year</span>
                        <span className="text-green-600 font-medium ml-1">
                          (save £{(plan.monthly.standard * 12) - plan.annual.standard})
                        </span>
                      </div>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleCheckout(monthlyIntroPriceId)}
                        className={`w-full py-3 text-base font-semibold rounded-lg transition-colors duration-200 ${
                          isPopular 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        <span>Start Free Trial</span>
                        <svg className="w-4 h-4 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => handleCheckout(annualPriceId)}
                        className="w-full py-2.5 text-blue-700 hover:text-blue-800 font-medium text-sm rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      >
                        Choose Annual Plan →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-8">
            <h2 className="text-enterprise-display text-4xl font-bold tracking-tight text-gray-900">Loved by service professionals</h2>
            <p className="text-enterprise-body text-lg text-gray-700 mt-2">Proof points from real operators using Detailor</p>
          </div>
          <Testimonials />
        </section>

        {/* FAQ */}
        <section id="learn" className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-6">
            <h2 className="text-enterprise-display text-4xl font-bold tracking-tight text-gray-900">FAQ</h2>
            <p className="text-enterprise-body text-lg text-gray-700 mt-2">Answers to common questions</p>
          </div>
          <FAQ />
        </section>

        {/* Final CTA */}
        <section className="bg-blue-600">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Launch your white-label booking platform
                </h2>
                <p className="text-blue-100 mt-2">Start your free trial — be live today.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => handleCheckout(PRICES.starter.monthly.intro)}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Start Free Trial
                </button>
                <a 
                  href={`${appUrl}/signin`}
                  className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-colors duration-200 font-medium text-center"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Detailor
              </div>
              <div className="flex gap-6">
                <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Pricing
                </a>
                <a href="#faq" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

// Dashboard Component Mockups
function BookingDashboard() {
  return (
    <div className="w-full h-full bg-transparent p-2 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="font-bold text-gray-900 text-sm">Today&apos;s Bookings</h3>
        <span className="text-blue-600 font-bold text-lg">12</span>
      </div>
      
      {/* Booking Cards */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-lg p-2">
          <div className="flex justify-between items-start mb-1">
            <span className="font-semibold text-gray-800 text-sm">Premium Detail</span>
            <span className="text-blue-600 font-bold text-base">£85</span>
          </div>
          <div className="text-gray-700 text-xs font-medium">Sarah M. • 2:30 PM</div>
          <div className="text-gray-500 text-xs">BMW X5 • <span className="text-blue-600 font-medium">Confirmed</span></div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-2">
          <div className="flex justify-between items-start mb-1">
            <span className="font-semibold text-gray-800 text-sm">Basic Wash</span>
            <span className="text-green-600 font-bold text-base">£35</span>
          </div>
          <div className="text-gray-700 text-xs font-medium">Mike R. • 4:00 PM</div>
          <div className="text-gray-500 text-xs">Tesla Model 3 • <span className="text-green-600 font-medium">In Progress</span></div>
        </div>
        
        <div className="bg-orange-50/80 backdrop-blur-sm border border-orange-200 rounded-lg p-2">
          <div className="flex justify-between items-start mb-1">
            <span className="font-semibold text-gray-800 text-sm">Full Service</span>
            <span className="text-orange-600 font-bold text-base">£120</span>
          </div>
          <div className="text-gray-700 text-xs font-medium">Emma T. • 6:15 PM</div>
          <div className="text-gray-500 text-xs">Range Rover • <span className="text-orange-600 font-medium">Pending</span></div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center bg-blue-50/80 backdrop-blur-sm rounded-lg py-2">
            <div className="font-bold text-blue-600 text-lg">£240</div>
            <div className="text-gray-600 text-xs font-medium">Today&apos;s Revenue</div>
          </div>
          <div className="text-center bg-green-50/80 backdrop-blur-sm rounded-lg py-2">
            <div className="font-bold text-green-600 text-lg">8</div>
            <div className="text-gray-600 text-xs font-medium">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SchedulingDashboard() {
  return (
    <div className="w-full h-full bg-transparent p-2 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="font-bold text-gray-900 text-sm">Schedule</h3>
        <span className="text-sm text-blue-600 font-bold">Oct 24</span>
      </div>
      
      {/* Time Slots */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="w-12 text-gray-600 text-xs font-bold">9:00</span>
          <div className="flex-1 bg-blue-100/80 backdrop-blur-sm border border-blue-200 rounded-md px-2 py-1.5">
            <span className="text-blue-800 font-semibold text-xs">Setup & Travel</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-12 text-gray-600 text-xs font-bold">10:00</span>
          <div className="flex-1 bg-green-100/80 backdrop-blur-sm border border-green-200 rounded-md px-2 py-1.5">
            <span className="text-green-800 font-semibold text-xs">BMW Detail - Sarah</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-12 text-gray-600 text-xs font-bold">12:00</span>
          <div className="flex-1 bg-yellow-100/80 backdrop-blur-sm border border-yellow-200 rounded-md px-2 py-1.5">
            <span className="text-yellow-800 font-semibold text-xs">Lunch Break</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-12 text-gray-600 text-xs font-bold">14:00</span>
          <div className="flex-1 bg-green-100/80 backdrop-blur-sm border border-green-200 rounded-md px-2 py-1.5">
            <span className="text-green-800 font-semibold text-xs">Tesla Wash - Mike</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-12 text-gray-600 text-xs font-bold">16:00</span>
          <div className="flex-1 bg-purple-100/80 backdrop-blur-sm border border-purple-200 rounded-md px-2 py-1.5">
            <span className="text-purple-800 font-semibold text-xs">Travel Time</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-12 text-gray-600 text-xs font-bold">18:00</span>
          <div className="flex-1 bg-green-100/80 backdrop-blur-sm border border-green-200 rounded-md px-2 py-1.5">
            <span className="text-green-800 font-semibold text-xs">Range Rover - Emma</span>
          </div>
        </div>
      </div>
      
      {/* Efficiency Indicator */}
      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="bg-green-50/80 backdrop-blur-sm rounded-lg p-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-700 text-xs font-semibold">Route Efficiency</span>
            <span className="text-green-600 font-bold text-sm">92%</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentsDashboard() {
  return (
    <div className="w-full h-full bg-transparent p-2 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="font-bold text-gray-900 text-sm">Payments</h3>
        <span className="text-green-600 font-bold text-lg">+£85</span>
      </div>
      
      {/* Payment Items */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        <div className="flex items-center justify-between p-2 bg-green-50/80 backdrop-blur-sm rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">Invoice #1024</div>
              <div className="text-gray-600 text-xs font-medium">Sarah M. - <span className="text-green-600">Paid</span></div>
            </div>
          </div>
          <span className="font-bold text-green-600 text-base">£85</span>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-blue-50/80 backdrop-blur-sm rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">Invoice #1025</div>
              <div className="text-gray-600 text-xs font-medium">Mike R. - <span className="text-blue-600">Processing</span></div>
            </div>
          </div>
          <span className="font-bold text-blue-600 text-base">£35</span>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-red-50/80 backdrop-blur-sm rounded-lg border border-red-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">Invoice #1026</div>
              <div className="text-gray-600 text-xs font-medium">Emma T. - <span className="text-red-600">Overdue</span></div>
            </div>
          </div>
          <span className="font-bold text-red-600 text-base">£120</span>
        </div>
      </div>
      
      {/* Summary */}
      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-1">
          <div className="text-center bg-green-50 rounded-lg py-1.5">
            <div className="font-bold text-green-600 text-base">85%</div>
            <div className="text-gray-600 text-xs font-medium">Paid</div>
          </div>
          <div className="text-center bg-blue-50 rounded-lg py-1.5">
            <div className="font-bold text-blue-600 text-base">10%</div>
            <div className="text-gray-600 text-xs font-medium">Pending</div>
          </div>
          <div className="text-center bg-red-50/80 backdrop-blur-sm rounded-lg py-1.5">
            <div className="font-bold text-red-600 text-base">5%</div>
            <div className="text-gray-600 text-xs font-medium">Overdue</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationDashboard() {
  return (
    <div className="w-full h-full bg-transparent p-2 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="font-bold text-gray-900 text-sm">Automation</h3>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-600 font-bold text-sm">Active</span>
        </div>
      </div>
      
      {/* Workflow Items */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        <div className="bg-purple-50/80 backdrop-blur-sm border border-purple-200 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-gray-800 text-sm">Booking Reminders</span>
          </div>
          <div className="text-gray-700 text-xs font-medium mb-1">24h before appointment</div>
          <div className="text-purple-600 text-xs font-bold">3 sent today</div>
        </div>
        
        <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-gray-800 text-sm">Follow-up Reviews</span>
          </div>
          <div className="text-gray-700 text-xs font-medium mb-1">2h after completion</div>
          <div className="text-blue-600 text-xs font-bold">5 sent today</div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-gray-800 text-sm">Payment Reminders</span>
          </div>
          <div className="text-gray-700 text-xs font-medium mb-1">1 day overdue</div>
          <div className="text-green-600 text-xs font-bold">1 sent today</div>
        </div>
        
        <div className="bg-orange-50/80 backdrop-blur-sm border border-orange-200 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-gray-800 text-sm">Rebooking Campaign</span>
          </div>
          <div className="text-gray-700 text-xs font-medium mb-1">30 days since last visit</div>
          <div className="text-orange-600 text-xs font-bold">12 sent today</div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center bg-purple-50/80 backdrop-blur-sm rounded-lg py-1.5">
            <div className="font-bold text-purple-600 text-base">92%</div>
            <div className="text-gray-600 text-xs font-medium">Open Rate</div>
          </div>
          <div className="text-center bg-green-50 rounded-lg py-1.5">
            <div className="font-bold text-green-600 text-base">18%</div>
            <div className="text-gray-600 text-xs font-medium">Conversion</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Scrollytelling Section Component
function ScrollytellingSection() {
  const steps = [
    {
      number: "01",
      title: "Frictionless booking",
      description: "Customers book in under 3 minutes from any device — no phone tag.",
      component: BookingDashboard
    },
    {
      number: "02", 
      title: "Smart scheduling",
      description: "Prevent overbooking with dynamic slots and travel-aware routing.",
      component: SchedulingDashboard
    },
    {
      number: "03",
      title: "Instant payments", 
      description: "Get paid on time with checkout links, invoices, and customer portal.",
      component: PaymentsDashboard
    },
    {
      number: "04",
      title: "Automated follow-ups",
      description: "Win repeat business with hands-off reminders and reviews.",
      component: AutomationDashboard
    }
  ];

  return (
    <>
      {/* Desktop Version - Keep current sticky approach */}
      <DesktopScrollytelling steps={steps} />
      
      {/* Mobile Version - New slide-in approach */}
      <MobileScrollytelling steps={steps} />
    </>
  );
}

// Types
interface Step {
  number: string;
  title: string;
  description: string;
  component: React.ComponentType;
}

// Desktop Scrollytelling Component
function DesktopScrollytelling({ steps }: { steps: Step[] }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Map scroll progress to active step (0,1,2,3) evenly across the section
  const activeStepFloat = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);
  const [activeStep, setActiveStep] = React.useState(0);

  useMotionValueEvent(activeStepFloat, "change", (value) => {
    setActiveStep(Math.round(value));
  });

  return (
    <section ref={containerRef} className="relative hidden md:block max-md:hidden" style={{ height: '400vh' }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Steps */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    className="relative flex gap-6"
                    animate={{
                      opacity: activeStep === index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {/* Step Dot */}
                    <motion.div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10"
                      animate={{
                        backgroundColor: activeStep === index ? "#2563eb" : "#d1d5db",
                        color: activeStep === index ? "#ffffff" : "#6b7280",
                        scale: activeStep === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {step.number}
                    </motion.div>
                    
                    {/* Step Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 mt-2 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Right: Device */}
            <div className="relative">
              <div className="mx-auto w-80 max-w-full">
                <div className="relative">
                  {/* Real iPhone Mockup - Properly Sized */}
                  <Image 
                    src="/mockup.png" 
                    alt="iPhone mockup"
                    width={320}
                    height={640}
                    className="w-full h-auto drop-shadow-2xl"
                    priority
                  />
                  
                  {/* Dashboard content positioned to fill iPhone screen */}
                  <div className="absolute top-[8%] left-[8%] right-[8%] bottom-[10%]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full overflow-hidden"
                      >
                        {steps[activeStep]?.component && 
                          React.createElement(steps[activeStep].component)
                        }
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

// Mobile Peek-Behind Component - Magic Window Effect
function MobileScrollytelling({ steps }: { steps: Step[] }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Scroll-based progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to steps (0,1,2,3) evenly across the section
  const revealProgress = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);
  const [currentReveal, setCurrentReveal] = React.useState(0);

  // Track current reveal stage
  useMotionValueEvent(revealProgress, "change", (value) => {
    setCurrentReveal(Math.round(value));
  });

  return (
    <section ref={containerRef} className="block md:hidden max-md:block relative h-[400vh] bg-gray-50 pt-16">
      
      {/* Fixed Layout - Phone and Text Always Visible */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center py-8">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, 0.5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-50 to-green-100" />
          </motion.div>
        </div>

        {/* Central Device - Positioned Higher */}
        <motion.div 
          className="relative z-10 w-64 max-w-full mb-6"
          whileHover={{ scale: 1.02 }}
          style={{ willChange: 'transform' }}
        >
          
          {/* Real iPhone Mockup - Properly Sized */}
          <div className="relative">
            <Image 
              src="/mockup.png" 
              alt="iPhone mockup"
              width={256}
              height={512}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
            
            {/* Dashboard content positioned to fill iPhone screen */}
            <div className="absolute top-[8%] left-[8%] right-[8%] bottom-[10%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReveal}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full overflow-hidden"
                >
                  {steps[Math.min(currentReveal, steps.length - 1)]?.component &&
                    React.createElement(steps[Math.min(currentReveal, steps.length - 1)].component)
                  }
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Subtle Device Glow */}
          <motion.div
            className="absolute -inset-3 bg-blue-400/10 rounded-[3rem] blur-xl"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Content Text - Always Visible Below Phone */}
        <div className="relative z-20 px-4 max-w-sm w-full">
          <AnimatePresence mode="wait">
            {currentReveal >= 0 && currentReveal < steps.length && (
              <motion.div
                key={currentReveal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-base font-bold shadow-lg">
                    {steps[currentReveal]?.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {steps[currentReveal]?.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm font-medium">
                  {steps[currentReveal]?.description}
                </p>
                
                {/* Progress Dots */}
                <div className="flex items-center justify-center gap-2 mt-3">
                  {steps.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentReveal ? 'bg-blue-600 w-6' : 'bg-gray-300'
                      }`} 
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>


    </section>
  );
}

// Testimonials Component
function Testimonials() {
  const items = [
    { 
      name: "Alex Martinez", 
      role: "Owner, Shine Mobile Detailing", 
      quote: "DetailFlow completely transformed my business. The automated scheduling and payment system paid for itself in the first month.",
      avatar: "/next.svg",
      location: "Denver, CO"
    },
    { 
      name: "Sam Chen", 
      role: "Founder, RapidClean Services", 
      quote: "Our no-show rate dropped by 60% with the automated reminders. The white-label solution means it feels like our own platform.",
      avatar: "/vercel.svg",
      location: "Austin, TX"
    },
    { 
      name: "Riley Thompson", 
      role: "Operations Manager, GoDetail Pro", 
      quote: "Scheduling finally just works. The real-time updates keep our entire team synchronized.",
      avatar: "/globe.svg",
      location: "Miami, FL"
    },
  ];

  const [index, setIndex] = React.useState(0);
  const next = React.useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  React.useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            Loved by service professionals
          </h2>
            <p className="text-lg text-gray-600">
              Join thousands of mobile service businesses growing with Detailor
            </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <motion.div 
              className="flex"
              animate={{ x: `-${index * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {items.map((testimonial) => (
                <div key={testimonial.name} className="min-w-full px-0">
                  <div className="bg-white shadow-md rounded-xl p-8 mx-4">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-600 flex-shrink-0">
                        <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                        <div className="text-xs text-gray-400">{testimonial.location}</div>
                      </div>
                    </div>
                    <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
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
            </motion.div>
          </div>
          
          {/* Navigation */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-10 w-10 rounded-full bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-10 w-10 rounded-full bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  i === index ? "bg-blue-600 w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Component
function FAQ() {
  const items = [
    { 
      q: "Can I use my own domain and branding?", 
      a: "Yes, Detailor is completely white-label. You can add your own domain, upload your logo, customize colors, and create a seamless branded experience for your customers." 
    },
    { 
      q: "How does the free trial work?", 
      a: "Start your free trial instantly with no credit card required. You get full access to all features for 14 days. No charges during the trial period." 
    },
    { 
      q: "Do you support Stripe payments?", 
      a: "Yes, we have built-in Stripe integration for subscription billing, one-time payments, invoices, and customer portals. Connect your Stripe account and start accepting payments immediately." 
    },
    { 
      q: "Is there a setup fee or long-term contract?", 
      a: "No setup fees and no long-term contracts. Pay month-to-month and cancel anytime. We believe our platform should earn your business every month." 
    }
  ];
  
  const [open, setOpen] = React.useState<number | null>(0);
  
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about Detailor
          </p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="py-6">
                <button 
                  onClick={() => setOpen(isOpen ? null : i)} 
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-medium text-gray-900 pr-8">{item.q}</span>
                  <motion.svg 
                    className="w-5 h-5 text-gray-500 flex-shrink-0"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 text-gray-600 leading-relaxed">{item.a}</div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Icon Components
function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconBolt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function IconChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M3 3v18h18" />
      <path d="M7 13h2v5H7zM11 9h2v9h-2zM15 5h2v13h-2z" />
    </svg>
  );
}

function IconUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function IconGraph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M3 12l6-6 4 4 7-7" />
      <path d="M21 21H3V3" />
    </svg>
  );
}