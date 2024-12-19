import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getQuestionAnswers } from "@/utils/resultsUtils/answerFunction";
import { getQuestionData } from "@/utils/questionUtils/questionFunctions";
import { useParams } from "react-router-dom";
import { Question } from "@/utils/questionUtils/questionTypes";

export function WrittenResponsesList() {
  const { surveyId, questionId } = useParams<{
    surveyId: string;
    questionId: string;
  }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [questionData, setQuestionData] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (!surveyId || !questionId) {
      console.error("Survey ID or Question ID is required but missing.");
      setLoading(false);
      return;
    }

    const fetchQuestionData = async () => {
      try {
        const questionDataResponse = await getQuestionData(
          surveyId,
          questionId
        );
        if (questionDataResponse) {
          console.log("Fetched question data:", questionDataResponse);
          setQuestionData(questionDataResponse);
        }
      } catch (error) {
        console.error("Error fetching question data:", error);
        setError("An error occurred while fetching question data.");
      }
    };

    const fetchAnswers = async () => {
      try {
        const response = await getQuestionAnswers(surveyId, questionId);
        if (response && response.success) {
          console.log("Fetched question answers:", response.data);

          // Extract written response answers
          // @ts-expect-error - answers not type of Answer
          const writtenResponses = response.data.answers.map(
            (item: { answer: string }) => item.answer
          );

          setAnswers(writtenResponses);
        } else {
          console.error("Failed to fetch question answers.");
          setError(response?.message || "Failed to fetch question answers.");
        }
      } catch (error) {
        console.error("Error fetching question answers:", error);
        setError("An error occurred while fetching question answers.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionData();
    fetchAnswers();
  }, [surveyId, questionId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center mt-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Written Responses</CardTitle>
          <p className="text-muted-foreground">{questionData?.question}</p>
        </CardHeader>
        <CardContent>
          {answers.length > 0 ? (
            <ul className="space-y-4">
              {answers.map((response, index) => (
                <li key={index} className="p-4 border rounded-lg">
                  {response}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground">
              No responses available.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default WrittenResponsesList;