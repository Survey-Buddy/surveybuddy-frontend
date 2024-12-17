import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import {
  writtenResponseSchema,
  multiChoiceSchema,
  rangeSchema,
} from "@/utils/questionUtils/questionSchema";
import { Question } from "@/utils/questionUtils/questionTypes";
import { createQuestion } from "@/utils/questionUtils/questionFunctions";

export function NewQuestionCard() {
  const [activeTab, setActiveTab] = useState("writtenResponse");
  const navigate = useNavigate();
  const { surveyId } = useParams();
  const [questionNum, setQuestionNum] = useState(1);
  const [radioChoice, setRadioChoice] = useState("no");

  const getSchema = () => {
    if (activeTab === "writtenResponse") return writtenResponseSchema;
    if (activeTab === "multiChoice") return multiChoiceSchema;
    if (activeTab === "rangeSlider") return rangeSchema;
    return writtenResponseSchema;
  };

  // Initialise form with dynamic schema depending on question type
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm<Question>({
    resolver: zodResolver(getSchema()),
    mode: "onChange", // Trigger validation on every change
  });

  //   const onSubmit = useCallback(
  //     async (data: Question, event: React.FormEvent<HTMLFormElement>) => {
  //       const buttonValue = (event.nativeEvent as SubmitEvent)
  //         .submitter as HTMLButtonElement;

  //       data.answer = radioChoice as "no" | "notAtAll" | "disagree";

  //       try {
  //         const payload: Question = { ...data, surveyId, questionNum };
  //         console.log("Creating question: ", payload);

  //         const response = await createQuestion(payload);

  //         if (response) {
  //           console.log("Question created successfully: ", response);

  //           setQuestionNum((prev) => prev + 1);

  //           // Navigate dynamically based on the value of the button when clicked
  //           if (buttonValue.value === "nextQuestion") {
  //             navigate(`/surveys/${surveyId}/questions/${questionNum}`);
  //           }

  //           if (buttonValue.value === "surveySubmit") {
  //             navigate(`/surveys/${surveyId}`);
  //           }

  //           reset();
  //         }
  //       } catch (error) {
  //         console.error("Error during question submission: ", error);
  //       }
  //     },
  //     [navigate, surveyId, reset, questionNum, radioChoice]
  //   );
  const onSubmit = async (
    data: Question,
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    const buttonValue = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;

    data.rangeDescription = radioChoice as "no" | "notAtAll" | "disagree";

    try {
      const payload: Question = { ...data, surveyId, questionNum };
      console.log("Creating question: ", payload);

      const response = await createQuestion(payload);

      if (response) {
        console.log("Question created successfully: ", response);

        setQuestionNum((prev) => prev + 1);

        reset();

        if (buttonValue.value === "nextQuestion") {
          navigate(`/surveys/${surveyId}/questions/${questionNum}`);
        }

        if (buttonValue.value === "surveySubmit") {
          navigate(`/surveys/${surveyId}`);
        }
      }
    } catch (error) {
      console.error("Error during question submission: ", error);
    }
  };

  // Wrap handleSubmit to manually inject the event
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit((data) => onSubmit(data, event))(event);
  };

  useEffect(() => {
    reset();
  }, [reset, activeTab]);

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  useEffect(() => {
    setValue("rangeDescription", radioChoice as "no" | "notAtAll" | "disagree");
    console.log(radioChoice);
  }, [radioChoice, setValue]);

  return (
    <Tabs
      defaultValue="writtenResponse"
      className="w-[600px]"
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="writtenResponse">Written Response</TabsTrigger>
        <TabsTrigger value="multiChoice">Multi Choice</TabsTrigger>
        <TabsTrigger value="rangeSlider">Range Slider</TabsTrigger>
      </TabsList>
      <form onSubmit={handleFormSubmit}>
        <TabsContent value="writtenResponse">
          <Card>
            <CardHeader>
              <CardTitle>Written Response</CardTitle>
              <CardDescription>
                <Popover>
                  <PopoverTrigger className="cursor-pointer hover:underline ">
                    Description
                  </PopoverTrigger>
                  <PopoverContent>
                    Written response survey questions are ideal for capturing
                    detailed, qualitative feedback. They allow respondents to
                    express thoughts in their own words, providing deeper
                    insights. While they lack immediate data analytics, the
                    responses can later be analysed for trends or key themes.
                  </PopoverContent>
                </Popover>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="question">Question</Label>

                <textarea
                  className="border border-gray-300 rounded p-2 w-full h-32"
                  placeholder="Enter your question here..."
                  {...register("question")}
                  rows={5}
                  id="description"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" value="surveySubmit">
                Submit Survey
              </Button>
              <Button type="submit" value="nextQuestion">
                New Question
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="multiChoice">
          <Card>
            <CardHeader>
              <CardTitle>Multiple Choice</CardTitle>
              <CardDescription>
                <Popover>
                  <PopoverTrigger className="cursor-pointer hover:underline ">
                    Description
                  </PopoverTrigger>
                  <PopoverContent>
                    Multiple-choice survey questions are ideal for gathering
                    clear, quantifiable responses. They present a set of
                    predefined options, allowing respondents to select one or
                    more answers. This format simplifies data analysis, as
                    responses are easily categorised, but it limits the depth of
                    feedback compared to open-ended questions.
                  </PopoverContent>
                </Popover>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="question">Question</Label>
                <textarea
                  className="border border-gray-300 rounded p-2 w-full h-32"
                  placeholder="Enter your question here..."
                  {...register("question")}
                  rows={3}
                  id="description"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="answer">Answers</Label>

                <Input
                  id="answerA"
                  type="text"
                  placeholder="Answer A"
                  {...register("formatDetails.answerA")}
                />
                <Input
                  id="answerB"
                  type="text"
                  placeholder="Answer B"
                  {...register("formatDetails.answerB")}
                />
                <Input
                  id="answerC"
                  type="text"
                  placeholder="Answer C"
                  {...register("formatDetails.answerC")}
                />
                <Input
                  id="answerD"
                  type="text"
                  placeholder="Answer D"
                  {...register("formatDetails.answerD")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" value="surveySubmit">
                Submit Survey
              </Button>
              <Button type="submit" value="nextQuestion">
                New Question
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="rangeSlider">
          <Card>
            <CardHeader>
              <CardTitle>Range Slider</CardTitle>
              <CardDescription>
                <Popover>
                  <PopoverTrigger className="cursor-pointer hover:underline ">
                    Description
                  </PopoverTrigger>
                  <PopoverContent>
                    Range slider survey questions are perfect for capturing
                    nuanced, quantifiable opinions. They allow respondents to
                    select a value within a predefined range, providing insight
                    into degrees of agreement, satisfaction, or preference. This
                    format offers flexibility and precision, making it ideal for
                    measuring gradients in sentiment, though it may lack the
                    contextual depth of written responses.
                  </PopoverContent>
                </Popover>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="mcQuestion">Question</Label>
                <textarea
                  className="border border-gray-300 rounded p-2 w-full h-32"
                  placeholder="Enter your question here..."
                  {...register("question")}
                  rows={3}
                  id="description"
                />
                {errors.question && <p>{errors.question.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Answer</Label>

                <Slider defaultValue={[33]} max={10} step={1} />
              </div>
              <RadioGroup
                value={radioChoice}
                className="mt-[6]"
                onValueChange={(value) => setRadioChoice(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No, Maybe, Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="notAtAll" id="notAtAll" />
                  <Label htmlFor="notAtAll">
                    Not at all, Not sure, Completely
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="disagree" id="disagree" />
                  <Label htmlFor="disagree">
                    Disagree, I'm partial, Completely agree
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button type="submit" value="surveySubmit">
                Submit Survey
              </Button>
              <Button type="submit" disabled={!isValid} value="nextQuestion">
                New Question
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </form>
    </Tabs>
  );
}
