import { NewSurveyCard } from "@/components/main/newSurvey";
import { getSurveyData } from "@/utils/surveyUtils/surveyFunctions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

const EditSurveyPage: React.FC = () => {
  const [surveyData, setSurveyData] = useState<Survey | null>();
  const { surveyId } = useParams<{ surveyId: string }>();
  useEffect(() => {
    const fetchSurveyData = async () => {
      if (!surveyId) {
        console.log("No surveyId");
        return;
      }
      try {
        const data = await getSurveyData(surveyId);
        if (data) {
          console.log("Survey data fetched:", data);
          setSurveyData(data);
        } else {
          console.error("No data returned for survey");
        }
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    };

    fetchSurveyData();
  }, [surveyId]);

  return (
    <div className="mt-[10%] flex justify-center">
      {" "}
      <NewSurveyCard propsSurveyData={surveyData} />
    </div>
  );
};

export default EditSurveyPage;
