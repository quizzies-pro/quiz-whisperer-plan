import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  fullWidth?: boolean;
  showArrow?: boolean;
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = "primary", fullWidth = false, showArrow = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2.5 font-heading font-bold uppercase tracking-[0.06em] text-sm transition-all duration-300 rounded-pill",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-40",
          variant === "primary" && [
            "bg-primary text-primary-foreground px-8 py-4 shadow-green",
            "hover:bg-green-mid hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-green-lg",
            "active:scale-[0.98] active:translate-y-0",
          ],
          variant === "outline" && [
            "border-2 border-primary text-primary bg-transparent px-8 py-4",
            "hover:bg-primary/10 hover:-translate-y-[2px]",
          ],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
        {showArrow && <ArrowRight className="w-4 h-4" />}
      </button>
    );
  }
);
CTAButton.displayName = "CTAButton";

export { CTAButton };
