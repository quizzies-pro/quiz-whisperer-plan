import { useParams } from "react-router-dom";
import QuizContainer from "@/components/quiz/QuizContainer";

const QuizStep = () => {
  const { id } = useParams<{ id: string }>();
  const stepId = parseInt(id || "1", 10);

  return <QuizContainer initialStep={stepId} />;
};

export default QuizStep;
