import * as React from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  fullWidth?: boolean;
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = "primary", fullWidth = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wide text-base transition-all duration-300 rounded-pill px-8 py-4",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "primary" && [
            "bg-primary text-primary-foreground shadow-green",
            "hover:bg-green-mid hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-green-lg",
            "active:scale-[0.98]",
          ],
          variant === "outline" && [
            "border-2 border-primary text-primary bg-transparent",
            "hover:bg-primary/10 hover:-translate-y-0.5",
          ],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
CTAButton.displayName = "CTAButton";

export { CTAButton };
