"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform-gpu",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        secondary: "border border-gray-300 bg-white text-gray-900 shadow-sm hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        outline: "border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        shine: "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] relative overflow-hidden"
      },
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-10 px-4 py-2",
        md: "h-11 px-6 py-2.5",
        lg: "h-12 px-8 py-3 text-base",
        xl: "h-14 px-10 py-4 text-lg",
        icon: "h-10 w-10"
      },
      fullWidth: {
        true: "w-full",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  shine?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, shine, children, disabled, ...props }, ref) => {
    const [isShining, setIsShining] = React.useState(false);

    const handleMouseEnter = () => {
      if (shine && variant === "shine") {
        setIsShining(true);
        setTimeout(() => setIsShining(false), 600);
      }
    };

    return (
      <button
        className={buttonVariants({ variant, size, fullWidth, className })}
        ref={ref}
        disabled={disabled || loading}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {shine && variant === "shine" && (
          <div
            className={`absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-600 ${
              isShining ? "translate-x-full" : "-translate-x-full"
            }`}
          />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };