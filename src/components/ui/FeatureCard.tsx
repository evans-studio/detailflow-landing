"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card";
import { Badge } from "./Badge";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  premium?: boolean;
  delay?: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  color = "text-blue-600",
  bgColor = "bg-blue-50",
  borderColor = "border-blue-200",
  premium = false,
  delay = 0
}: FeatureCardProps) {
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
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <Card 
        variant="feature" 
        size="lg" 
        radius="lg"
        className={`group ${bgColor} border-2 ${borderColor} hover:border-opacity-60 relative overflow-hidden`}
        magnetic
        shine
      >
        <CardHeader>
          <div className="relative">
            <div className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center mb-6 feature-icon ${color} group-hover:scale-110 shadow-sm transition-all duration-300`}>
              <Icon className="w-8 h-8" strokeWidth={1.5} />
            </div>
            {premium && (
              <Badge 
                variant="premium" 
                size="sm" 
                className="absolute -top-2 -right-2"
              >
                Premium
              </Badge>
            )}
            {badge && (
              <Badge 
                variant="glow" 
                size="sm" 
                className="absolute -top-2 -right-2"
              >
                {badge}
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-700 leading-relaxed group-hover:text-gray-600 transition-colors">
            {description}
          </CardDescription>
        </CardContent>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10`} />
        </div>
      </Card>
    </div>
  );
}