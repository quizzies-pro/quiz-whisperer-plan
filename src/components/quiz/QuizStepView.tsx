import { useState } from "react";
import { cn } from "@/lib/utils";
import { QuizStepData } from "@/lib/quiz-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowDown } from "lucide-react";

interface QuizStepViewProps {
  step: QuizStepData;
  answer: string | undefined;
  onAnswer: (value: string) => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuizStepView = ({ step, answer, onAnswer, onNext, isFirst }: QuizStepViewProps) => {
  const [localText, setLocalText] = useState(answer || "");

  const canProceed = step.type === "welcome" || !!answer;

  const handleOptionClick = (value: string) => {
    onAnswer(value);
    // Auto-advance after short delay on multiple choice
    setTimeout(() => onNext(), 400);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        {/* Step number */}
        {step.type !== "welcome" && (
          <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
            Pergunta {step.id - 1}
          </span>
        )}

        {/* Title */}
        <h2 className={cn(
          "font-bold leading-tight tracking-tight text-foreground",
          step.type === "welcome" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
        )}>
          {step.title}
        </h2>

        {/* Subtitle */}
        {step.subtitle && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {step.subtitle}
          </p>
        )}

        {/* Content by type */}
        {step.type === "multiple-choice" && step.options && (
          <div className="space-y-3 pt-4">
            {step.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.value)}
                className={cn(
                  "w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 group",
                  answer === option.value
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <span className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 transition-colors duration-300",
                  answer === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={cn(
                  "text-base md:text-lg font-medium transition-colors",
                  answer === option.value ? "text-foreground" : "text-foreground/80"
                )}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {step.type === "text" && (
          <div className="pt-4 space-y-4">
            <Input
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              onBlur={() => onAnswer(localText)}
              placeholder={step.placeholder || "Digite aqui..."}
              className="text-lg py-6 px-4 border-2 rounded-xl"
              onKeyDown={(e) => {
                if (e.key === "Enter" && localText) {
                  onAnswer(localText);
                  onNext();
                }
              }}
            />
          </div>
        )}

        {/* CTA Button */}
        {(step.type === "welcome" || step.type === "text") && (
          <div className="pt-4">
            <Button
              onClick={() => {
                if (step.type === "text" && localText) onAnswer(localText);
                onNext();
              }}
              disabled={step.type === "text" && !localText && step.required}
              size="lg"
              className="text-base px-8 py-6 rounded-xl gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              {isFirst ? "Começar" : "Continuar"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Hint */}
        {isFirst && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm pt-8 animate-bounce">
            <ArrowDown className="w-4 h-4" />
            <span>ou pressione Enter ↵</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizStepView;
