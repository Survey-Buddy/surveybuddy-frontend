import axios, { AxiosResponse } from "axios";
import { getToken } from "../jwtToken";
import sortSurveys from "../surveyUtils/sortSurveys";

interface Survey {
  name: string;
  description: string;
  date: Date | string;
  endDate: Date | string;
  active: boolean;
  completionDate: Date | string;
  organisation: string;
  purpose: string;
  _id: string;
  userId: string;
  respondents: string;
  _v: number;
}

// interface ApiResponse<T> {
//   data: T;
// }

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
      `http://localhost:8080/surveys/${surveyId}/editSurvey`,
      updatedSurvey,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error updating the survey:", error);

    throw new Error(
      error.response?.data?.message ||
        "Failed to update the survey. Please try again."
    );
  }
}

export async function createSurvey(data: string): Promise<Survey> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }
    const response = await axios.post("http://localhost:8080/surveys", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response) {
      throw new Error("Error submitting survey.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error creating the survey:", error);
    throw new Error(
      error.response?.data?.message ||
        "Failed to create the survey. Please try again."
    );
  }
}

// Default - do not need to destructure when importing
export default async function getSurveys(): Promise<Survey[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }
    const response = await axios.get("http://localhost:8080/surveys/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response || !response.data || !response.data.data) {
      throw new Error("Failed to fetch surveys.");
    }

    const surveys = response.data.data;
    return sortSurveys(surveys, "desc");
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
      throw new Error("User is not authenticated. Token is missing.");
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
