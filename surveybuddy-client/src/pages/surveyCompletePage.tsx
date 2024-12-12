import { Check, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getToken } from "@/utils/jwtToken";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { deleteSurvey } from "../utils/surveyUtils/surveyFunctions";

interface Survey {
  name: string;
  description: string;
  date: Date;
  endDate: Date;
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

function SurveyCompletePage() {
  const { surveyId } = useParams();
  const token = getToken();
  const [surveyData, setSurveyData] = useState<Survey | null>(null);
  const [questionData, setQuestionData] = useState<Question[]>([]);
  const navigate = useNavigate();

  async function getSurveyData(): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/surveys/${surveyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setSurveyData(response.data.data);
    } catch (error) {
      console.error("Error fetch survey data", error);
    }
  }

  async function getQuestionData(): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/surveys/${surveyId}/questions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestionData(response.data.data);
      console.log("Question response: ", response);
    } catch (error) {
      console.error("Error fetching question data", error);
    }
  }

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

  // Depends on surveyId to run
  useEffect(() => {
    getSurveyData();
  }, [surveyId]);

  // Depends on surveyId
  useEffect(() => {
    if (surveyId) {
      getQuestionData();
    }
  }, [surveyId]);

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
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>{/* <Badge variant="outline">Survey</Badge> */}</div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  Congratulations, You've created survey:
                  {surveyData?.name ? ` ${surveyData.name}!` : ""}
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                  {surveyData?.description}
                </p>

                <p>
                  End Date:{" "}
                  {surveyData?.endDate
                    ? format(new Date(surveyData.endDate), "MMMM dd, yyyy")
                    : "No end date provided"}
                </p>
                <Button onClick={() => handleDelete(surveyId)}>
                  Delete Survey
                </Button>
                <Link to={`/surveys/${surveyId}/edit`}>
                  <Button>Edit Survey</Button>
                </Link>
              </div>
              <div className="">
                <Button className="gap-4" variant="outline">
                  Any questions? Reach out <PhoneCall className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {questionData.map((question, index) => (
              <AccordionItem key={index} value={"index-" + index}>
                <AccordionTrigger>
                  Question number {question.questionNum}
                </AccordionTrigger>
                <AccordionContent>{question.question}</AccordionContent>
                <AccordionContent>
                  {questionFormatResponse(question.questionFormat)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
export default SurveyCompletePage;
