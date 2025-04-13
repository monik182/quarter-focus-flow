
import React from "react";
import { cn } from "@/lib/utils";

interface NeumorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export const NeumorphicCard = React.forwardRef<
  HTMLDivElement,
  NeumorphicCardProps
>(({ className, elevated = false, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "rounded-3xl p-6 bg-white",
        elevated 
          ? "shadow-[8px_8px_24px_rgba(209,213,219,0.8),_-8px_-8px_24px_rgba(255,255,255,0.8)]" 
          : "shadow-[5px_5px_15px_rgba(209,213,219,0.5),_-5px_-5px_15px_rgba(255,255,255,0.5)]",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

NeumorphicCard.displayName = "NeumorphicCard";
