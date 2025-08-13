"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
        secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline: "border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
        destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
        success: "border-transparent bg-green-600 text-white hover:bg-green-700",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        premium: "border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700",
        glow: "border-blue-200 bg-blue-50 text-blue-700 shadow-sm hover:shadow-md hover:bg-blue-100"
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm"
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        glow: "shadow-lg shadow-blue-500/25 animate-pulse"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

function Badge({ className, variant, size, animation, icon, closable, onClose, children, ...props }: BadgeProps) {
  return (
    <div className={badgeVariants({ variant, size, animation, className })} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
      {closable && (
        <button
          onClick={onClose}
          className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export { Badge, badgeVariants };