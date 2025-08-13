"use client";

import * as React from "react";
import { Card, CardContent } from "./Card";
import { Badge } from "./Badge";

interface TestimonialProps {
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
    initials?: string;
  };
  rating?: number;
  verified?: boolean;
  delay?: number;
}

export function TestimonialCard({ content, author, rating = 5, verified = false, delay = 0 }: TestimonialProps) {
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
        variant="testimonial" 
        size="lg" 
        radius="lg"
        className="testimonial-slide group h-full relative"
      >
        <CardContent className="pt-6">
          {/* Quote Icon */}
          <div className="mb-4">
            <svg
              className="w-8 h-8 text-blue-500 opacity-50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>
          </div>

          {/* Content */}
          <p className="text-gray-700 leading-relaxed mb-6 text-lg italic">
            &ldquo;{content}&rdquo;
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            {verified && (
              <Badge variant="success" size="sm" className="ml-2">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </Badge>
            )}
          </div>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {author.avatar ? (
                <div 
                  className="w-12 h-12 rounded-full bg-cover bg-center bg-gray-200"
                  style={{ backgroundImage: `url(${author.avatar})` }}
                  role="img"
                  aria-label={author.name}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                  {author.initials || author.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                {author.name}
              </p>
              <p className="text-sm text-gray-600 group-hover:text-gray-500 transition-colors">
                {author.role} at {author.company}
              </p>
            </div>
          </div>
        </CardContent>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 rounded-xl" />
        </div>
      </Card>
    </div>
  );
}