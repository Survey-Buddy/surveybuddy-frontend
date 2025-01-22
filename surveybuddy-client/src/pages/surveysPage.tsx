import { useEffect, useState } from "react";
import { SurveyCard } from "@/components/main/surveysCards";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyList } from "@/components/main/surveyList";
import { useUserData } from "@/context/userContext";
import getSurveys from "../utils/surveyUtils/surveyFunctions";
import { Survey } from "@/utils/surveyUtils/surveyTypes";

// User Surveys Page

const SurveysPage: React.FC = () => {
  // Store surveys data in state
  const [surveys, setSurveys] = useState<Survey[]>([]);
  // Track whether is loading or not
  const [loading, setLoading] = useState<boolean>(true);
  // State to toggle between list and card views
  const [isList, setIsList] = useState<boolean>(false);
  // Get user data from context to fetch surveys
  const { userData } = useUserData();

  // Fetch survey data when component mounts
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const data = await getSurveys();
        if (data.length > 0) {
          // Map data to ensure proper formatted to fix TS error
          const updatedData: Survey[] = data.map((survey: Survey) => ({
            _id: survey._id,
            name: survey.name,
            organisation: survey.organisation || "N/A",
            respondents: survey.respondents || "public",
            description: survey.description || "",
            active: survey.active ?? false,
            date: typeof survey?.date === "string" ? survey.date : "",
            endDate: survey.endDate || "",
            userId: survey.userId || "Unknown",
            purpose: survey.purpose || "General",
          }));
          // Update state with newly formatted data
          setSurveys(updatedData);
        } else {
          console.error("Failed to fetch surveys.");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    // Call function to fetch surveys data
    fetchSurveys();
  }, []);

  // Display loading while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-full py-20 lg:py-40 ">
        <div className="container mx-auto">
          <div className="flex flex-col  gap-10">
            {/* Header with tabs for toggling between card and list view */}
            <div className="flex justify-center items-start">
              <div className="flex gap-2 flex-col">
                <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular ">
                  {userData
                    ? `${userData.username}'s Surveys!`
                    : "Your Surveys!"}
                </h2>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  ">
                  Survey history.
                </p>

                {/* Tabs for switching between card and list view */}
                <div className="flex flex-row">
                  <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList className="mt-8">
                      <TabsTrigger
                        onClick={() => setIsList(false)}
                        value="cards"
                      >
                        Cards
                      </TabsTrigger>
                      <TabsTrigger onClick={() => setIsList(true)} value="list">
                        List
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* Render surveys if data truthy */}
            {surveys.length > 0 ? (
              <div className="w-full flex gap-4 justify-center ">
                <ul
                  className={`${
                    isList
                      ? "flex flex-col items-center justify-center gap-8 w-full max-w-2xl"
                      : "grid grid-cols-2 items-center justify-center gap-8 w-full max-w-2xl"
                  }`}
                >
                  {/* Render survey list or card view based on state */}
                  {isList ? (
                    <SurveyList surveys={surveys} />
                  ) : (
                    surveys.map((survey) => (
                      <li key={survey._id} className="w-full">
                        <SurveyCard
                          date={survey.date}
                          name={survey.name}
                          description={survey.description}
                          active={survey.active || false}
                          _id={survey._id}
                          respondents={survey.respondents}
                          organisation={survey.organisation}
                          endDate={survey.endDate}
                        />
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ) : (
              <p>No surveys found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveysPage;
