import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getQuestionsData from "@/utils/questionUtils/questionFunctions";
import {
  //   isRangeSliderDetails,
  isMultiChoiceDetails,
  Question,
} from "@/utils/questionUtils/questionTypes";
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
import {
  writtenResponseAnswerSchema,
  multiChoiceAnswerSchema,
  rangeSliderAnswerSchema,
} from "@/utils/resultsUtils/answerSchema";
import { z } from "zod";
import { Answer } from "@/utils/resultsUtils/resultsTypes";
import { newAnswer } from "@/utils/resultsUtils/answerFunction";

// Display and Answer Question Component Page
// ** Needs to be broken into smaller components

export const SurveyQuestionPage = () => {
  // Get survey id and question number from URL params
  const { surveyId, questionNum } = useParams<{
    surveyId: string;
    questionNum: string;
  }>();

  // States for survey data, questions, current question, and submission status
  const [surveyData, setSurveyData] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isSubmit, setIsSubmit] = useState(false);

  // Navigation hook to navigate to next question
  const navigate = useNavigate();

  // Calc current question index
  const currentQuestionIndex = parseInt(questionNum || "1", 10) - 1;

  // Function to determine which validation schema to use based on question type
  const getSchema = () => {
    if (currentQuestion?.questionFormat === "writtenResponse")
      return writtenResponseAnswerSchema;
    if (currentQuestion?.questionFormat === "multiChoice")
      return multiChoiceAnswerSchema;
    if (currentQuestion?.questionFormat === "rangeSlider")
      return rangeSliderAnswerSchema;
    return z.object({});
  };

  // React hook form setup
  // ** Move to Yup ?
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(getSchema()),
    mode: "onChange",
    defaultValues: {
      writtenResponseAnswer: "",
      multiChoiceAnswer: "",
      rangeSliderAnswer: undefined,
    },
  });

  // Watch for range slider values to change
  const rangeSliderValue = watch("rangeSliderAnswer");

  // Fetch survey and question data on mount or when survey id or
  // when current question index changes
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
        const data = await getQuestionsData(surveyId);
        if (!data) {
          console.log("Error fetching question data.");
          return;
        }
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

  // Handle form submission
  const handleAnswerSubmit = async (data: Answer) => {
    try {
      // Check and ensure answer is valid
      const answer =
        data.writtenResponseAnswer ??
        data.multiChoiceAnswer ??
        data.rangeSliderAnswer;

      if (answer === undefined) {
        throw new Error("Answer is missing or invalid.");
      }

      if (!currentQuestion?._id || !surveyId) {
        throw new Error("Question ID or Survey ID is missing.");
      }
      // Mark as submitted
      setIsSubmit(true);
      const response = await newAnswer(answer, surveyId, currentQuestion?._id);

      if (response) {
        console.log("Answer successfully sent to backend!");
      }
    } catch (error) {
      console.error("Answer submission Error:", error);
    }
  };

  // Reset form and state when the current question changes
  useEffect(() => {
    if (currentQuestion) {
      reset({
        multiChoiceAnswer: "",
        writtenResponseAnswer: "",
        rangeSliderAnswer: undefined,
      });
      setValue("rangeSliderAnswer", undefined, { shouldValidate: false });
      // Reset submission state for the new question
      setIsSubmit(false);
    }
  }, [currentQuestion, reset, setValue]);

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      reset({
        multiChoiceAnswer: "",
        writtenResponseAnswer: "",
        rangeSliderAnswer: undefined,
      });
      setIsSubmit(false);
      navigate(`/surveys/${surveyId}/response/${currentQuestionIndex + 2}`);
    } else {
      console.log("Survey completed!");
      // Navigate to completion page on complete
      navigate(`/surveys/${surveyId}/complete`);
    }
  };

  // Show loading message if data not fetched
  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div className={`flex flex-col items-center justify-center mt-40 `}>
      <div className="min-w-[50%]">
        <h1>{surveyData?.name ? `Survey: ${surveyData.name}` : ""}</h1>
        <h2>
          {surveyData?.description
            ? `Description: ${surveyData.description}`
            : ""}
        </h2>

        <Card className={`border-1 m-5`}>
          <CardHeader>
            <CardTitle>{`Question ${currentQuestion.questionNum}`}</CardTitle>
            <CardDescription>{currentQuestion?.question}</CardDescription>
          </CardHeader>

          <form
            onSubmit={handleSubmit(
              // @ts-expect-error handleAnswerSubmit type error
              handleAnswerSubmit
            )}
          >
            {/* Render input based on question format */}
            <CardContent className="space-y-2">
              {currentQuestion?.questionFormat === "writtenResponse" && (
                <div>
                  <Label htmlFor={`question-${currentQuestion._id}`}>
                    Your Answer
                  </Label>
                  <textarea
                    className="border border-gray-300 rounded p-2 w-full h-32"
                    placeholder="Enter your response..."
                    {...register("writtenResponseAnswer")}
                    id={`question-${currentQuestion._id}`}
                  />
                </div>
              )}
              {currentQuestion?.questionFormat === "multiChoice" &&
                isMultiChoiceDetails(currentQuestion.formatDetails) && (
                  <RadioGroup
                    key={currentQuestion?._id}
                    value={watch("multiChoiceAnswer")}
                    onValueChange={(value) => {
                      setValue("multiChoiceAnswer", value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    {Object.entries(currentQuestion.formatDetails).map(
                      ([key, value], index) => (
                        <div
                          className="flex items-center space-x-2"
                          key={index}
                        >
                          {/* Ensure the key is passed to value */}
                          <RadioGroupItem value={key} id={key} />
                          <Label htmlFor={key}>{value}</Label>
                        </div>
                      )
                    )}
                  </RadioGroup>
                )}
              {currentQuestion?.questionFormat === "rangeSlider" && (
                <>
                  <Slider
                    max={10}
                    step={1}
                    value={[rangeSliderValue || 0]}
                    onValueChange={(value) =>
                      // @ts-expect-error number undefined error
                      setValue("rangeSliderAnswer", value[0])
                    }
                  />
                  {currentQuestion?.rangeDescription === "no" ? (
                    <div className="flex justify-between w-full">
                      <p>No</p>
                      <p>Maybe</p>
                      <p>Yes</p>{" "}
                    </div>
                  ) : currentQuestion?.rangeDescription === "notAtAll" ? (
                    <div className="flex justify-between w-full">
                      <p>Not At All</p>
                      <p>Not Sure</p>
                      <p>Completely</p>{" "}
                    </div>
                  ) : (
                    <div className="flex justify-between w-full">
                      <p>Disagree</p>
                      <p>I&apos;m Partial</p>
                      <p>Completely Agree</p>{" "}
                    </div>
                  )}
                </>
              )}
              {errors && (
                <p className="text-red-500">
                  {String(
                    errors.writtenResponseAnswer?.message ||
                      errors.rangeSliderAnswer?.message ||
                      ""
                  )}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={
                  !isValid ||
                  isSubmit ||
                  (currentQuestion?.questionFormat === "rangeSlider" &&
                    !watch("rangeSliderAnswer"))
                }
              >
                Submit Answer
              </Button>
              <Button
                type="button"
                onClick={handleNextQuestion}
                className="ml-4"
                disabled={!isSubmit}
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
