import React from "react";
import ceoImage from "@/assets/ceo-locagora.png";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useAutoProgress } from "@/hooks/use-auto-progress";
import TestimonialWall from "../TestimonialWall";
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
    durationMs: 4000,
    intervalMs: 70,
    onComplete: onNext,
  });

  return (
    <div className="h-full w-full relative overflow-hidden">
      <TestimonialWall />

      <div
        className="absolute z-[15] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(216 55% 7% / 1) 0%, hsl(216 55% 7% / 1) 25%, hsl(216 55% 7% / 0.97) 35%, hsl(216 55% 7% / 0.88) 45%, hsl(216 55% 7% / 0.7) 55%, hsl(216 55% 7% / 0.45) 65%, hsl(216 55% 7% / 0.2) 75%, hsl(216 55% 7% / 0.07) 85%, transparent 95%)",
        }}
      />

      <div className="relative z-20 h-full flex items-center justify-center px-4 py-6 overflow-y-auto overflow-x-hidden scrollbar-none">
        <div className="max-w-3xl w-full animate-fade-in my-auto">
          <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
            <div className="relative">
              <div className="w-56 h-72 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_60px_rgba(34,197,94,0.2)]">
                <img src={ceoImage} alt="CEO LocaGora" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
            </div>

            <div className="text-center space-y-5 max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider">Excelente Perfil!</span>
              </div>

              <h2 className="font-heading font-black text-lg sm:text-xl md:text-3xl leading-tight text-foreground">
                {step.title}
              </h2>

              {step.subtitle && (
                <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed">
                  {step.subtitle}
                </p>
              )}

              <div className="flex flex-wrap justify-center gap-3 pt-1">
                {["✓ Alta rentabilidade", "✓ Suporte completo", "✓ Retorno rápido"].map((item) => (
                  <span key={item} className="text-xs font-body text-primary/90 bg-primary/5 border border-primary/10 rounded-full px-3 py-1.5">
                    {item}
                  </span>
                ))}
              </div>

              <div className="pt-4 space-y-3">
                <div className="h-3 bg-card rounded-full overflow-hidden card-border">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-200 progress-glow"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground font-body">
                  {progress < 100
                    ? `Estamos atualizando seus dados... ${Math.floor(progress)}%`
                    : "Dados atualizados com sucesso! ✓"}
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
