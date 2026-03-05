import { cn } from "@/lib/utils";
import { totalSteps } from "@/lib/quiz-data";
import { Check } from "lucide-react";

interface QuizSidebarProps {
  currentStep: number;
  answeredSteps: number[];
}

const QuizSidebar = ({ currentStep, answeredSteps }: QuizSidebarProps) => {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-16 flex-col items-center justify-center gap-3 z-50 bg-card/80 backdrop-blur-sm border-r border-border">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = answeredSteps.includes(step);
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500",
                  isCurrent && "bg-primary text-primary-foreground scale-110 shadow-lg",
                  isCompleted && !isCurrent && "bg-primary/20 text-primary",
                  !isCurrent && !isCompleted && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted && !isCurrent ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step
                )}
              </div>
              {step < totalSteps && (
                <div
                  className={cn(
                    "w-0.5 h-4 mt-1 transition-all duration-500",
                    isCompleted ? "bg-primary/40" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {currentStep} / {totalSteps}
          </span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizSidebar;
