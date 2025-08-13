"use client";

import * as React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";

interface PricingPlan {
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  enterprise?: boolean;
  buttonText?: string;
  buttonVariant?: "primary" | "outline" | "gradient";
  priceId: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan: (priceId: string) => void;
  delay?: number;
}

export function PricingCard({ plan, onSelectPlan, delay = 0 }: PricingCardProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <Card 
        variant="pricing"
        size="lg"
        radius="lg"
        className={`pricing-card relative ${
          plan.popular ? 'border-blue-500 shadow-blue-500/20 scale-105' : ''
        } ${plan.enterprise ? 'border-gradient-to-br from-blue-500 to-indigo-600' : ''}`}
        magnetic
        shine
      >
        <CardHeader className="text-center">
          <div className="relative">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              {plan.name}
            </CardTitle>
            {plan.popular && (
              <Badge 
                variant="premium" 
                animation="glow"
                className="absolute -top-3 left-1/2 transform -translate-x-1/2"
              >
                Most Popular
              </Badge>
            )}
            {plan.enterprise && (
              <Badge 
                variant="glow" 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2"
              >
                Enterprise
              </Badge>
            )}
          </div>

          <div className="py-4">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-gray-900">
                {plan.price}
              </span>
              {plan.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {plan.originalPrice}
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-1">{plan.period}</p>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed">
            {plan.description}
          </p>
        </CardHeader>

        <CardContent>
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <Button
            fullWidth
            variant={plan.buttonVariant || (plan.popular ? "gradient" : "outline")}
            size="lg"
            onClick={() => onSelectPlan(plan.priceId)}
            shine={plan.popular}
            className="font-semibold"
          >
            {plan.buttonText || "Get Started"}
            <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </CardFooter>

        {/* Background Pattern */}
        {plan.popular && (
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600" />
          </div>
        )}
      </Card>
    </div>
  );
}