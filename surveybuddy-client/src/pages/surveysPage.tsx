import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SurveyCard } from "@/components/main/surveysCards";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Survey {
  id: string;
  title: string;
  organisation: string;
  description: string;
  active: boolean;
  date: string;
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
       <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Badge>Surveys</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              Your Surveys!
            </h2>
            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
              Survey history. 
            </p>
            <Link to="/surveys/newsurvey">
            <Button>New Survey</Button>
            </Link>
          </div>
        </div>
      {surveys.length > 0 ? (
        <div >
          <ul>
            {surveys.map((survey) => (
              <li key={survey.id}>
                <SurveyCard
                  title={survey.title}
                  description={survey.description}
                  active={survey.active}
                />
              </li>
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
