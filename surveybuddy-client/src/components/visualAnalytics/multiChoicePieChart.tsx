import { Pie, PieChart } from "recharts";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getQuestionAnswers } from "@/utils/resultsUtils/answerFunction";
import { getQuestionData } from "@/utils/questionUtils/questionFunctions";
import { useParams } from "react-router-dom";
import { Question } from "@/utils/questionUtils/questionTypes";

export function MultiChoicePieChart() {
  const { surveyId, questionId } = useParams<{
    surveyId: string;
    questionId: string;
  }>();

  const [loading, setLoading] = React.useState<boolean>(true);
  // const [error, setError] = React.useState<string | null>(null);
  const [questionData, setQuestionData] = React.useState<Question | null>();
  const [chartData, setChartData] = React.useState<
    { browser: string; answers: number; fill: string }[]
  >([]);

  React.useEffect(() => {
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
        setLoading(true);
        // setError(null);

        console.log("Q data response", questionDataResponse);

        if (questionDataResponse) {
          console.log("Fetched question answers:", questionDataResponse);
        }
        setQuestionData(questionDataResponse);
      } catch (error) {
        console.error("Error fetching question answers:", error);
        // setError("An error occurred while fetching question answers.");
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        // setError(null);

        console.log(
          "Fetching question answers for surveyId and questionId:",
          surveyId,
          questionId
        );
        const response = await getQuestionAnswers(surveyId, questionId);

        if (response && response.success) {
          console.log("Fetched question answers:", response.data);

          // Get answers from data
          // @ts-expect-error - answers not type of Answer
          const answers = response.data.answers;

          // Define the allowed keys for counts
          type AnswerKeys = "answerA" | "answerB" | "answerC" | "answerD";

          const counts: Record<AnswerKeys, number> = {
            answerA: 0,
            answerB: 0,
            answerC: 0,
            answerD: 0,
          };

          answers.forEach((item: { answer: string }) => {
            // Use a type guard to ensure item.answer matches one of the keys
            if (item.answer in counts) {
              counts[item.answer as AnswerKeys]++;
            }
          });

          console.log("Answer counts:", counts);

          // Update chart answer data dynamically
          const updatedChartData = [
            {
              browser: "answerA",
              answers: counts.answerA,
              fill: "var(--color-answerA)",
            },
            {
              browser: "answerB",
              answers: counts.answerB,
              fill: "var(--color-answerB)",
            },
            {
              browser: "answerC",
              answers: counts.answerC,
              fill: "var(--color-answerC)",
            },
            {
              browser: "answerD",
              answers: counts.answerD,
              fill: "var(--color-answerD)",
            },
          ];

          setChartData(updatedChartData);
        } else {
          console.error("Failed to fetch question answers.");
          // setError(response?.message || "Failed to fetch question answers.");
        }
      } catch (error) {
        console.error("Error fetching question answers:", error);
        // setError("An error occurred while fetching question answers.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionData();
    fetchData();
  }, [surveyId, questionId]);

  const chartConfig = {
    visitors: {
      label: "Answers",
    },
    answerA: {
      // Value of AnswerA nested in formatDetails or string "Answer A"
      // @ts-expect-error: AnswerA
      label: questionData?.formatDetails.answerA || "Answer A",
      color: "hsl(var(--chart-1))",
    },
    answerB: {
      // @ts-expect-error: AnswerB
      label: questionData?.formatDetails.answerB || "Answer B",
      color: "hsl(var(--chart-2))",
    },
    answerC: {
      // @ts-expect-error: AnswerC
      label: questionData?.formatDetails.answerC || "Answer C",
      color: "hsl(var(--chart-3))",
    },
    answerD: {
      // @ts-expect-error: AnswerD
      label: questionData?.formatDetails.answerD || "Answer D",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center">
      <Card className="flex flex-col ml-[20%] mr-[20%] w-[100%] max-h-[800px]">
        <CardHeader className="items-center p-16 pb-0">
          <CardTitle className="text-xl">Multiple Choice Pie Chart</CardTitle>
          <CardDescription className="text-lg">
            {questionData?.question}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[500px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent hideLabel={false} />}
              />
              {/* Takes a list of objects [ {answerA: number}. {answerB: number}] */}
              <Pie
                data={chartData}
                dataKey="answers"
                nameKey="browser"
                outerRadius="80%"
                innerRadius="40%"
                fill="var(--color-primary)"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground text-center">
            Total responses since creation. Hover over chart for results.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
