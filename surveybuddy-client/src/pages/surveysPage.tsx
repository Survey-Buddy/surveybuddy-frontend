import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SurveyCard } from "@/components/main/surveysCards";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SurveyList } from "@/components/main/surveyList";

interface Survey {
  id: string;
  title: string;
  organisation: string;
  respondents: string;
  description: string;
  active: boolean;
  date: string;
  endDate: Date;
}

async function getSurveys(): Promise<Survey[]> {
  const data = await fetch("http://localhost:3000/surveys");
  if (!data) {
    throw new Error("Failed to fetch surveys.");
  }
  return data.json();
}

const SurveysPage: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isList, setIsList] = useState<boolean>(false);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const data = await getSurveys();
        setSurveys(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurveys();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <div className="w-full py-20 lg:py-40 ">
    <div className="container mx-auto">
      <div className="flex flex-col  gap-10">
        <div className="flex justify-center items-start">
          <div className="">
            {/* <Badge>Surveys</Badge> */}
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular ">
              Your Surveys!
            </h2>
            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  ">
              Survey history. 
            </p>
            <div className="flex flex-row">
            <Tabs defaultValue="account" className="w-[400px]">
  <TabsList className="mt-8">
    <TabsTrigger onClick={() => setIsList(false)} value="account">Cards</TabsTrigger>
    <TabsTrigger onClick={() => setIsList(true)} value="password">List</TabsTrigger>
  </TabsList>
  
  
</Tabs>
            {/* <Link to="/surveys/newsurvey">
            <Button>New Survey</Button>
            </Link> */}
            
</div>
          </div>
        </div>
      {surveys.length > 0 ? (
        <div className="w-full flex justify-center ">
          <ul className="flex flex-col items-center gap-8 w-full max-w-lg">

            
            { isList ? (
            //  <div key={survey.id} className="w-full flex flex-col gap-8">
              <SurveyList
              surveys={surveys}
              />
              // </div> 
              ) : (
                surveys.map((survey) => (
              <li key={survey.id} className="w-full">
                <SurveyCard
                  title={survey.title}
                  description={survey.description}
                  active={survey.active}
                />
              </li>)
            ))}
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
