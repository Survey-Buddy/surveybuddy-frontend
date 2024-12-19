import axios from "axios";
import { getToken } from "../jwtToken";
import { Question } from "./questionTypes";
import BASE_URL from "@/config/apiConfig";

export default async function getQuestionsData(
  surveyId: string
): Promise<Question[] | null> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.get(
      `${BASE_URL}/surveys/${surveyId}/questions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Base URL is: ", BASE_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching questions data: ", error);
    return null;
  }
}

export async function getQuestionData(
  surveyId: string,
  questionId: string
): Promise<Question | null> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.get(
      `${BASE_URL}/surveys/${surveyId}/questions/${questionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Specific question data: ", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching question data: ", error);
    return null;
  }
}

export async function createQuestion(
  payload: Question
): Promise<Question | null> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }

    console.log("Payload sent to backend: ", payload);
    const response = await axios.post(
      `${BASE_URL}/surveys/${payload.surveyId}/questions`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
    return null;
  }
}
