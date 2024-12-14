import { NewSurveyCard } from "@/components/main/newSurvey";
import { getSurveyData } from "@/utils/surveyUtils/surveyFunctions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Survey } from "../utils/surveyUtils/surveyTypes";

const EditSurveyPage: React.FC = () => {
  const [surveyData, setSurveyData] = useState<Survey | null>(null);
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

          const mappedData: Survey = {
            ...data,
            date: data.date ? new Date(data.date) : new Date(),
            endDate: data.endDate ? new Date(data.endDate) : null,
            active: data.active ?? false,
          };
          setSurveyData(mappedData);
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
