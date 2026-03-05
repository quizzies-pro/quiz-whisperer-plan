import { quizSteps } from "@/lib/quiz-data";

interface QuizSidebarProps {
  currentStep: number;
  answeredSteps: number[];
}

const QuizSidebar = ({ currentStep, answeredSteps }: QuizSidebarProps) => {
  const totalSteps = quizSteps.length;
  
  // Progress is based on completed steps only
  // Steps that don't require answers (vsl, interstitial, loading) count as completed when passed
  const completedCount = quizSteps.filter((step) => {
    if (step.id >= currentStep) return false;
    // These types auto-complete when you pass them
    if (step.type === "vsl" || step.type === "interstitial" || step.type === "loading" || step.type === "welcome") {
      return true;
    }
    return answeredSteps.includes(step.id);
  }).length;

  const progressPercent = (completedCount / (totalSteps - 1)) * 100;

  return (
    <div className="fixed right-0 top-0 h-screen w-1.5 z-50 bg-muted/20">
      <div
        className="w-full bg-primary rounded-b-full transition-all duration-700 ease-out progress-glow"
        style={{ height: `${progressPercent}%` }}
      />
    </div>
  );
};

export default QuizSidebar;
