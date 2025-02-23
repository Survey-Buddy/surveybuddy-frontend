import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  deleteSurvey,
  getSurveyData,
} from "../utils/surveyUtils/surveyFunctions";
import getQuestionsData from "@/utils/questionUtils/questionFunctions";
import { Badge } from "@/components/ui/badge";
import { Survey } from "@/utils/surveyUtils/surveyTypes";
import CopyToClipboard from "@/components/main/copyToClipboard";
import { Question } from "@/utils/questionUtils/questionTypes";

// Display Specific Survey Details Component

export const SurveyPage = () => {
  // Extract survey id from url params
  const { surveyId } = useParams<{ surveyId: string }>();
  // Store survey data state
  const [surveyData, setSurveyData] = useState<Survey | null>(null);
  // Store question data state
  const [questionData, setQuestionData] = useState<Question[]>([]);
  // useNavigate hook to navigate to new route
  const navigate = useNavigate();

  // Fetch survey data when the component mounts or surveyId changes
  useEffect(() => {
    const fetchSurveyData = async () => {
      if (!surveyId) {
        console.log("No surveyId");
        return;
      }
      try {
        const data = await getSurveyData(surveyId);
        if (data) {
          // Format and map survey data
          let formattedEndDate: string;
          // Validate and format endDate to be a string to fix TS error
          if (data.endDate && !isNaN(Date.parse(data.endDate))) {
            formattedEndDate = new Date(data.endDate).toISOString();
          } else {
            console.warn("Invalid or missing endDate:", data.endDate);
            formattedEndDate = "Unknown";
          }

          // Validate and format endDate to be a string to fix TS error
          const formattedDate =
            data.date && !isNaN(Date.parse(data.date))
              ? new Date(data.date).toISOString()
              : new Date().toISOString();

          const mappedData: Survey = {
            ...data,
            date: formattedDate,
            formattedEndDate,
            active: data.active ?? false,
          };

          console.log("Mapped survey data:", mappedData);
          // Set formatted survey data to state
          setSurveyData(mappedData);
        }
      } catch (error) {
        console.error("Error fetching survey data: ", error);
      }
    };
    fetchSurveyData();
  }, [surveyId]);

  // Fetch survey questions when component mounts or survey id changes
  useEffect(() => {
    const fetchQuestionsData = async () => {
      if (!surveyId) {
        console.log("No surveyId");
        return;
      }
      try {
        const data = await getQuestionsData(surveyId);
        console.log("Question data: ", data);
        if (data) {
          console.log("Question data: ", data);
          setQuestionData(data);
        }
      } catch (error) {
        console.error("Error fetching survey data: ", error);
      }
    };
    fetchQuestionsData();
  }, [surveyId]);

  // Delete survey data
  const handleDelete = async (surveyId: string) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this survey? All survey and question data will be lost."
    );
    if (userConfirmed) {
      const response = await deleteSurvey(surveyId);
      if (response) {
        alert("Survey deleted successfully!");
        navigate("/surveys");
      } else {
        alert("Failed to delete the survey. Please try again.");
      }
    }
  };

  // Function to format question types
  const questionFormatResponse = (questionFormat: string): string => {
    if (questionFormat === "multiChoice") {
      return "Multiple Choice";
    } else if (questionFormat === "writtenResponse") {
      return "Written Response";
    } else if (questionFormat === "rangeSlider") {
      return "Range Slider";
    } else {
      return "Unknown Format";
    }
  };

  return (
    <div className="flex flex-row-[60%] justify-center items-center py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex ml-[5%]">
          <Link to={"/surveys"}>
            <Button>Back</Button>
          </Link>
        </div>
        <div className=" grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 justify-center flex-row ">
            <div className="flex gap-4 flex-col ">
              <div>
                <Badge variant="outline">Survey</Badge>
              </div>

              <div className="flex gap-2 justify-center flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
                  {surveyData?.name ? `${surveyData.name}!` : ""}
                </h4>
                <div className="flex flex-row justify-center">
                  <CopyToClipboard
                    textToCopy={`https://surveybuddy.tech/surveys/${surveyId}/response/1`}
                  ></CopyToClipboard>
                </div>
                <Link
                  to={`https://surveybuddy.tech/surveys/${surveyId}/response/1`}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Survey
                </Link>
                {/* Formatting dates to fix TS errors */}
                <p>
                  End{" "}
                  {surveyData?.formattedEndDate &&
                  surveyData.formattedEndDate !== "Unknown"
                    ? format(
                        new Date(surveyData.formattedEndDate),
                        "MMMM dd, yyyy"
                      )
                    : "No end date provided"}
                </p>
                <p>
                  Start{" "}
                  {surveyData?.date
                    ? format(new Date(surveyData.date), "MMMM dd, yyyy")
                    : "No end date provided"}
                </p>

                <div className="m-1">
                  <Button
                    onClick={() => {
                      if (surveyId) {
                        handleDelete(surveyId);
                      } else {
                        alert("Survey ID is missing.");
                      }
                    }}
                  >
                    Delete
                  </Button>

                  <Link to={`/surveys/${surveyId}/edit`}>
                    <Button>Edit</Button>
                  </Link>
                  <p>
                    {surveyData?.organisation
                      ? `Organisation: ${surveyData.organisation}`
                      : ""}
                  </p>
                  <p>
                    {surveyData?.purpose
                      ? `Purpose: ${surveyData.purpose}`
                      : ""}
                  </p>
                  <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground">
                    {surveyData?.description
                      ? `${surveyData?.description}`
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex p-[10%] gap-8">
            <Accordion type="single" collapsible className="w-full">
              {questionData.map((question, index) => (
                <AccordionItem key={index} value={"index-" + index}>
                  <AccordionTrigger>
                    Question number {question.questionNum}
                  </AccordionTrigger>
                  <AccordionContent>
                    Question: {question.question}
                  </AccordionContent>
                  <AccordionContent>
                    Question format:{" "}
                    {questionFormatResponse(question.questionFormat)}
                  </AccordionContent>
                  <AccordionContent>
                    <Link
                      to={`/surveys/${surveyId}/${question._id}/results?questionFormat=${question.questionFormat}`}
                    >
                      <Button>Results</Button>
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
