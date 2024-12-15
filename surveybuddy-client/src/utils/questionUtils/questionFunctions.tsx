import axios from "axios";
import { getToken } from "../jwtToken";
import { Question } from "./questionTypes";

export default async function getQuestionData(
  surveyId: string
): Promise<Question[] | null> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.get(
      `http://localhost:8080/surveys/${surveyId}/questions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

    const response = await axios.post(
      `http://localhost:8080/surveys/${payload.surveyId}/questions`,
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
