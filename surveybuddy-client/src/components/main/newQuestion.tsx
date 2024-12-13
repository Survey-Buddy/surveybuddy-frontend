import { getToken } from "@/utils/jwtToken";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
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
import { optional, z } from "zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { useCallback, useEffect, useState } from "react";

const multiChoiceSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters long." }),
  answer: z.enum(["answerA", "answerB", "answerC", "answerD"]).optional(),
  answerA: z
    .string()
    .min(3, { message: "Answer A must be at least 3 characters long." }),
  answerB: z
    .string()
    .min(3, { message: "Answer B must be at least 3 characters long." }),
  answerC: z
    .string()
    .min(3, { message: "Answer C must be at least 3 characters long." }),
  answerD: z
    .string()
    .min(3, { message: "Answer D must be at least 3 characters long." }),
  questionFormat: z.enum(["multiChoice"]).default("multiChoice"),
});

const writtenResponseSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters long." }),
  questionFormat: z.enum(["writtenResponse"]).default("writtenResponse"),
});

const rangeSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters long." }),
  answer: z.enum(["no", "notAtAll", "disagree"]).default("no"),
  questionFormat: z.enum(["rangeSlider"]).default("rangeSlider"),
});

export function NewQuestionCard() {
  const [activeTab, setActiveTab] = useState("writtenResponse");
  const token = getToken();
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

  // Initialise form with dynamic schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(getSchema()),
    model: "onChange",
  });

  const onSubmit = useCallback(
    async (
      data: FieldValues,

      event: React.FormEvent<HTMLFormElement>
    ) => {
      const buttonValue = (event.nativeEvent.submitter as HTMLButtonElement)
        .value;

      data.answer = radioChoice;

      try {
        console.log({ ...data, surveyId, questionNum });
        const response = await axios.post(
          `http://localhost:8080/surveys/${surveyId}/questions`,
          { ...data, surveyId, questionNum },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response) {
          throw new Error("Error submitting survey.");
        }

        console.log(response);

        setQuestionNum(questionNum + 1);
        console.log(questionNum);

        reset();

        if (buttonValue === "nextQuestion") {
          navigate(`/surveys/${surveyId}/questions/${questionNum}`);
        }

        if (buttonValue === "surveySubmit") {
          navigate(`/surveys/${surveyId}`);
        }
      } catch (error) {
        console.error("Error sending data", error);
      }
    },
    [navigate, surveyId, questionNum, token, radioChoice]
  );

  useEffect(() => {
    reset();
  }, [reset, activeTab]);

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  useEffect(() => {
    setValue("answer", radioChoice);
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("answerA")}
                />
                <Input
                  id="answerB"
                  type="text"
                  placeholder="Answer B"
                  {...register("answerB")}
                />
                <Input
                  id="answerC"
                  type="text"
                  placeholder="Answer C"
                  {...register("answerC")}
                />
                <Input
                  id="answerD"
                  type="text"
                  placeholder="Answer D"
                  {...register("answerD")}
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
              <Button type="submit" value="nextQuestion">
                New Question
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </form>
    </Tabs>
  );
}
