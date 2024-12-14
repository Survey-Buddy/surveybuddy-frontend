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

interface Survey {
  name: string;
  description: string;
  date: Date | null;
  endDate?: Date | null;
  active?: boolean;
  organisation: string;
  purpose: string;
  _id: string;
  userId: string;
  respondents: string;
  _v: number;
}

interface Question {
  question: string;
  questionNum: number;
  _id: string;
  questionFormat: string;
}

const SurveyPage: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [surveyData, setSurveyData] = useState<Survey | null>(null);
  const [questionData, setQuestionData] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveyData = async () => {
      if (!surveyId) {
        console.log("No surveyId");
        return;
      }
      try {
        const data = await getSurveyData(surveyId);
        if (data) {
          console.log("Survey data:", data);

          const mappedData: Survey = {
            ...data,
            date: data.date ? new Date(data.date) : null,
            endDate: data.completionDate ? new Date(data.completionDate) : null,
            active: data.active ?? false,
          };
          setSurveyData(mappedData);
        }
      } catch (error) {
        console.error("Error fetching survey data: ", error);
      }
    };
    fetchSurveyData();
  }, [surveyId]);

  useEffect(() => {
    const fetchQuestionsData = async () => {
      if (!surveyId) {
        console.log("No surveyId");
        return;
      }
      try {
        const data = await getQuestionsData(surveyId);
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
    <div className=" w-full py-20 lg:py-40 min-w-700">
      <div className="container mx-auto">
        <div className=" grid flex flex-col justify-center  gap-10">
          <div className="flex gap-10 flex flex-row ">
            <div className="flex gap-4 flex-col ">
              <div>
                <Badge variant="outline">Survey</Badge>
              </div>
              <div className="flex gap-2  flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
                  {surveyData?.name ? ` ${surveyData.name}!` : ""}
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground">
                  {surveyData?.description ? `${surveyData?.description}` : ""}
                </p>

                <p>
                  End Date:{" "}
                  {surveyData?.endDate
                    ? format(new Date(surveyData.endDate), "MMMM dd, yyyy")
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
                  <Link to={`/surveys/${surveyId}/analytics`}>
                    <Button>Analytics</Button>
                  </Link>
                </div>
              </div>
              <div className="">
                {/* <Button className="gap-4" variant="outline">
                  Any questions? Reach out <PhoneCall className="w-4 h-4" />
                </Button> */}
              </div>
            </div>
          </div>
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
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
export default SurveyPage;
