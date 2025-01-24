import { NewQuestionCard } from "@/components/main/newQuestion";

// New Question Page Component

export const QuestionPage = () => {
  return (
    <div className="flex justify-center mt-40">
      {/* New question card component */}
      <NewQuestionCard></NewQuestionCard>
    </div>
  );
};

export default QuestionPage;
