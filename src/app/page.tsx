"use client";
import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://detailflow.vercel.app";
  const priceStarter = process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "";
  const pricePro = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || "";
  const priceEnterprise = process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || "";

  const handleCheckout = (priceId: string) => {
    const url = `${appUrl}/api/payments/checkout?price_id=${encodeURIComponent(priceId)}`;
    window.location.href = url;
  };

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
        {/* Hero Section - True 50/50 Split */}
        <section className="relative overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Run your mobile service business on{" "}
                <span className="text-blue-600">autopilot</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                DetailFlow is the white-label booking and payments platform built for mobile service operators — bookings, scheduling, payments, and messaging in one place.
              </p>
              <div className="mt-8 flex gap-4 justify-center">
                <button
                  onClick={() => handleCheckout(priceStarter)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Start Free Trial
                </button>
                <a
                  href={`${appUrl}/signin`}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Sign in
                </a>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                14-day free trial • No credit card required
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-center text-xs uppercase tracking-wider text-gray-500 mb-8">
              Trusted by modern mobile service brands
            </p>
            <div className="flex justify-center items-center gap-8 opacity-50 grayscale">
              {["globe.svg", "file.svg", "window.svg", "vercel.svg", "next.svg"].map((src) => (
                <div key={src} className="w-[120px] hover:opacity-100 transition-opacity duration-200">
                  <Image src={`/${src}`} alt="Partner logo" width={120} height={40} className="h-8 w-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scrollytelling Section - Correct Implementation */}
        <ScrollytellingSection />

        {/* Features Grid - Clean Layout */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                Everything you need to scale
              </h2>
              <p className="text-lg text-gray-600">
                Professional tools for modern mobile service businesses
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: IconShield,
                  title: "White-label ready",
                  description: "Your brand, your domain, your customer experience."
                },
                {
                  icon: IconBolt,
                  title: "Realtime ops",
                  description: "Live updates for bookings, payments, and messages."
                },
                {
                  icon: IconChart,
                  title: "Smart pricing",
                  description: "Dynamic pricing to lift revenue by 25–40%."
                },
                {
                  icon: IconUser,
                  title: "Customer portal",
                  description: "Self-serve reschedules, invoices, and payments."
                },
                {
                  icon: IconMail,
                  title: "Messaging automation",
                  description: "Reminders, follow-ups, and review requests."
                },
                {
                  icon: IconGraph,
                  title: "Insights",
                  description: "Track KPIs that matter and export your data."
                }
              ].map((feature) => (
                <div key={feature.title} className="text-center group cursor-pointer">
                  <div className="w-12 h-12 mx-auto text-blue-600 transition-transform duration-200 group-hover:scale-110">
                    <feature.icon className="w-full h-full" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-lg text-gray-600">
                Choose the plan that fits your business needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Starter",
                  price: "£49",
                  popular: false,
                  pid: priceStarter,
                  features: [
                    "Up to 100 bookings/month",
                    "Simple drag-and-drop calendar scheduling",
                    "Mobile-friendly design for customers",
                    "Automatic confirmations & reminders",
                    "Email support included"
                  ]
                },
                {
                  name: "Pro",
                  price: "£99",
                  popular: true,
                  pid: pricePro,
                  features: [
                    "Everything in Starter",
                    "Up to 300 booking/month",
                    "Customer dashboard with saved vehicles & addresses",
                    "Advanced analytics & Service reports",
                    "Email support included"
                  ]
                },
                {
                  name: "Enterprise",
                  price: "£199",
                  popular: false,
                  pid: priceEnterprise,
                  features: [
                    "Everything in Pro",
                    "Unlimited bookings",
                    "API & Custom intergrations",
                    "SLA-backed uptime guarantee",
                    "Multi-van and multi-staff scheduling"
                  ]
                }
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-xl p-8 ${
                    plan.popular
                      ? 'border-2 border-blue-600 shadow-lg'
                      : 'border border-gray-200 shadow-sm'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </p>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <svg className="h-5 w-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleCheckout(plan.pid)}
                    className={`w-full mt-8 py-3 rounded-lg font-medium transition-colors duration-200 ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ */}
        <FAQ />

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
              <div className="flex gap-3">
                <button 
                  onClick={() => handleCheckout(priceStarter)}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Start Free Trial
                </button>
                <a 
                  href={`${appUrl}/signin`}
                  className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-colors duration-200 font-medium"
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
                © {new Date().getFullYear()} DetailFlow
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
    <div className="w-full h-full bg-white p-2 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="font-bold text-gray-900 text-sm">Today&apos;s Bookings</h3>
        <span className="text-blue-600 font-bold text-lg">12</span>
      </div>
      
      {/* Booking Cards */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
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
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
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
          <div className="text-center bg-blue-50 rounded-lg py-2">
            <div className="font-bold text-blue-600 text-lg">£240</div>
            <div className="text-gray-600 text-xs font-medium">Today&apos;s Revenue</div>
          </div>
          <div className="text-center bg-green-50 rounded-lg py-2">
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
    <div className="w-full h-full bg-white p-2 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="font-bold text-gray-900 text-sm">Schedule</h3>
        <span className="text-sm text-blue-600 font-bold">Oct 24</span>
      </div>
      
      {/* Time Slots */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="w-12 text-gray-600 text-xs font-bold">9:00</span>
          <div className="flex-1 bg-blue-100 border border-blue-200 rounded-md px-2 py-1.5">
            <span className="text-blue-800 font-semibold text-xs">Setup & Travel</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-12 text-gray-600 text-xs font-bold">10:00</span>
          <div className="flex-1 bg-green-100 border border-green-200 rounded-md px-2 py-1.5">
            <span className="text-green-800 font-semibold text-xs">BMW Detail - Sarah</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-12 text-gray-600 text-xs font-bold">12:00</span>
          <div className="flex-1 bg-yellow-100 border border-yellow-200 rounded-md px-2 py-1.5">
            <span className="text-yellow-800 font-semibold text-xs">Lunch Break</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-12 text-gray-600 text-xs font-bold">14:00</span>
          <div className="flex-1 bg-green-100 border border-green-200 rounded-md px-2 py-1.5">
            <span className="text-green-800 font-semibold text-xs">Tesla Wash - Mike</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-12 text-gray-600 text-xs font-bold">16:00</span>
          <div className="flex-1 bg-purple-100 border border-purple-200 rounded-md px-2 py-1.5">
            <span className="text-purple-800 font-semibold text-xs">Travel Time</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-12 text-gray-600 text-xs font-bold">18:00</span>
          <div className="flex-1 bg-green-100 border border-green-200 rounded-md px-2 py-1.5">
            <span className="text-green-800 font-semibold text-xs">Range Rover - Emma</span>
          </div>
        </div>
      </div>
      
      {/* Efficiency Indicator */}
      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="bg-green-50 rounded-lg p-2">
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
    <div className="w-full h-full bg-white p-2 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="font-bold text-gray-900 text-sm">Payments</h3>
        <span className="text-green-600 font-bold text-lg">+£85</span>
      </div>
      
      {/* Payment Items */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
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
        
        <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200">
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
        
        <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg border border-red-200">
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
          <div className="text-center bg-red-50 rounded-lg py-1.5">
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
    <div className="w-full h-full bg-white p-2 flex flex-col">
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
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-gray-800 text-sm">Booking Reminders</span>
          </div>
          <div className="text-gray-700 text-xs font-medium mb-1">24h before appointment</div>
          <div className="text-purple-600 text-xs font-bold">3 sent today</div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
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
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
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
          <div className="text-center bg-purple-50 rounded-lg py-1.5">
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

  // Map scroll progress to active step (0, 1, 2, 3) - Snappier transitions
  const activeStepFloat = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.65, 1], [0, 1, 2, 3, 3]);
  const [activeStep, setActiveStep] = React.useState(0);

  useMotionValueEvent(activeStepFloat, "change", (value) => {
    setActiveStep(Math.round(value));
  });

  return (
    <section ref={containerRef} className="relative hidden md:block max-md:hidden" style={{ height: '320vh' }}>
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
              <div className="mx-auto max-w-sm">
                <div className="relative">
                  {/* Real iPhone Mockup */}
                  <Image 
                    src="/mockup.png" 
                    alt="iPhone mockup"
                    width={300}
                    height={600}
                    className="w-full h-auto drop-shadow-2xl"
                    priority
                  />
                  
                  {/* Dashboard content positioned over transparent screen area */}
                  <div className="absolute top-[8%] left-[8%] right-[8%] bottom-[12%] overflow-hidden">
                    <div className="w-full h-full relative bg-white rounded-[2rem]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeStep}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="absolute inset-0 overflow-hidden"
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

  // Map scroll progress to steps (0, 1, 2, 3) - Snappier transitions
  const revealProgress = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.65, 1], [0, 1, 2, 3, 3]);
  const [currentReveal, setCurrentReveal] = React.useState(0);

  // Track current reveal stage
  useMotionValueEvent(revealProgress, "change", (value) => {
    setCurrentReveal(Math.round(value));
  });

  return (
    <section ref={containerRef} className="block md:hidden max-md:block relative h-[320vh] bg-gray-50">
      
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
          className="relative z-10 w-56 mb-6"
          whileHover={{ scale: 1.02 }}
          style={{ willChange: 'transform' }}
        >
          
          {/* Real iPhone Mockup */}
          <div className="relative">
            <Image 
              src="/mockup.png" 
              alt="iPhone mockup"
              width={280}
              height={560}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
            
            {/* Dashboard content positioned over transparent screen area */}
            <div className="absolute top-[8%] left-[8%] right-[8%] bottom-[12%] overflow-hidden">
              <div className="w-full h-full relative bg-white rounded-[2rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReveal}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 overflow-hidden"
                  >
                    {steps[Math.min(currentReveal, steps.length - 1)]?.component &&
                      React.createElement(steps[Math.min(currentReveal, steps.length - 1)].component)
                    }
                  </motion.div>
                </AnimatePresence>
              </div>
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
            Join thousands of mobile service businesses growing with DetailFlow
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
      a: "Yes, DetailFlow is completely white-label. You can add your own domain, upload your logo, customize colors, and create a seamless branded experience for your customers." 
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
            Everything you need to know about DetailFlow
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