import { cn } from "@/lib/utils";
import { quizSteps, macroStepLabels } from "@/lib/quiz-data";
import { Check } from "lucide-react";

interface QuizSidebarProps {
  currentStep: number;
  answeredSteps: number[];
}

const MACRO_COUNT = 6;

const QuizSidebar = ({ currentStep, answeredSteps }: QuizSidebarProps) => {
  const currentMacro = quizSteps.find((s) => s.id === currentStep)?.macroStep ?? 1;

  const isMacroCompleted = (macro: number) => {
    const stepsInMacro = quizSteps.filter((s) => s.macroStep === macro);
    return stepsInMacro.every((s) => answeredSteps.includes(s.id) || s.type === "vsl" || s.type === "interstitial" || s.type === "loading");
  };

  const progressPercent = (currentMacro / MACRO_COUNT) * 100;

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-14 flex-col items-center justify-center gap-2.5 z-50 bg-[rgba(13,27,46,0.95)] backdrop-blur-md border-r border-[rgba(255,255,255,0.06)]">
        {Array.from({ length: MACRO_COUNT }, (_, i) => i + 1).map((macro) => {
          const completed = isMacroCompleted(macro);
          const isCurrent = macro === currentMacro;

          return (
            <div key={macro} className="flex flex-col items-center group relative">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-heading font-bold transition-all duration-500",
                  isCurrent && "bg-primary text-primary-foreground scale-110 shadow-green",
                  completed && !isCurrent && "bg-primary/20 text-primary",
                  !isCurrent && !completed && "bg-[rgba(255,255,255,0.06)] text-muted-foreground"
                )}
              >
                {completed && !isCurrent ? <Check className="w-3.5 h-3.5" /> : macro}
              </div>
              <span className="absolute left-11 top-1/2 -translate-y-1/2 bg-card border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-1.5 text-[11px] text-foreground font-heading whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-dark z-50">
                {macroStepLabels[macro]}
              </span>
              {macro < MACRO_COUNT && (
                <div className={cn("w-px h-3 mt-1 transition-all duration-500", completed ? "bg-primary/30" : "bg-[rgba(255,255,255,0.06)]")} />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[rgba(8,15,28,0.95)] backdrop-blur-md border-b border-[rgba(255,255,255,0.06)] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-[0.12em] shrink-0">
            {macroStepLabels[currentMacro]}
          </span>
          <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700 ease-out progress-glow"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizSidebar;
