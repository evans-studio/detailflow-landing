"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { Target, Shield, Zap, Globe, Phone, Calendar, CreditCard, Search, Settings, Star, 
         Banknote, Workflow, Route, Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://admin.detailor.co.uk";
  const launchActive = (process.env.NEXT_PUBLIC_LAUNCH_ACTIVE ?? 'false') === 'true';

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

  // Add landing page class and smooth scroll enhancement
  React.useEffect(() => {
    document.body.classList.add('landing-page');
    
    // Enhanced smooth scrolling with custom easing
    let isScrolling = false;
    let scrollTarget = 0;
    let currentScroll = 0;
    
    const smoothScrollTo = (target: number) => {
      scrollTarget = target;
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(animateScroll);
      }
    };
    
    // Easing function available for future enhancements
    // const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    
    const animateScroll = () => {
      currentScroll = window.pageYOffset;
      const distance = scrollTarget - currentScroll;
      
      if (Math.abs(distance) < 1) {
        window.scrollTo(0, scrollTarget);
        isScrolling = false;
        return;
      }
      
      const step = distance * 0.08; // Smooth easing factor
      window.scrollTo(0, currentScroll + step);
      requestAnimationFrame(animateScroll);
    };
    
    // Override scroll behavior for links with reduced motion preference
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.hostname === window.location.hostname) {
        const element = document.querySelector(target.hash);
        if (element && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          e.preventDefault();
          const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
          smoothScrollTo(targetPosition);
        }
      }
    };
    
    // Add smooth scroll for anchor links
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.body.classList.remove('landing-page');
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Transparent Header - Only Logo */}
      <div className="transparent-header">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl text-gray-900 font-semibold">Detailor</span>
          </Link>
        </div>
      </div>
      
      <main className="min-h-screen smooth-scroll-container">
        {/* Hero Section - Full Viewport with Transparent Header */}
        <section className="viewport-section relative overflow-hidden detailor-hero-gradient min-h-screen flex items-center">
          {/* Subtle Background Element */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-white"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 pt-32">
            <div className="text-center max-w-5xl mx-auto">
              <div className="animate-fade-in-scale">
                <h1 className="text-enterprise-display text-6xl lg:text-7xl tracking-tight text-gray-900 mb-8">
                  Run your business on{" "}
                  <span className="detailor-brand-text animate-shimmer">
                    autopilot
                  </span>
                </h1>
              </div>
              
              <div className="animate-slide-in-up animate-delay-200">
                <p className="text-enterprise-body text-xl leading-relaxed text-gray-700 mb-12 max-w-3xl mx-auto">
                  The only enterprise-grade, white-label platform that transforms mobile service operations.
                </p>
              </div>

              {/* Hero Content - Restructured */}
              <div className="animate-slide-in-up animate-delay-300 mb-16">
                <div className="text-center">
                  {/* Launch Status */}
                  <div className="mb-8">
                    <span className="text-sm text-gray-500 font-medium tracking-wide">Launching Q4 2025</span>
                  </div>
                  
                  {/* Email Capture Form */}
                  <div className="mb-10">
                    <WaitlistSignup className="max-w-[500px] mx-auto" />
                  </div>
                  
                  {/* Social Proof */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600">
                      Join <span className="font-semibold text-blue-600">500+ detailers</span> on the waitlist
                    </p>
                  </div>
                  
                  {/* Early Bird Offer */}
                  <div>
                    <p className="text-xs text-gray-500">
                      First 100 get 40% off lifetime
                    </p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>


        {/* Everything You Need - Full Viewport Section */}
        <section className="viewport-section min-h-screen flex items-center bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-enterprise-display text-4xl font-bold tracking-tight text-gray-900 mb-6">
                Everything you need in one platform
              </h2>
              <p className="text-enterprise-body text-xl text-gray-600 max-w-3xl mx-auto">
                Professional tools that streamline your mobile service business with booking, payments, and customer management.
              </p>
            </div>
            
            {/* Core Platform Features */}
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Scheduling</h3>
                <p className="text-gray-600 leading-relaxed">
                  Automated booking system that prevents conflicts and optimizes your daily route planning.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Seamless Payments</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get paid faster with automated invoicing, payment reminders, and secure online processing.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Brand</h3>
                <p className="text-gray-600 leading-relaxed">
                  White-label solution that showcases your business professionally across all customer touchpoints.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works / Scrollytelling Section */}
        <section id="how-it-works" className="viewport-section bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>How it works</span>
              </div>
              <h2 className="text-enterprise-display text-4xl font-bold tracking-tight text-gray-900">
                From booking to payment — all in one flow
              </h2>
              <p className="text-enterprise-body text-lg text-gray-700 mt-6 max-w-2xl mx-auto">
                A frictionless experience for your customers and a powerful control center for your team.
              </p>
            </div>
          </div>
          
          {/* ScrollytellingSection - Let it control its own height and sticky positioning */}
          <ScrollytellingSection />
        </section>


        {/* Pricing Section - Hidden during pre-launch */}
        {false && <section id="pricing" className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-20"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20">
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
        </section>}

        {/* Problem/Solution Narrative Section */}
        <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-20">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>The Problem vs The Solution</span>
              </div>
              <h2 className="text-enterprise-display text-5xl font-bold tracking-tight text-gray-900 mb-6">
                From <span className="text-red-600">chaos</span> to <span className="text-blue-600">control</span>
              </h2>
              <p className="text-enterprise-body text-xl text-gray-700 max-w-3xl mx-auto">
                Most mobile service businesses struggle with the same operational nightmares. Detailor transforms every pain point into a competitive advantage.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: Problems (Chaos) */}
              <div className="relative">
                <div className="absolute inset-0 bg-red-600/5 rounded-2xl"></div>
                <div className="relative p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Without Detailor</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: Phone,
                        problem: "Phone tag hell",
                        description: "Endless back-and-forth calls just to book a simple appointment"
                      },
                      {
                        icon: Calendar,
                        problem: "Manual scheduling chaos",
                        description: "Double bookings, missed appointments, and confused customers"
                      },
                      {
                        icon: CreditCard,
                        problem: "Payment nightmares",
                        description: "Chasing unpaid invoices and cash flow problems"
                      },
                      {
                        icon: Search,
                        problem: "Invisible business",
                        description: "No online presence means missing out on new customers"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.problem}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-red-600" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{item.problem}</h4>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block absolute left-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent transform -translate-x-1/2"></div>

              {/* Right: Solutions (Control) */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/5 rounded-2xl"></div>
                <div className="relative p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">With Detailor</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: Zap,
                        solution: "Instant bookings",
                        description: "Customers book in under 3 minutes from any device, anywhere"
                      },
                      {
                        icon: Settings,
                        solution: "Smart automation",
                        description: "Smart automation prevents conflicts and optimizes your schedule automatically"
                      },
                      {
                        icon: CreditCard,
                        solution: "Seamless payments",
                        description: "Get paid instantly with automated invoicing and reminders"
                      },
                      {
                        icon: Star,
                        solution: "Professional presence",
                        description: "White-label platform that showcases your brand professionally"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.solution}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{item.solution}</h4>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-20 text-center">
              <div className="inline-flex items-center gap-8 bg-gradient-to-r from-blue-50 to-green-50 px-8 py-6 rounded-2xl border border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">30%+</div>
                  <div className="text-sm text-gray-600">Revenue Growth</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">60%</div>
                  <div className="text-sm text-gray-600">Less No-Shows</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">5hrs+</div>
                  <div className="text-sm text-gray-600">Saved Weekly</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Depth Grid Section */}
        <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-grid-gray-100/50 bg-[size:32px_32px] opacity-30"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-20">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                </svg>
                <span>Deep Feature Showcase</span>
              </div>
              <h2 className="text-enterprise-display text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Built for <span className="detailor-brand-text">serious operators</span>
              </h2>
              <p className="text-enterprise-body text-xl text-gray-700 max-w-3xl mx-auto">
                Every feature is designed to solve real problems that mobile service businesses face every day. No fluff, just powerful tools that deliver results.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Smart Territory Management",
                  description: "Define service zones, calculate travel time automatically, and optimize routes to maximize efficiency. Never waste time or fuel on poorly planned routes.",
                  highlight: "Route optimization"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-level encryption, SOC2 compliance, and automatic backups. Your business data is protected with enterprise-grade security infrastructure.",
                  highlight: "SOC2 compliant"
                },
                {
                  icon: Globe,
                  title: "Multi-Location Support",
                  description: "Manage multiple service areas, teams, and territories from one dashboard. Perfect for growing businesses with multiple crews or locations.",
                  highlight: "Scale infinitely"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{feature.description}</p>
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span>{feature.highlight}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to action within features */}
            <div className="mt-20">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-xl"></div>
                <div className="relative text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    See these features in action
                  </h3>
                  <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                    Every feature is built from real feedback from mobile service professionals. No theoretical solutions—just practical tools that work.
                  </p>
                  <div className="flex justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                      Request Demo
                      <svg className="w-5 h-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276a1 1 0 011.447.894v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Enhanced Email Capture Section */}
        <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Join the Waitlist</span>
              </div>
              <h2 className="text-enterprise-display text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Be the first to <span className="detailor-brand-text">transform your business</span>
              </h2>
              <p className="text-enterprise-body text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                Get notified when Detailor launches in Q4 2025. Be among the first to experience the future of mobile service management.
              </p>
            </div>

            {/* Email Capture Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative overflow-hidden max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/30"></div>
              <div className="relative">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <input
                    type="email"
                    placeholder="Enter your business email"
                    className="flex-1 px-6 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join Waitlist
                    <svg className="w-5 h-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>
                </div>

              </div>
            </div>


            {/* FAQ Snippet */}
            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <div className="bg-white/80 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">When will Detailor launch?</h4>
                <p className="text-gray-600">We&apos;re launching in Q4 2025. Waitlist members get 30-day early access.</p>
              </div>
              <div className="bg-white/80 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">What&apos;s included in early access?</h4>
                <p className="text-gray-600">Full platform access, 50% off first year, and dedicated support.</p>
              </div>
            </div>
          </div>
        </section>




        {/* Footer */}
        <footer className="bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
            <div className="flex items-center justify-center">
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Detailor
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
    <div className="w-full h-full bg-transparent p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-600" strokeWidth={2} />
          <h3 className="font-semibold text-gray-900 text-base">Today&apos;s Bookings</h3>
        </div>
        <span className="text-blue-600 font-bold text-lg">12</span>
      </div>
      
      {/* Simplified Booking Cards */}
      <div className="flex-1 space-y-4">
        <div className="border-l-4 border-blue-500 border-t border-r border-b border-gray-100 rounded-lg bg-white/50 px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-900 text-sm truncate pr-2">Premium Detail</span>
            <span className="font-bold text-gray-900 text-base flex-shrink-0">£85</span>
          </div>
          <div className="text-gray-600 text-sm">Sarah M. • 2:30 PM</div>
          <div className="text-blue-600 text-xs font-medium mt-1">✓ Confirmed</div>
        </div>
        
        <div className="border-l-4 border-green-500 border-t border-r border-b border-gray-100 rounded-lg bg-white/50 px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-900 text-sm truncate pr-2">Express Wash</span>
            <span className="font-bold text-gray-900 text-base flex-shrink-0">£35</span>
          </div>
          <div className="text-gray-600 text-sm">Mike R. • 4:00 PM</div>
          <div className="text-green-600 text-xs font-medium mt-1">→ In Progress</div>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">£240</div>
            <div className="text-gray-600 text-xs">Today&apos;s Revenue</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
            <div className="text-gray-600 text-xs">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SchedulingDashboard() {
  return (
    <div className="w-full h-full bg-transparent p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Route className="w-5 h-5 text-green-600" strokeWidth={2} />
          <h3 className="font-semibold text-gray-900 text-base">Smart Schedule</h3>
        </div>
        <span className="text-green-600 font-bold text-xs">92% Efficient</span>
      </div>
      
      {/* Simplified Schedule List */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-4">
          <span className="w-14 text-gray-600 text-sm font-medium">10:00</span>
          <div className="flex-1">
            <div className="font-medium text-gray-900 text-sm">BMW Detail</div>
            <div className="text-gray-600 text-xs">Sarah M. • 2.1km travel</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="w-14 text-gray-600 text-sm font-medium">14:00</span>
          <div className="flex-1">
            <div className="font-medium text-gray-900 text-sm">Tesla Wash</div>
            <div className="text-gray-600 text-xs">Mike R. • 0.8km travel</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="w-14 text-gray-600 text-sm font-medium">18:00</span>
          <div className="flex-1">
            <div className="font-medium text-gray-900 text-sm">Range Rover Service</div>
            <div className="text-gray-600 text-xs">Emma T. • 1.3km travel</div>
          </div>
        </div>
      </div>
      
      {/* Key Optimization Metrics */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600 mb-1">18m</div>
            <div className="text-gray-600 text-xs">Time Saved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 mb-1">4.2km</div>
            <div className="text-gray-600 text-xs">Less Travel</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentsDashboard() {
  return (
    <div className="w-full h-full bg-transparent p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Banknote className="w-5 h-5 text-blue-600" strokeWidth={2} />
          <h3 className="font-semibold text-gray-900 text-base">Payment Center</h3>
        </div>
        <span className="text-green-600 font-bold text-xs">90% Automated</span>
      </div>
      
      {/* Simplified Payment Items */}
      <div className="flex-1 space-y-4">
        <div className="border-l-4 border-green-500 border-t border-r border-b border-gray-100 rounded-lg bg-white/50 px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-900 text-sm truncate pr-2">Invoice #1024</span>
            <span className="font-bold text-gray-900 text-base flex-shrink-0">£85</span>
          </div>
          <div className="text-gray-600 text-sm">Sarah M. • 2h ago</div>
          <div className="text-green-600 text-xs font-medium mt-1">✓ Paid Automatically</div>
        </div>
        
        <div className="border-l-4 border-blue-500 border-t border-r border-b border-gray-100 rounded-lg bg-white/50 px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-900 text-sm truncate pr-2">Invoice #1025</span>
            <span className="font-bold text-gray-900 text-base flex-shrink-0">£35</span>
          </div>
          <div className="text-gray-600 text-sm">Mike R. • Processing</div>
          <div className="text-blue-600 text-xs font-medium mt-1">→ Auto-reminder sent</div>
        </div>
      </div>
      
      {/* Automation Metrics */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600 mb-1">90%</div>
            <div className="text-gray-600 text-xs">Paid Automatically</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 mb-1">2.1x</div>
            <div className="text-gray-600 text-xs">Faster Collection</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationDashboard() {
  return (
    <div className="w-full h-full bg-transparent p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Workflow className="w-5 h-5 text-orange-600" strokeWidth={2} />
          <h3 className="font-semibold text-gray-900 text-base">Automation Hub</h3>
        </div>
        <span className="text-green-600 font-bold text-xs">24/7 Active</span>
      </div>
      
      {/* Simplified Workflow Items */}
      <div className="flex-1 space-y-4">
        <div className="border-l-4 border-purple-500 border-t border-r border-b border-gray-100 rounded-lg bg-white/50 px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-900 text-sm truncate pr-2">Booking Reminders</span>
            <span className="text-purple-600 font-bold text-xs flex-shrink-0">100% Rate</span>
          </div>
          <div className="text-gray-600 text-sm">24h before appointments</div>
          <div className="text-purple-600 text-xs font-medium mt-1">→ 3 sent today</div>
        </div>
        
        <div className="border-l-4 border-blue-500 border-t border-r border-b border-gray-100 rounded-lg bg-white/50 px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-900 text-sm truncate pr-2">Review Collection</span>
            <span className="text-blue-600 font-bold text-xs flex-shrink-0">80% Rate</span>
          </div>
          <div className="text-gray-600 text-sm">2h after completion</div>
          <div className="text-blue-600 text-xs font-medium mt-1">→ 5 sent, 2 reviews</div>
        </div>
        
        <div className="border-l-4 border-green-500 border-t border-r border-b border-gray-100 rounded-lg bg-white/50 px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-900 text-sm truncate pr-2">Payment Recovery</span>
            <span className="text-green-600 font-bold text-xs flex-shrink-0">£120 Today</span>
          </div>
          <div className="text-gray-600 text-sm">Smart overdue triggers</div>
          <div className="text-green-600 text-xs font-medium mt-1">→ 1 reminder sent</div>
        </div>
      </div>
      
      {/* 24/7 Performance Stats */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-600 mb-1">£380</div>
            <div className="text-gray-600 text-xs">Generated Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 mb-1">92%</div>
            <div className="text-gray-600 text-xs">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Waitlist Signup Component
function WaitlistSignup({ className = "" }: { className?: string }) {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');
  const [queuePosition, setQueuePosition] = React.useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Check if already in localStorage
    const storedEmail = localStorage.getItem('waitlist-email');
    if (storedEmail === email.trim()) {
      setStatus('error');
      setMessage('You\'re already on our waitlist! We\'ll notify you when we launch.');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        // Use real position from API or fallback
        const realPosition = data.position || Math.floor(Math.random() * 200) + 150;
        setQueuePosition(realPosition);
        setMessage('🎉 You\'re on the waitlist! You\'ll be among the first to get access.');
        
        // Store email to prevent duplicates
        localStorage.setItem('waitlist-email', email.toLowerCase().trim());
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }

    // Reset status after 8 seconds for success, 5 for error
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
      setQueuePosition(null);
    }, status === 'success' ? 8000 : 5000);
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <div className="flex-1 relative">
          {status === 'loading' && (
            <div className="absolute inset-0 bg-gray-100 rounded-lg animate-pulse"></div>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative z-10 bg-white"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || !email.trim() || status === 'success'}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-semibold rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] transform hover:scale-105 active:scale-95"
        >
          {status === 'loading' ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>Joining...</span>
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Joined!</span>
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              <span>Join Waitlist</span>
            </>
          )}
        </button>
      </form>
      
      {/* Status Messages */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`mt-4 p-4 rounded-lg max-w-md mx-auto text-sm ${
            status === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          <div className="flex items-center justify-center mb-2">
            {status === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            )}
            <span className="font-medium">{message}</span>
          </div>
          {queuePosition && status === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-green-600 font-semibold text-xs"
            >
              You&rsquo;re #{queuePosition} in line • First 100 get 40% off lifetime!
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// Scrollytelling Section Component
function ScrollytellingSection() {
  const steps = [
    {
      number: "01",
      title: "Customers book instantly",
      description: "3-minute booking flow on any device, any time. No more phone tag or missed opportunities.",
      component: BookingDashboard
    },
    {
      number: "02", 
      title: "Smart schedule optimization",
      description: "Route optimization with travel time awareness eliminates conflicts and maximizes daily revenue.",
      component: SchedulingDashboard
    },
    {
      number: "03",
      title: "Get paid automatically", 
      description: "Instant payments, automated invoicing, and smart reminders reduce chasing by 90%.",
      component: PaymentsDashboard
    },
    {
      number: "04",
      title: "Your business runs itself",
      description: "Automated follow-ups, review collection, and retention campaigns work 24/7.",
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

  // Map scroll progress to active step with full range coverage
  const activeStepFloat = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);
  const [activeStep, setActiveStep] = React.useState(0);

  useMotionValueEvent(activeStepFloat, "change", (value) => {
    setActiveStep(Math.round(Math.max(0, Math.min(3, value))));
  });

  return (
    <section ref={containerRef} className="relative hidden md:block max-md:hidden" style={{ height: '400vh' }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Steps */}
            <div className="relative">
              
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
              <div className="mx-auto w-80 max-w-full py-8 lg:py-12">
                <div className="relative">
                  {/* Enhanced iPhone Mockup with Better Effects */}
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Ambient glow behind device */}
                    <div className="absolute -inset-8 bg-gradient-to-br from-blue-400/20 via-purple-400/10 to-green-400/20 blur-3xl rounded-[3rem] opacity-60 animate-pulse" 
                         style={{ animationDuration: '4s' }}></div>
                    
                    {/* Secondary glow layer */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-white/30 to-blue-200/20 blur-2xl rounded-[2rem]"></div>
                    
                    {/* Real iPhone Mockup - Enhanced */}
                    <Image 
                      src="/mockup.png" 
                      alt="iPhone mockup showing Detailor dashboard interface"
                      width={320}
                      height={640}
                      className="relative z-10 w-full h-auto drop-shadow-2xl filter brightness-105"
                      style={{
                        filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15)) drop-shadow(0 10px 20px rgba(59, 130, 246, 0.1))'
                      }}
                      priority
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    
                    {/* Screen reflection overlay */}
                    <div className="absolute top-[8%] left-[8%] right-[8%] bottom-[10%] z-20 pointer-events-none">
                      <div className="w-full h-full rounded-[1.5rem] bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
                    </div>
                  </motion.div>
                  
                  {/* Dashboard content positioned to fit perfectly within iPhone screen */}
                  <div className="absolute top-[7%] left-[7%] right-[7%] bottom-[9%] z-15 rounded-[1.8rem] overflow-hidden bg-transparent">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
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

  // Map scroll progress to steps with smoother, more even distribution
  const revealProgress = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 3]);
  const [currentReveal, setCurrentReveal] = React.useState(0);

  // Track current reveal stage
  useMotionValueEvent(revealProgress, "change", (value) => {
    setCurrentReveal(Math.round(Math.max(0, Math.min(3, value))));
  });

  return (
    <section ref={containerRef} className="block md:hidden max-md:block relative h-[400vh] bg-gray-50 py-16 lg:py-20">
      
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

        {/* Central Device - Positioned Higher with Extra Padding */}
        <motion.div 
          className="relative z-10 w-64 max-w-full mb-8 py-6"
          whileHover={{ scale: 1.02 }}
          style={{ willChange: 'transform' }}
        >
          
          {/* Enhanced Mobile iPhone Mockup */}
          <div className="relative">
            {/* Enhanced ambient glow layers */}
            <div className="absolute -inset-6 bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-green-400/20 blur-2xl rounded-[2.5rem] opacity-70 animate-pulse" 
                 style={{ animationDuration: '3s' }}></div>
            <div className="absolute -inset-3 bg-gradient-to-br from-white/40 to-blue-200/30 blur-xl rounded-[2rem]"></div>
            
            <Image 
              src="/mockup.png" 
              alt="iPhone mockup showing Detailor dashboard interface"
              width={256}
              height={512}
              className="relative z-10 w-full h-auto drop-shadow-2xl filter brightness-105"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 8px 15px rgba(59, 130, 246, 0.1))'
              }}
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            
            {/* Enhanced screen reflection */}
            <div className="absolute top-[8%] left-[8%] right-[8%] bottom-[10%] z-20 pointer-events-none">
              <div className="w-full h-full rounded-[1.2rem] bg-gradient-to-br from-white/8 via-transparent to-transparent"></div>
            </div>
            
            {/* Dashboard content positioned to fit perfectly within iPhone screen */}
            <div className="absolute top-[7%] left-[7%] right-[7%] bottom-[9%] z-15 rounded-[1.5rem] overflow-hidden bg-transparent">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReveal}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
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
        </motion.div>

        {/* Enhanced Content Text - Always Visible Below Phone */}
        <div className="relative z-20 px-4 max-w-sm w-full">
          <AnimatePresence mode="wait">
            {currentReveal >= 0 && currentReveal < steps.length && (
              <motion.div
                key={currentReveal}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-white/50 text-center relative overflow-hidden"
              >
                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 rounded-2xl"></div>
                
                <div className="relative z-10">
                  {/* Enhanced step number with animation */}
                  <motion.div 
                    className="flex items-center justify-center gap-2 mb-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
                  >
                    <span className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-base font-bold shadow-xl relative">
                      {steps[currentReveal]?.number}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                    </span>
                  </motion.div>
                  
                  {/* Enhanced title with stagger animation */}
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-3 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {steps[currentReveal]?.title}
                  </motion.h3>
                  
                  {/* Enhanced description with reveal animation */}
                  <motion.p 
                    className="text-gray-700 leading-relaxed text-sm font-medium mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {steps[currentReveal]?.description}
                  </motion.p>
                  
                  {/* Enhanced Progress Dots with individual animations */}
                  <div className="flex items-center justify-center gap-2">
                    {steps.map((_, i) => (
                      <motion.div 
                        key={i} 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          i === currentReveal ? 'bg-blue-600 w-8' : 'bg-gray-300 w-2'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Enhanced floating elements for visual interest */}
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400/30 rounded-full blur-sm"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-400/20 rounded-full blur-sm"
                  animate={{
                    y: [0, 8, 0],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>


    </section>
  );
}



