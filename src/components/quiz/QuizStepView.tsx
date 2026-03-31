import React from "react";
import type { QuizStepData } from "@/lib/quiz-data";
import VSLStep from "./steps/VSLStep";
import InterstitialStep from "./steps/InterstitialStep";
import LoadingStep from "./steps/LoadingStep";
import ResultStep from "./steps/ResultStep";
import DefaultStep from "./steps/DefaultStep";

interface QuizStepViewProps {
  step: QuizStepData;
  answer: string | undefined;
  answers: Record<number, string>;
  onAnswer: (value: string) => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  isActive: boolean;
}

const QuizStepView = React.memo(({ step, answer, answers, onAnswer, onNext, isFirst, isLast, isActive }: QuizStepViewProps) => {
  // Background images are rendered here for step types that don't handle their own backgrounds
  const needsWrapperBg = step.type === "interstitial" || step.type === "loading" || step.type === "result";
  const hasBg = step.bgImage || step.bgImageMobile;

  const renderContent = () => {
    if (step.type === "vsl") {
      return <VSLStep step={step} onNext={onNext} />;
    }
    if (step.type === "interstitial") {
      return <InterstitialStep step={step} onNext={onNext} answers={answers} isActive={isActive} />;
    }
    if (step.type === "loading") {
      return <LoadingStep step={step} onNext={onNext} answers={answers} isActive={isActive} />;
    }
    if (step.type === "result") {
      return <ResultStep step={step} answers={answers} />;
    }
    return (
      <DefaultStep
        step={step}
        answer={answer}
        answers={answers}
        onAnswer={onAnswer}
        onNext={onNext}
        isFirst={isFirst}
      />
    );
  };

  if (needsWrapperBg && hasBg) {
    return (
      <div className="h-full w-full relative">
        {step.bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none hidden sm:block"
            style={{ backgroundImage: `url(${step.bgImage})` }}
          />
        )}
        {(step.bgImageMobile || step.bgImage) && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none sm:hidden"
            style={{ backgroundImage: `url(${step.bgImageMobile || step.bgImage})` }}
          />
        )}
        <div className="relative z-10 h-full">{renderContent()}</div>
      </div>
    );
  }

  return renderContent();
});
QuizStepView.displayName = "QuizStepView";

export default QuizStepView;
