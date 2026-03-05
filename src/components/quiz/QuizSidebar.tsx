import { cn } from "@/lib/utils";
import { quizSteps, macroStepLabels } from "@/lib/quiz-data";
import { Check } from "lucide-react";

interface QuizSidebarProps {
  currentStep: number;
  answeredSteps: number[];
}

const MACRO_COUNT = 5;

const QuizSidebar = ({ currentStep, answeredSteps }: QuizSidebarProps) => {
  const currentMacro = quizSteps.find((s) => s.id === currentStep)?.macroStep ?? 1;

  const isMacroCompleted = (macro: number) => {
    const stepsInMacro = quizSteps.filter((s) => s.macroStep === macro);
    return stepsInMacro.every((s) => answeredSteps.includes(s.id) || s.type === "vsl" || s.type === "interstitial" || s.type === "loading");
  };

  // Progress as fraction of macro steps
  const progressPercent = ((currentMacro) / MACRO_COUNT) * 100;

  return (
    <>
      {/* Desktop sidebar — macro steps */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-16 flex-col items-center justify-center gap-3 z-50 bg-card/80 backdrop-blur-sm border-r border-border">
        {Array.from({ length: MACRO_COUNT }, (_, i) => i + 1).map((macro) => {
          const completed = isMacroCompleted(macro);
          const isCurrent = macro === currentMacro;

          return (
            <div key={macro} className="flex flex-col items-center group relative">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500",
                  isCurrent && "bg-primary text-primary-foreground scale-110 shadow-lg",
                  completed && !isCurrent && "bg-primary/20 text-primary",
                  !isCurrent && !completed && "bg-muted text-muted-foreground"
                )}
              >
                {completed && !isCurrent ? <Check className="w-4 h-4" /> : macro}
              </div>
              {/* Tooltip */}
              <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-card border border-border rounded-md px-2 py-1 text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
                {macroStepLabels[macro]}
              </span>
              {macro < MACRO_COUNT && (
                <div className={cn("w-0.5 h-4 mt-1 transition-all duration-500", completed ? "bg-primary/40" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {macroStepLabels[currentMacro]}
          </span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizSidebar;
