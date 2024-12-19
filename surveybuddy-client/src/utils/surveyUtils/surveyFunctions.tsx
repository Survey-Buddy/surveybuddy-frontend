import axios, { AxiosResponse } from "axios";
import { getToken } from "../jwtToken";
import sortSurveys from "../surveyUtils/sortSurveys";
import { Survey } from "./surveyTypes";
import BASE_URL from "@/config/apiConfig";

export async function updateSurvey(
  surveyId: string,
  updatedSurvey: Partial<Survey>
): Promise<Survey> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }

    const response = await axios.patch(
      `${BASE_URL}/surveys/${surveyId}/editSurvey`,
      updatedSurvey,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error updating the survey:", error.message);
      throw new Error(
        error.response?.data?.message ||
          "Failed to update the survey. Please try again."
      );
    } else {
      console.error("Unexpected error updating the survey:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
}

export async function createSurvey(
  data: Record<string, unknown>
): Promise<Survey> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }
    const response = await axios.post(`${BASE_URL}/surveys`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response) {
      throw new Error("Error submitting survey.");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error creating the survey:", error.message);
      throw new Error(
        error.response?.data?.message ||
          "Failed to create the survey. Please try again."
      );
    } else {
      console.error("Unexpected error creating the survey:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
}

// Default - do not need to destructure when importing
export default async function getSurveys(): Promise<Survey[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }

    const response = await axios.get(`${BASE_URL}/surveys/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response || !response.data || !response.data.data) {
      throw new Error("Failed to fetch surveys.");
    }

    const surveys = response.data.data;

    const normalisedSurveys = surveys.map((survey: Survey) => ({
      ...survey,
      active: survey.active ?? false,
      date:
        typeof survey.date === "string"
          ? survey.date
          : new Date(survey.date).toISOString(),
      endDate: survey.endDate || "", // Always expect a string from the backend
    }));

    const sortedSurveys = sortSurveys(normalisedSurveys, "desc");
    return sortedSurveys;
  } catch (error) {
    console.error("Error fetching survey data: ", error);
    return [];
  }
}

export async function getSurveyData(surveyId: string): Promise<Survey | null> {
  try {
    const response = await axios.get(`${BASE_URL}/surveys/${surveyId}`);
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
      `${BASE_URL}/surveys/${surveyId}/deleteSurvey`,
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
