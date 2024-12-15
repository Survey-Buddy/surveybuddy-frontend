export interface Question {
  question: string;
  questionFormat: "writtenResponse" | "multiChoice" | "rangeSlider";
  answer?: "no" | "notAtAll" | "disagree";
  answerA?: string;
  answerB?: string;
  answerC?: string;
  answerD?: string;
  surveyId?: string;
  questionNum: number;
  _id?: string;
}
