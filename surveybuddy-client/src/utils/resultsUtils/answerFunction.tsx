import axios from "axios";
import { Answer } from "./resultsTypes";
import BASE_URL from "../../config/apiConfig";
import { getToken } from "../jwtToken";

// Define generic API response type

type ApiResponse<T> = {
  // If call was successful
  success: boolean;
  // Data return from API
  data: T;
  // Optional message from API
  message?: string;
};

// Function to create a new specific question answer

export async function newAnswer(
  answer: string | number,
  surveyId: string,
  questionId: string
): Promise<ApiResponse<Answer> | null> {
  try {
    // POST request to save new answer
    const response = await axios.post<ApiResponse<Answer>>(
      `${BASE_URL}/answers/${surveyId}/${questionId}`,
      { answer }
    );
    // Return response data
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error: ", error.response?.data || error.message);
    } else {
      console.error("Error creating answer: ", error);
    }
    return null;
  }
}

// Function to fetch all answers for specific survey

export async function getAllSurveyAnswers(
  surveyId: string
): Promise<ApiResponse<Answer[]> | null> {
  try {
    // Get auth token to send in header
    const token = getToken();
    // GET request to fetch all answers for survey
    const response = await axios.get<ApiResponse<Answer[]>>(
      `${BASE_URL}/answers/${surveyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error: ", error.response?.data || error.message);
    } else {
      console.error("Error fetching survey answers: ", error);
    }
    return null;
  }
}

// Function to fetch answers for a specific question

export async function getQuestionAnswers(
  surveyId: string,
  questionId: string
): Promise<ApiResponse<Answer> | null> {
  try {
    const token = getToken();
    // GET request to fetch answers for specific question
    const response = await axios.get<ApiResponse<Answer>>(
      `${BASE_URL}/answers/${surveyId}/${questionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Question answers: ", response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error: ", error.response?.data || error.message);
    } else {
      console.error("Error fetching question answers: ", error);
    }
    return null;
  }
}
