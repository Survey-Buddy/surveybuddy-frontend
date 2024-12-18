import axios from "axios";
import { Answer } from "./resultsTypes";

export async function newAnswer(
  answer: string | number,
  surveyId: string,
  questionId: string
): Promise<Answer | null> {
  try {
    // <Answer> ensures response is typed as Answer
    const response = await axios.post<Answer>(
      `http://localhost:8080/answers/${surveyId}/${questionId}`,
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
