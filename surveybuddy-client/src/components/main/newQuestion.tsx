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

// New Survey Question Component
// ** Needs breaking down into smaller components, such as for each question type

export const NewQuestionCard = () => {
  // Set active tab state to determine schema
  const [activeTab, setActiveTab] = useState("writtenResponse");
  // Hook for navigating routes
  const navigate = useNavigate();
  // Get survey id from URL params
  const { surveyId } = useParams();
  // Track question number state
  const [questionNum, setQuestionNum] = useState(1);
  // Default range slider choice to fix TS error
  const [radioChoice, setRadioChoice] = useState("no");

  // Function to dynamically return the correct schema based on active tab state
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
  } = useForm<Question>({
    // Zod for schema validation
    resolver: zodResolver(getSchema()),
    // Validate on every change
    mode: "onChange",
  });

  // Function to handle form submit
  const onSubmit = async (
    data: Question,
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    const buttonValue = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;

    // Assign range slider description to fix TS error
    data.rangeDescription = radioChoice as "no" | "notAtAll" | "disagree";

    try {
      const payload: Question = { ...data, surveyId, questionNum };
      console.log("Creating question: ", payload);

      // Create question API call function with payload
      const response = await createQuestion(payload);

      if (response) {
        console.log("Question created successfully: ", response);

        // Increment question number
        setQuestionNum((prev) => prev + 1);
        // Reset the form
        reset();

        // Navigate based on clicked button
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
  // TS error fix
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit((data) => onSubmit(data, event))(event);
  };

  // Reset the form when active tab changes
  useEffect(() => {
    reset();
  }, [reset, activeTab]);

  // Sync radio choice with the form value to fix TS error
  useEffect(() => {
    setValue("rangeDescription", radioChoice as "no" | "notAtAll" | "disagree");
  }, [radioChoice, setValue]);

  return (
    <Tabs
      defaultValue="writtenResponse"
      className="w-[600px]"
      onValueChange={(value) => setActiveTab(value)}
    >
      {/* Tabs for question types */}
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
};
