import { useEffect, useState } from "react";
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

// Bar Chart for Range Slider Data Visualisation
// Taken from Shadcn and edited to suit functionality

export function ResponseBarChart() {
  const { surveyId, questionId } = useParams<{
    surveyId: string;
    questionId: string;
  }>();

  // Loading status state
  const [loading, setLoading] = useState<boolean>(true);
  // Question data state
  const [questionData, setQuestionData] = useState<Question | null>();
  // Bar chart data state
  const [chartData, setChartData] = useState<
    { value: number; count: number }[]
  >([]);

  // Fetch question and answer data when id change
  useEffect(() => {
    if (!surveyId || !questionId) {
      console.error("Survey ID or Question ID is required but missing.");
      setLoading(false);
      return;
    }

    // Fetch question details
    const fetchQuestionData = async () => {
      try {
        const questionDataResponse = await getQuestionData(
          surveyId,
          questionId
        );
        setLoading(true);

        if (questionDataResponse) {
          console.log("Fetched question answers:", questionDataResponse);
        }
        setQuestionData(questionDataResponse);
      } catch (error) {
        console.error("Error fetching question answers:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch answers for the question
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await getQuestionAnswers(surveyId, questionId);

        if (response && response.success) {
          console.log("Fetched question answers:", response.data);

          // Extract answers and filter for valid range slider values (0-10)
          // @ts-expect-error: Property 'answers'
          const answers = response.data.answers
            .map((response: Answer) => response.answer)
            .filter(
              (rangeScore: number) => rangeScore >= 0 && rangeScore <= 10
            );

          // Count occurrences of each score of 1-10
          const counts = Array.from({ length: 11 }, (_, scoreValue) => ({
            value: scoreValue,
            count: answers.filter(
              (rangeScore: number) => rangeScore === scoreValue
            ).length,
          }));

          // Update chart data
          setChartData(counts);
        } else {
          console.error("Failed to fetch question answers.");
          //   setError(response?.message || "Failed to fetch question answers.");
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

  // Display loading while data is fetched
  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center ">
      <Card className="w-auto h-auto">
        {/* Card Header displays question details */}
        <CardHeader>
          <CardTitle>{questionData?.question}</CardTitle>
          <CardDescription>Displaying Range Slider Responses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-center align-center">
            {/* BarChart to visualize range slider responses */}
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
              <XAxis />
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

          {/* Display range slider labels based on range description */}
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
