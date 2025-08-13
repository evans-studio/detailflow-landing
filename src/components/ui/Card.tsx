"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "relative overflow-hidden transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200 shadow-sm hover:shadow-lg",
        elevated: "bg-white border border-gray-200 shadow-md hover:shadow-xl",
        feature: "bg-white border-2 border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-lg transform hover:translateY(-2px)",
        pricing: "bg-white border border-gray-200 shadow-lg hover:shadow-2xl transform hover:translateY(-4px) hover:scale-[1.02]",
        testimonial: "bg-gray-50 border border-gray-200 shadow-sm hover:shadow-lg transform hover:translateY(-2px)",
        magnetic: "bg-white border border-gray-200 shadow-md hover:shadow-xl transform-gpu perspective-1000"
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10"
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
        xl: "rounded-3xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "md"
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  shine?: boolean;
  magnetic?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, radius, shine = false, magnetic = false, children, ...props }, ref) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const cardRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => cardRef.current!);

    const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (!magnetic) return;
      
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      setMousePosition({ x: mouseX * 0.1, y: mouseY * 0.1 });
    }, [magnetic]);

    const handleMouseLeave = React.useCallback(() => {
      if (magnetic) {
        setMousePosition({ x: 0, y: 0 });
      }
    }, [magnetic]);

    return (
      <div
        ref={cardRef}
        className={cardVariants({ variant, size, radius, className })}
        style={
          magnetic
            ? {
                transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) translateZ(${Math.abs(mousePosition.x) + Math.abs(mousePosition.y)}px)`,
                transition: magnetic ? 'transform 0.2s ease-out' : undefined
              }
            : undefined
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {shine && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)`,
              transform: 'translateX(-100%)',
              animation: 'var(--card-shine, none)'
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 ${className || ""}`}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`font-semibold leading-none tracking-tight ${className || ""}`}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-gray-600 ${className || ""}`}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`pt-0 ${className || ""}`} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center pt-6 ${className || ""}`}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };