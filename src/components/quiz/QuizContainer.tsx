import { useState, useCallback, useEffect } from "react";
import { quizSteps } from "@/lib/quiz-data";
import QuizSidebar from "./QuizSidebar";
import QuizStepView from "./QuizStepView";
import bgHero from "@/assets/bg-hero.jpg";

interface QuizContainerProps {
  initialStep?: number;
}

const QuizContainer = ({ initialStep = 1 }: QuizContainerProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const answeredSteps = Object.keys(answers).map(Number);

  const goToStep = useCallback((step: number) => {
    if (step < 1 || step > quizSteps.length || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const handleAnswer = useCallback((value: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: value }));
  }, [currentStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const step = quizSteps.find((s) => s.id === currentStep);
        if (!step) return;
        if (step.type === "vsl" || step.type === "welcome" || answers[currentStep]) {
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, answers, handleNext]);

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background image — only visible on step 1 */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{
          backgroundImage: `url(${bgHero})`,
          opacity: currentStep === 1 ? 1 : 0,
        }}
      />
      {/* Dark base for other steps */}
      <div
        className="fixed inset-0 bg-background transition-opacity duration-700"
        style={{ opacity: currentStep === 1 ? 0 : 1 }}
      />

      <QuizSidebar currentStep={currentStep} answeredSteps={answeredSteps} />

      <div className="relative z-10">
        <div
          className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateY(-${(currentStep - 1) * 100}vh)` }}
        >
          {quizSteps.map((step) => (
            <QuizStepView
              key={step.id}
              step={step}
              answer={answers[step.id]}
              answers={answers}
              onAnswer={handleAnswer}
              onNext={handleNext}
              isFirst={step.id === 1}
              isLast={step.id === quizSteps.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
