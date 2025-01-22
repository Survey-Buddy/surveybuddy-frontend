import axios, { AxiosResponse } from "axios";
import { getToken } from "../jwtToken";
import sortSurveys from "../surveyUtils/sortSurveys";
import { Survey } from "./surveyTypes";
import BASE_URL from "@/config/apiConfig";

// Function to update survey

export async function updateSurvey(
  surveyId: string,
  // Updated survey data (partial fields)
  updatedSurvey: Partial<Survey>
): Promise<Survey> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }
    // PATCH request to update survey (partial fields)
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
    // Axios errors to fix TS errors
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

// Function to create a new survey

export async function createSurvey(
  // New survey data
  data: Record<string, unknown>
): Promise<Survey> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }
    // POST request to create new survey
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

// Function to fetch all surveys

export default async function getSurveys(): Promise<Survey[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }
    // GET request to fetch all surveys
    const response = await axios.get(`${BASE_URL}/surveys/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response || !response.data || !response.data.data) {
      throw new Error("Failed to fetch surveys.");
    }

    const surveys = response.data.data;

    // Normalise data to fix TS errors
    const normalisedSurveys = surveys.map((survey: Survey) => ({
      ...survey,
      active: survey.active ?? false,
      date:
        typeof survey.date === "string"
          ? survey.date
          : new Date(survey.date).toISOString(),
      endDate: survey.endDate || "", // Always expect a string from the backend
    }));

    // Return sorted surveys in descending order
    const sortedSurveys = sortSurveys(normalisedSurveys, "desc");
    return sortedSurveys;
  } catch (error) {
    console.error("Error fetching survey data: ", error);
    return [];
  }
}

// Function to fetch data for a specific survey

export async function getSurveyData(surveyId: string): Promise<Survey | null> {
  try {
    // GET request to fetch survey data by survey id
    const response = await axios.get(`${BASE_URL}/surveys/${surveyId}`);
    console.log("Survey data", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching survey data: ", error);
    return null;
  }
}

// Function to delete a survey

export const deleteSurvey = async (
  surveyId: string
): Promise<AxiosResponse | null> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found");
    }
    // DELETE request to delete survey
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
