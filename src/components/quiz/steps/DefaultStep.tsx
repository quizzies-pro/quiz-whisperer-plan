import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/cta-button";
import PhoneInput from "../PhoneInput";
import type { QuizStepData } from "@/lib/quiz-data";

interface DefaultStepProps {
  step: QuizStepData;
  answer: string | undefined;
  answers: Record<number, string>;
  onAnswer: (value: string) => void;
  onNext: () => void;
  isFirst: boolean;
}

const DefaultStep = React.memo(({ step, answer, answers, onAnswer, onNext, isFirst }: DefaultStepProps) => {
  const navigate = useNavigate();
  const [localText, setLocalText] = useState(answer || "");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (step.autoAdvanceMs) {
      const timer = setTimeout(() => onNext(), step.autoAdvanceMs);
      return () => clearTimeout(timer);
    }
  }, [step, onNext]);

  const handleOptionClick = (value: string) => {
    // Disqualify if user selects "sem_tempo" on step 7
    if (step.id === 7 && value === "sem_tempo") {
      navigate("/desqualificado");
      return;
    }
    // Disqualify if user selects "menos_200k" on step 9
    if (step.id === 9 && value === "menos_200k") {
      navigate("/sem-investimento");
      return;
    }
    onAnswer(value);
    onNext();
  };

  return (
    <div className="h-full w-full relative flex items-center justify-center px-4 py-10 overflow-y-auto scrollbar-none">
      <div className="max-w-xl w-full space-y-8 animate-fade-in my-auto relative z-10">
        <div className="space-y-3">
          <h2 className="font-heading font-bold text-2xl md:text-3xl leading-tight text-foreground">
            {step.id === 3 && answers[2]
              ? <>{answers[2]}, <span className="text-primary">qual é o seu email?</span></>
              : step.id === 4 && answers[2]
              ? <>{answers[2]}, <span className="text-primary">qual é o seu WhatsApp?</span></>
              : step.title}
          </h2>
          {step.subtitle && (
            <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed">
              {step.id === 10 && answers[2]
                ? <>{answers[2]}, {step.subtitle.charAt(0).toLowerCase() + step.subtitle.slice(1)}</>
                : step.subtitleParts ? (
                  <>
                    {step.subtitleParts[0]}<br className="hidden md:inline" />{step.subtitleParts[1]}
                  </>
                ) : step.subtitle}
            </p>
          )}
        </div>

        {step.type === "multiple-choice" && step.options && (
          <div className="space-y-3">
            {step.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.value)}
                className={cn(
                  "w-full text-left px-5 py-4 rounded-[10px] transition-all duration-300 flex items-center gap-4 group",
                  answer === option.value
                    ? "glow-border bg-primary/5"
                    : "card-border bg-card hover:bg-card/80 hover:-translate-y-[1px] hover:border-[rgba(255,255,255,0.12)]"
                )}
              >
                <span className={cn(
                  "w-8 h-8 rounded-[6px] flex items-center justify-center text-sm font-heading font-bold shrink-0 transition-all duration-300",
                  answer === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                )}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={cn(
                  "text-sm md:text-base font-body transition-colors",
                  answer === option.value ? "text-foreground" : "text-foreground/75 group-hover:text-foreground/90"
                )}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {step.type === "text" && step.inputType === "tel" && (
          <div className="space-y-5">
            <PhoneInput
              value={localText}
              onChange={(val) => { setLocalText(val); setValidationError(""); }}
              onSubmit={() => {
                onAnswer(localText);
                onNext();
              }}
            />
            {validationError && (
              <p className="text-sm text-destructive font-body">{validationError}</p>
            )}
            <CTAButton
              onClick={() => {
                if (!localText || localText.replace(/\D/g, "").length < 10) {
                  setValidationError("Informe um número de telefone válido.");
                  return;
                }
                onAnswer(localText);
                onNext();
              }}
              disabled={!localText && step.required}
              className="px-10 py-4"
              showArrow
            >
              CONTINUAR
            </CTAButton>
          </div>
        )}

        {step.type === "text" && step.inputType !== "tel" && (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <input
                type={step.inputType || "text"}
                value={localText}
                onChange={(e) => { setLocalText(e.target.value); setValidationError(""); }}
                placeholder={step.placeholder || "Digite aqui..."}
                className={cn(
                  "w-full h-14 px-5 rounded-[10px] bg-card card-border text-foreground text-base font-body placeholder:text-muted-foreground/60 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all",
                  validationError && "border-destructive/60 focus:border-destructive/60 focus:ring-destructive/30"
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && localText) {
                    if (step.inputType === "email") {
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!emailRegex.test(localText.trim())) {
                        setValidationError("Informe um e-mail válido.");
                        return;
                      }
                    }
                    onAnswer(localText.trim());
                    onNext();
                  }
                }}
              />
              {validationError && (
                <p className="text-sm text-destructive font-body">{validationError}</p>
              )}
            </div>
            <CTAButton
              onClick={() => {
                if (step.inputType === "email") {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(localText.trim())) {
                    setValidationError("Informe um e-mail válido.");
                    return;
                  }
                }
                if (localText) onAnswer(localText.trim());
                onNext();
              }}
              disabled={!localText && step.required}
              className="px-10 py-4"
              showArrow
            >
              {isFirst ? "COMEÇAR" : "CONTINUAR"}
            </CTAButton>
          </div>
        )}

        {step.type === "welcome" && (
          <CTAButton onClick={onNext} className="px-10 py-5" showArrow>
            {isFirst ? "COMEÇAR" : "CONTINUAR"}
          </CTAButton>
        )}
      </div>
    </div>
  );
});
DefaultStep.displayName = "DefaultStep";

export default DefaultStep;
