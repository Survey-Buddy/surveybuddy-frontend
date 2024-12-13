import axios, { AxiosResponse } from "axios";
import { getToken } from "../jwtToken";
import sortSurveys from "../surveyUtils/sortSurveys";

interface Survey {
  name: string;
  description: string;
  date: Date | string;
  completionDate: Date | string;
  organisation: string;
  purpose: string;
  _id: string;
  userId: string;
  respondents: string;
  _v: number;
}

interface ApiResponse<T> {
  data: T;
}

// Default - do not need to destructure when importing
export default async function getSurveys(): Promise<Survey[]> {
  try {
    const token = getToken();
    const response = await axios.get("http://localhost:8080/surveys/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response || !response.data || !response.data.data) {
      throw new Error("Failed to fetch surveys.");
    }

    const surveys = response.data.data;
    return sortSurveys(surveys, "asc");
  } catch (error) {
    console.error("Error fetching survey data: ", error);
    // If error, return an empty string
    return [];
  }
}

export async function getSurveyData(surveyId: string): Promise<Survey | null> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.get(
      `http://localhost:8080/surveys/${surveyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Survey data", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching survey data: ", error);
    return null;
  }
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
