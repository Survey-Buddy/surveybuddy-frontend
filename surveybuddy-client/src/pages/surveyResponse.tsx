import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  writtenResponseSchema,
  multiChoiceSchema,
  rangeSchema,
} from "@/utils/questionUtils/questionSchema";
import getQuestionData from "@/utils/questionUtils/questionFunctions";
import { Question } from "@/utils/questionUtils/questionTypes";
import { getSurveyData } from "@/utils/surveyUtils/surveyFunctions";
import { Survey } from "@/utils/surveyUtils/surveyTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

const SurveyQuestionPage: React.FC = () => {
  const { surveyId, questionNum } = useParams<{
    surveyId: string;
    questionNum: string;
  }>();
  const [surveyData, setSurveyData] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const navigate = useNavigate();

  const currentQuestionIndex = parseInt(questionNum || "1", 10) - 1;

  const getSchema = () => {
    if (currentQuestion?.questionFormat === "writtenResponse")
      return writtenResponseSchema;
    if (currentQuestion?.questionFormat === "multiChoice")
      return multiChoiceSchema;
    if (currentQuestion?.questionFormat === "rangeSlider") return rangeSchema;
    return writtenResponseSchema; // Default
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(getSchema()),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchSurveyData = async () => {
      if (!surveyId) return console.log("No surveyId");
      try {
        const data = await getSurveyData(surveyId);
        console.log("Survey data: ", data);
        setSurveyData(data);
      } catch (error) {
        console.error("Error fetching survey data: ", error);
      }
    };

    const fetchQuestions = async () => {
      if (!surveyId) return console.log("No surveyId");
      try {
        const data = await getQuestionData(surveyId);
        console.log("Questions: ", data);
        setQuestions(data);
        setCurrentQuestion(data[currentQuestionIndex]);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    fetchSurveyData();
    fetchQuestions();
  }, [surveyId, currentQuestionIndex]);

  const handleAnswerSubmit = async (data: any) => {
    console.log("Submitted answer: ", data, currentQuestion?._id);
    // Handle submission to backend here
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      navigate(`/surveys/${surveyId}/response/${currentQuestionIndex + 2}`);
      reset();
    } else {
      console.log("Survey completed!");
      // Navigate to a completion page or summary
      navigate(`/surveys/${surveyId}/complete`);
    }
  };

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <div className="min-w-[50%]">
        <h1>{surveyData?.name ? `Survey: ${surveyData.name}` : ""}</h1>
        <h2>
          {surveyData?.description
            ? `Description: ${surveyData.description}`
            : ""}
        </h2>

        <Card className="border-1 m-5">
          <CardHeader>
            <CardTitle>{`Question ${currentQuestion.questionNum}`}</CardTitle>
            <CardDescription>{currentQuestion?.question}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(handleAnswerSubmit)}>
            <CardContent className="space-y-2">
              {currentQuestion?.questionFormat === "writtenResponse" && (
                <div>
                  <Label htmlFor={`question-${currentQuestion._id}`}>
                    Your Answer
                  </Label>
                  <textarea
                    className="border border-gray-300 rounded p-2 w-full h-32"
                    placeholder="Enter your response..."
                    {...register("answer")}
                    id={`question-${currentQuestion._id}`}
                  />
                </div>
              )}
              {currentQuestion?.questionFormat === "multiChoice" && (
                <RadioGroup {...register("multiChoiceAnswer")}>
                  {currentQuestion.options?.map((option, idx) => (
                    <div className="flex items-center space-x-2" key={idx}>
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              {currentQuestion?.questionFormat === "rangeSlider" && (
                <Slider max={10} step={1} {...register("rangeAnswer")} />
              )}
              {errors && (
                <p className="text-red-500">
                  {errors.answer?.message || errors.rangeAnswer?.message}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" onClick={handleSubmit(handleAnswerSubmit)}>
                Submit Answer
              </Button>
              <Button
                type="button"
                onClick={handleNextQuestion}
                className="ml-4"
              >
                Next Question
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SurveyQuestionPage;
