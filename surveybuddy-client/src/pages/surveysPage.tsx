import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      <h1>Surveys</h1>
      {surveys.length > 0 ? (
        <div className="grid grid-cols-3 gap-8">
          <ul>
            {surveys.map((survey) => (
              <Card key={survey.id} className="flex flex-col justify-between">
                <CardHeader className="flex-row gap-4 items-center">
                  {/* avatar */}
                  <div>
                    <CardTitle>{survey.title}</CardTitle>
                    <CardDescription>{survey.organisation}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <p>{survey.date}</p>
                    <p>{survey.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button>View Analytics</Button>
                  {survey.active ? <p>Active</p> : <p>Complete</p>}
                </CardFooter>
              </Card>
            ))}
          </ul>
        </div>
      ) : (
        <p>No surveys found.</p>
      )}
    </div>
  );
};

export default SurveysPage;
