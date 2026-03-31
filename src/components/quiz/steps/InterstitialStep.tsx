import React from "react";
import { Sparkles } from "lucide-react";
import { useAutoProgress } from "@/hooks/use-auto-progress";
import type { QuizStepData } from "@/lib/quiz-data";

interface InterstitialStepProps {
  step: QuizStepData;
  onNext: () => void;
  answers: Record<number, string>;
  isActive: boolean;
}

const InterstitialStep = React.memo(({ step, onNext, answers, isActive }: InterstitialStepProps) => {
  const progress = useAutoProgress({
    isActive,
    durationMs: 5000,
    intervalMs: 70,
    onComplete: onNext,
  });

  return (
    <div className="h-full w-full relative overflow-hidden">
      <div
        className="absolute z-[15] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(216 55% 7% / 1) 0%, hsl(216 55% 7% / 1) 25%, hsl(216 55% 7% / 0.97) 35%, hsl(216 55% 7% / 0.88) 45%, hsl(216 55% 7% / 0.7) 55%, hsl(216 55% 7% / 0.45) 65%, hsl(216 55% 7% / 0.2) 75%, hsl(216 55% 7% / 0.07) 85%, transparent 95%)",
        }}
      />

      <div className="relative z-20 h-full flex items-center justify-center px-4 py-6 overflow-y-auto overflow-x-hidden scrollbar-none">
        <div className="max-w-3xl w-full animate-fade-in my-auto">
          <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
            <div className="text-center space-y-6 max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider">Preparando...</span>
              </div>

              <h2 className="font-heading font-bold text-lg sm:text-xl md:text-2xl leading-tight text-foreground">
                {step.title}
              </h2>

              {step.highlightText && (
                <p className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary leading-tight">
                  {step.highlightText}
                </p>
              )}

              <div className="pt-4 space-y-3">
                <div className="h-3 bg-card rounded-full overflow-hidden card-border">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-200 progress-glow"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground font-body">
                  {progress < 100
                    ? `Preparando sua análise... ${Math.floor(progress)}%`
                    : "Pronto! ✓"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
InterstitialStep.displayName = "InterstitialStep";

export default InterstitialStep;
