
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NeumorphicButtonProps extends ButtonProps {
  elevated?: boolean;
  gradient?: boolean;
}

export const NeumorphicButton = React.forwardRef<
  HTMLButtonElement,
  NeumorphicButtonProps
>(({ className, elevated = false, gradient = false, children, ...props }, ref) => {
  const baseStyles = "rounded-full font-medium transition-all duration-300";
  
  const styleVariants = {
    elevated: "shadow-[5px_5px_15px_#d9d9d9,_-5px_-5px_15px_#ffffff] hover:shadow-[3px_3px_10px_#d9d9d9,_-3px_-3px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#d9d9d9,_inset_-5px_-5px_10px_#ffffff]",
    flat: "shadow-[inset_5px_5px_10px_#d9d9d9,_inset_-5px_-5px_10px_#ffffff] hover:shadow-[inset_3px_3px_5px_#d9d9d9,_inset_-3px_-3px_5px_#ffffff]",
    gradient: "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 text-white shadow-lg hover:shadow-xl hover:scale-105",
  };
  
  const buttonStyle = gradient 
    ? styleVariants.gradient 
    : elevated 
      ? styleVariants.elevated 
      : styleVariants.flat;

  return (
    <Button
      className={cn(baseStyles, buttonStyle, className)}
      ref={ref}
      {...props}
    >
      {children}
    </Button>
  );
});

NeumorphicButton.displayName = "NeumorphicButton";
