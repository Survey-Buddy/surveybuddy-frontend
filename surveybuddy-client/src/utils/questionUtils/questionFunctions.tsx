import axios from "axios";
import { getToken } from "../jwtToken";

interface Question {
  question: string;
  questionNum: number;
  _id: string;
  questionFormat: string;
}

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
