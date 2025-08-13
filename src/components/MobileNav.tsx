"use client";
import * as React from "react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

export function MobileNav() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://admin.detailor.co.uk';
  const [open, setOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 300);
  };

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { 
      if (e.key === "Escape") handleClose(); 
    };
    window.addEventListener("keydown", onKey);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const navItems = [
    { href: "#features", label: "Features", icon: "⚡" },
    { href: "#pricing", label: "Pricing", icon: "💎" },
    { href: "#faq", label: "FAQ", icon: "❓" }
  ];

  return (
    <div className="md:hidden">
      <Button
        variant="ghost" 
        size="icon"
        onClick={() => setOpen(true)}
        className="enterprise-lift"
        aria-label="Open navigation menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>

      {open && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]" 
            onClick={handleClose} 
          />
          
          {/* Menu Panel */}
          <div className={`mobile-menu ${isClosing ? 'closing' : ''} absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-lg shadow-2xl border-l border-gray-200 p-6 flex flex-col`}>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="font-bold text-xl text-gray-900">Detailor</span>
                <Badge variant="premium" size="sm">Pro</Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="hover:bg-gray-100"
                aria-label="Close navigation menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="flex flex-col gap-2 mb-8">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleClose}
                  className={`nav-item flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 transform hover:translate-x-1 interactive-element`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>

            {/* Trust Badge */}
            <div className="mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">14-day free trial</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex flex-col gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => {
                  window.location.href = `${appUrl}/signin`;
                }}
                className="justify-center"
              >
                Sign In
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                </svg>
              </Button>
              <Button
                variant="gradient"
                fullWidth
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                shine
                className="justify-center"
              >
                Start Free Trial
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-xl"></div>
          </div>
        </div>
      )}
    </div>
  );
}


