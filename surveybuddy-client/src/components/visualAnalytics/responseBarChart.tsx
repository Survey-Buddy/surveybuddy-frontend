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

export function ResponseBarChart() {
  const { surveyId, questionId } = useParams<{
    surveyId: string;
    questionId: string;
  }>();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [chartData, setChartData] = React.useState<
    { value: number; count: number }[]
  >([]);

  React.useEffect(() => {
    if (!surveyId || !questionId) {
      console.error("Survey ID or Question ID is required but missing.");
      setError("Survey ID and Question ID are required.");
      setLoading(false);
      return;
    }

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
          const answers = response.data.answers
            .map((a: any) => a.answer)
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

    fetchData();
  }, [surveyId, questionId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center ">
      <Card className="w-auto h-auto">
        <CardHeader>
          <CardTitle>Enhanced Bar Chart</CardTitle>
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
                label={{
                  value: "Range Value",
                  position: "insideBottom",
                  offset: -20,
                }}
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
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none"></div>
          <div className="leading-none text-muted-foreground">
            Showing total number of responses
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
