import React, { useState, useEffect } from "react";
import logoLocagora from "@/assets/logo-locagora.png";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { useAutoProgress } from "@/hooks/use-auto-progress";
import type { QuizStepData } from "@/lib/quiz-data";

interface LoadingStepProps {
  step: QuizStepData;
  onNext: () => void;
  answers: Record<number, string>;
  isActive: boolean;
}

const LoadingTitle = React.memo(() => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setPhase((p) => (p === 0 ? 1 : 0)), 3000);
    return () => clearInterval(interval);
  }, []);
  const texts = ["Aguarde um momento", "Analisando seu perfil..."];
  return (
    <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground animate-[pulse_2.5s_ease-in-out_infinite]">
      <span key={phase} className="animate-fade-in inline-block">{texts[phase]}</span>
    </h2>
  );
});
LoadingTitle.displayName = "LoadingTitle";

const benefits = [
  "Lucro no primeiro mês",
  "Sem contratação de funcionários",
  "Facilidade na compra de produtos",
  "Não exige tempo integral de dedicação",
];

const LoadingStep = React.memo(({ step, onNext, answers, isActive }: LoadingStepProps) => {
  const progress = useAutoProgress({
    isActive,
    durationMs: 4000,
    intervalMs: 100,
    onComplete: onNext,
  });

  return (
    <div className="h-full w-full flex items-start justify-center px-4 sm:px-6 pt-20 sm:pt-10 pb-6 sm:pb-10 overflow-y-auto scrollbar-none">
      <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-10 animate-fade-in my-auto">
        <div className="space-y-4 sm:space-y-5">
          <img src={logoLocagora} alt="Locagora" className="h-8 sm:h-10 md:h-14 mx-auto object-contain mb-6 sm:mb-10" />
          <LoadingTitle />
          {/* Progress bar */}
          <div className="space-y-4">
            <div className="h-3 bg-card rounded-full overflow-hidden card-border">
              <div
                className="h-full bg-primary rounded-full transition-all duration-200 progress-glow"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground font-body">
              {progress < 25 ? "Verificando dados..." : progress < 50 ? "Analisando perfil..." : progress < 75 ? "Calculando compatibilidade..." : progress < 100 ? "Quase pronto..." : "Concluído! ✓"}
            </p>
          </div>
        </div>

        {/* Comparison */}
        <div className="space-y-4 sm:space-y-6 text-left">
          <div className="text-center space-y-2 sm:space-y-3">
            <p className="font-heading font-bold text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-primary">Use seu lado racional</p>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground leading-snug">
              {answers[2] ? `${answers[2]}, a` : "A"} Loca<span className="text-primary">go</span>ra é melhor não só pelo marketing...
            </h3>
          </div>

          {/* Mobile: card-style layout */}
          <div className="sm:hidden rounded-[10px] overflow-hidden card-border">
            <div className="text-center py-4 bg-card border-b border-border/20">
              <span className="font-heading font-bold text-sm text-foreground">Benefícios</span>
            </div>
            <div className="flex bg-card border-b border-border/20 py-3 px-4 gap-3">
              <div className="flex-1 flex justify-center">
                <span className="w-full text-center py-2.5 rounded-lg bg-destructive text-xs font-heading font-bold text-primary-foreground">Concorrentes</span>
              </div>
              <div className="flex-1 flex justify-center">
                <span className="w-full text-center py-2.5 rounded-lg bg-primary text-xs font-heading font-bold text-primary-foreground">LocAgora</span>
              </div>
            </div>
            {benefits.map((benefit, idx) => (
              <div key={idx} className={cn("bg-card", idx < benefits.length - 1 && "border-b border-border/15")}>
                <div className="text-center py-3 px-4">
                  <span className="text-sm font-body text-foreground/90">{benefit}</span>
                </div>
                <div className="flex gap-[1px] px-3 pb-3">
                  <div className="flex-1 flex justify-center py-3 rounded-lg bg-background/60">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-destructive/15">
                      <span className="text-destructive text-xs font-bold">✕</span>
                    </span>
                  </div>
                  <div className="flex-1 flex justify-center py-3 rounded-lg bg-background/60">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: full table */}
          <div className="hidden sm:block rounded-[10px] overflow-hidden card-border">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-5 py-4 text-left text-xs sm:text-sm font-heading font-bold text-foreground/80 bg-card">Benefícios</th>
                  <th className="px-4 py-4 text-center text-xs sm:text-sm font-heading font-bold text-primary-foreground bg-destructive/80 w-[150px]">Concorrentes</th>
                  <th className="px-4 py-4 text-center text-xs sm:text-sm font-heading font-bold text-primary-foreground bg-primary w-[150px]">Locagora</th>
                </tr>
              </thead>
              <tbody>
                {benefits.map((benefit, idx) => (
                  <tr key={idx} className="border-t border-border/20">
                    <td className="px-5 py-5 text-sm font-body text-foreground/80 bg-card">{benefit}</td>
                    <td className="px-4 py-5 text-center bg-card">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-destructive/15">
                        <span className="text-destructive text-xs font-bold">✕</span>
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center bg-card">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});
LoadingStep.displayName = "LoadingStep";

export default LoadingStep;
