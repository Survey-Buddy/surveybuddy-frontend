import * as React from "react";
import { getQuestionAnswers } from "@/utils/resultsUtils/answerFunction";
import { useParams } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { YAxis, Tooltip } from "recharts";
import { Answer } from "@/utils/resultsUtils/resultsTypes";
import { getQuestionData } from "@/utils/questionUtils/questionFunctions";
import { Question } from "@/utils/questionUtils/questionTypes";

export function ResponseBarChart() {
  const { surveyId, questionId } = useParams<{
    surveyId: string;
    questionId: string;
  }>();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [questionData, setQuestionData] = React.useState<Question | null>();
  const [chartData, setChartData] = React.useState<
    { value: number; count: number }[]
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
        setError(null);

        if (questionDataResponse) {
          console.log("Fetched question answers:", questionDataResponse);
        }
        setQuestionData(questionDataResponse);
      } catch (error) {
        console.error("Error fetching question answers:", error);
        setError("An error occurred while fetching question answers.");
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(
          "Fetching question answers for surveyId and questionId:",
          surveyId,
          questionId
        );
        const response = await getQuestionAnswers(surveyId, questionId);

        if (response && response.success) {
          console.log("Fetched question answers:", response.data);

          // Extract answers and filter for valid range slider values (0-10)
          // @ts-expect-error: Property 'answers'
          const answers = response.data.answers

            .map((a: Answer) => a.answer)
            .filter((v: number) => v >= 0 && v <= 10);

          // Count occurrences of each value from 0 to 10
          const counts = Array.from({ length: 11 }, (_, i) => ({
            value: i,
            count: answers.filter((answer: number) => answer === i).length,
          }));

          console.log("Processed chart data:", counts);

          // Set processed data to state
          setChartData(counts);
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
    fetchData();
  }, [surveyId, questionId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center ">
      <Card className="w-auto h-auto">
        <CardHeader>
          <CardTitle>{questionData?.question}</CardTitle>
          <CardDescription>Displaying Range Slider Responses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-center align-center">
            <BarChart
              data={chartData}
              width={500}
              height={300}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 40,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
              // dataKey="value"
              // tickLine={false}
              // tickMargin={10}
              // axisLine={false}
              // label={{
              //   value: "Range Value",
              //   position: "insideBottom",
              //   offset: -20,
              // }}
              />
              <YAxis
                label={{
                  value: "Count",
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                }}
              />
              <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.0)" }} />
              <Bar
                dataKey="count"
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              ></Bar>
            </BarChart>
          </div>
          <div className="ml-[13%] mt-[0]">
            {questionData?.rangeDescription === "no" ? (
              <div className="flex justify-between w-full">
                <p>No</p>
                <p>Maybe</p>
                <p>Yes</p>{" "}
              </div>
            ) : questionData?.rangeDescription === "notAtAll" ? (
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
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none"></div>
          <div className="leading-none text-muted-foreground">
            Showing total number of responses. Hover over chart for results.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
