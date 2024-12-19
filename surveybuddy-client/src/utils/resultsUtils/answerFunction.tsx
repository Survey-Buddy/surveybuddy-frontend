import axios from "axios";
import { Answer } from "./resultsTypes";
import BASE_URL from "../../config/apiConfig";
import { getToken } from "../jwtToken";

// Define ApiResponse<T>
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export async function newAnswer(
  answer: string | number,
  surveyId: string,
  questionId: string
): Promise<ApiResponse<Answer> | null> {
  try {
    // <Answer> ensures response is typed as Answer
    const response = await axios.post<ApiResponse<Answer>>(
      `${BASE_URL}/answers/${surveyId}/${questionId}`,
      { answer }
    );

    console.log("Answer successfully created!", response.data);
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

export async function getAllSurveyAnswers(
  surveyId: string
): Promise<ApiResponse<Answer[]> | null> {
  try {
    const token = getToken();
    const response = await axios.get<ApiResponse<Answer[]>>(
      `${BASE_URL}/answers/${surveyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Survey answers: ", response);
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

export async function getQuestionAnswers(
  surveyId: string,
  questionId: string
): Promise<ApiResponse<Answer> | null> {
  try {
    const token = getToken();
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
