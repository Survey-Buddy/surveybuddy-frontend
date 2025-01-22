import axios from "axios";
import { getToken } from "../jwtToken";
import { Question } from "./questionTypes";
import BASE_URL from "@/config/apiConfig";

// Function to fetch all questions for specific survey

export default async function getQuestionsData(
  surveyId: string
): Promise<Question[] | null> {
  try {
    // GET request to fetch all questions for survey id
    const response = await axios.get(
      `${BASE_URL}/surveys/${surveyId}/questions`
    );
    // Return list of questions
    return response.data.data;
  } catch (error) {
    console.error("Error fetching questions data: ", error);
    return null;
  }
}

// Function to fetch data for a specific question in a survey

export async function getQuestionData(
  surveyId: string,
  questionId: string
): Promise<Question | null> {
  try {
    // GET request to fetch a specific question by id
    const response = await axios.get(
      `${BASE_URL}/surveys/${surveyId}/questions/${questionId}`
    );
    // Return question data
    return response.data.data;
  } catch (error) {
    console.error("Error fetching question data: ", error);
    return null;
  }
}

// Function to create a new survey question

export async function createQuestion(
  payload: Question
): Promise<Question | null> {
  try {
    // Get auth token
    const token = getToken();
    if (!token) {
      // Throw error if user not authenticated
      throw new Error("User is not authenticated. Token is missing.");
    }

    // POST request to create a new question
    const response = await axios.post(
      `${BASE_URL}/surveys/${payload.surveyId}/questions`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Return created question data
    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
    return null;
  }
}
