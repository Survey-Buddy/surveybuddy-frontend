export interface Question {
  question: string;
  questionFormat: "writtenResponse" | "multiChoice" | "rangeSlider";
  //   answer?: "no" | "notAtAll" | "disagree";
  //   answerA?: string;
  //   answerB?: string;
  //   answerC?: string;
  //   answerD?: string;
  surveyId?: string;
  questionNum: number;
  rangeDescription: string;
  formatDetails: MultiChoiceDetails;
  _id?: string;
}

interface MultiChoiceDetails {
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
}

// interface RangeSliderDetails {
//   rangeDescription: "no" | "notAtAll" | "disagree";
// }
