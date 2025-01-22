// Define structure of a question object

export interface Question {
  question: string;
  questionFormat: "writtenResponse" | "multiChoice" | "rangeSlider";
  surveyId?: string;
  questionNum: number;
  rangeDescription: string;
  formatDetails: MultiChoiceDetails | RangeSliderDetails;
  _id?: string;
}

// Define structure for a multi choice question

interface MultiChoiceDetails {
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
}

// Define structure for range slider question

interface RangeSliderDetails {
  rangeDescription: "no" | "notAtAll" | "disagree";
  max?: number | string;
}

// Type guard to check if format details belong to range slider

export function isRangeSliderDetails(
  details: MultiChoiceDetails | RangeSliderDetails
): details is RangeSliderDetails {
  return (details as RangeSliderDetails).rangeDescription !== undefined;
}

// Type guard to check if the format details belong to multi choice

export function isMultiChoiceDetails(
  details: MultiChoiceDetails | RangeSliderDetails
): details is MultiChoiceDetails {
  return (
    (details as MultiChoiceDetails).answerA !== undefined &&
    (details as MultiChoiceDetails).answerB !== undefined &&
    (details as MultiChoiceDetails).answerC !== undefined &&
    (details as MultiChoiceDetails).answerD !== undefined
  );
}
