import React from "react";
import type { QuizStepData } from "@/lib/quiz-data";
import VSLStep from "./steps/VSLStep";
import InterstitialStep from "./steps/InterstitialStep";
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
  if (step.type === "vsl") {
    return <VSLStep step={step} onNext={onNext} />;
  }

  if (step.type === "interstitial") {
    return <InterstitialStep step={step} onNext={onNext} answers={answers} isActive={isActive} />;
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
});
QuizStepView.displayName = "QuizStepView";

export default QuizStepView;
