import { useParams, useLocation } from "react-router-dom";
import QuizContainer from "@/components/quiz/QuizContainer";

const QuizStep = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  
  // Extract step ID from path for both /quiz/step/:id and /quiz/step/N
  const pathMatch = location.pathname.match(/\/quiz\/step\/(\d+)/);
  const stepId = parseInt(id || pathMatch?.[1] || "1", 10);

  return <QuizContainer initialStep={stepId} />;
};

export default QuizStep;
