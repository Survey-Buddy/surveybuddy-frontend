import axios, { AxiosResponse } from "axios";
import { getToken } from "../jwtToken";

async function getSurveys(): Promise<Survey[]> {
  const token = getToken();
  const data = await axios.get("http://localhost:8080/surveys/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!data) {
    throw new Error("Failed to fetch surveys.");
  }
  console.log("survey data: ", data.data);
  return data.data.data;
}

export const deleteSurvey = async (
  surveyId: string
): Promise<AxiosResponse | null> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await axios.delete(
      `http://localhost:8080/surveys/${surveyId}/deleteSurvey`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response) {
      throw new Error("Error deleting survey");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting survey: ", error);
    return null;
  }
};
