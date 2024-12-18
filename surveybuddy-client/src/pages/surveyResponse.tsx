import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getQuestionData from "@/utils/questionUtils/questionFunctions";
import {
  isRangeSliderDetails,
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

const SurveyQuestionPage: React.FC = () => {
  const { surveyId, questionNum } = useParams<{
    surveyId: string;
    questionNum: string;
  }>();
  const [surveyData, setSurveyData] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const currentQuestionIndex = parseInt(questionNum || "1", 10) - 1;

  const getSchema = () => {
    if (currentQuestion?.questionFormat === "writtenResponse")
      return writtenResponseAnswerSchema;
    if (currentQuestion?.questionFormat === "multiChoice")
      return multiChoiceAnswerSchema;
    if (currentQuestion?.questionFormat === "rangeSlider")
      return rangeSliderAnswerSchema;
    return z.object({});
  };

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

  const handleAnswerSubmit = async (data: Answer) => {
    try {
      console.log("Submitted answer:", data);
      console.log("Current question ID:", currentQuestion?._id);

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

      setIsSubmit(true);

      const response = await newAnswer(answer, surveyId, currentQuestion?._id);

      if (response) {
        console.log("Answer successfully sent to backend!");
      }
    } catch (error) {
      console.error("Answer submission Error:", error);
    }
  };

  useEffect(() => {
    if (currentQuestion) {
      reset({
        multiChoiceAnswer: "",
        writtenResponseAnswer: "",
        rangeSliderAnswer: undefined,
      });
      setIsSubmit(false); // Reset submission state for the new question
    }
  }, [currentQuestion, reset]);

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
      // Navigate to completion page
      navigate(`/surveys/${surveyId}/complete`);
    }
  };

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  function getMaxValue(
    value: string | number | undefined,
    fallback: number = 10
  ): number {
    const parsedValue = Number(value);
    return isNaN(parsedValue) ? fallback : parsedValue;
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
              {currentQuestion?.questionFormat === "rangeSlider" &&
                isRangeSliderDetails(currentQuestion.formatDetails) && (
                  <>
                    <Slider
                      // @ts-expect-error max undefined error
                      max={getMaxValue(currentQuestion?.formatDetails?.max)}
                      step={1}
                      {...register("rangeSliderAnswer", {
                        setValueAs: (value) => Number(value),
                      })}
                      onValueChange={(value: number[]) => {
                        if (Array.isArray(value) && value.length > 0) {
                          // @ts-expect-error max undefined error
                          setValue("rangeSliderAnswer", value[0], {
                            shouldValidate: true,
                          });
                        }
                      }}
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
