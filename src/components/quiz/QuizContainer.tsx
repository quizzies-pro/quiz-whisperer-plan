import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
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
  const [stepHeight, setStepHeight] = useState(window.innerHeight);
  const initialHeight = useRef(window.innerHeight);

  // Capture stable height on mount and orientation change only (not keyboard)
  useEffect(() => {
    const updateHeight = () => {
      // Only update if the change is significant (orientation change, not keyboard)
      const newHeight = window.innerHeight;
      const diff = Math.abs(newHeight - initialHeight.current);
      // Keyboard typically changes height by 200-400px; orientation changes more
      if (diff > 400 || newHeight > initialHeight.current) {
        initialHeight.current = newHeight;
        setStepHeight(newHeight);
      }
    };

    // Use resize + orientationchange
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        initialHeight.current = window.innerHeight;
        setStepHeight(window.innerHeight);
      }, 200);
    });

    // Also set on initial load with a small delay for accurate measurement
    const timeout = setTimeout(() => {
      initialHeight.current = window.innerHeight;
      setStepHeight(window.innerHeight);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const answeredSteps = Object.keys(answers).map(Number);

  const goToStep = useCallback((step: number) => {
    if (step < 1 || step > quizSteps.length || isTransitioning) return;
    setIsTransitioning(true);
    // Blur any focused input to dismiss keyboard before transitioning
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setTimeout(() => {
      setCurrentStep(step);
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  const handleBack = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

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
        if (step.type === "text") return;
        if (step.type === "vsl" || step.type === "welcome" || answers[currentStep]) {
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, answers, handleNext]);

  return (
    <div className="relative overflow-hidden" style={{ minHeight: stepHeight }}>
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

      {/* Back button */}
      {currentStep > 1 && (
        <button
          onClick={handleBack}
          className="fixed top-5 left-5 z-50 p-2 text-primary/70 hover:text-primary transition-colors duration-200"
          aria-label="Voltar"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
      )}

      <div className="relative z-10">
        <div
          className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateY(-${(currentStep - 1) * stepHeight}px)` }}
        >
          {quizSteps.map((step) => (
            <div key={step.id} style={{ height: stepHeight }}>
              <QuizStepView
                step={step}
                answer={answers[step.id]}
                answers={answers}
                onAnswer={handleAnswer}
                onNext={handleNext}
                isFirst={step.id === 1}
                isLast={step.id === quizSteps.length}
                isActive={step.id === currentStep}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
