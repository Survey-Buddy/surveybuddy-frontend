import React, { useEffect, useState } from "react";

interface Survey {
  id: string;
  title: string;
  description: string;
  date: string;
}

async function getSurveys(): Promise<Survey[]> {
  const data = await fetch("http://localhost:3000/surveys");
  if (!data) {
    throw new Error("Failed to fetch surveys.");
  }
  return data.json();
}

const Surveys: React.FC = () => {
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
        <ul>
          {surveys.map((survey) => (
            <li key={survey.id}>
              <h2>{survey.title}</h2>
              <p>{survey.description}</p>
              <p>Date: {survey.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No surveys found.</p>
      )}
    </div>
  );
};

export default Surveys;
