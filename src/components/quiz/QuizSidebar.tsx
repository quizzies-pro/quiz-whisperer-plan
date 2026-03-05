import { quizSteps } from "@/lib/quiz-data";

interface QuizSidebarProps {
  currentStep: number;
  answeredSteps: number[];
}

const QuizSidebar = ({ currentStep }: QuizSidebarProps) => {
  const totalSteps = quizSteps.length;
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="fixed right-0 top-0 h-screen w-1.5 z-50">
      <div
        className="w-full bg-primary rounded-b-full transition-all duration-700 ease-out progress-glow"
        style={{ height: `${progressPercent}%` }}
      />
    </div>
  );
};

export default QuizSidebar;
