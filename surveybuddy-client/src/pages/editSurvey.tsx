import { NewSurveyCard } from "@/components/main/newSurvey";
import { getSurveyData } from "@/utils/surveyUtils/surveyFunctions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Survey } from "../utils/surveyUtils/surveyTypes";

// Edit Survey Page Component

const EditSurveyPage: React.FC = () => {
  // State to store existing survey data
  const [surveyData, setSurveyData] = useState<Survey | null>(null);
  // State to store the surveyId from URL parms
  const { surveyId } = useParams<{ surveyId: string }>();

  // Fetch surveyData by Id
  useEffect(() => {
    const fetchSurveyData = async () => {
      if (!surveyId) {
        console.log("No surveyId");
        return;
      }
      try {
        // Call API using function imported from utility file
        const data = await getSurveyData(surveyId);
        if (data) {
          console.log("Survey data fetched:", data);
          // Default value for active to fix TS error
          const mappedData: Survey = {
            ...data,
            active: data.active ?? false,
          };
          // Update state
          setSurveyData(mappedData);
        } else {
          console.error("No data returned for survey");
        }
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    };
    // Call fetch survey API call function
    fetchSurveyData();
  }, [surveyId]);

  // Render new survey card component and pass fetched survey data
  return (
    <div className="mt-[10%] flex justify-center">
      {" "}
      <NewSurveyCard propsSurveyData={surveyData} />
    </div>
  );
};

export default EditSurveyPage;
