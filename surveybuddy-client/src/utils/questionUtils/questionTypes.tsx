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
  formatDetails: MultiChoiceDetails | RangeSliderDetails;

  _id?: string;
}

interface MultiChoiceDetails {
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
}

interface RangeSliderDetails {
  rangeDescription: "no" | "notAtAll" | "disagree";
  max?: number | string;
}

export function isRangeSliderDetails(
  details: MultiChoiceDetails | RangeSliderDetails
): details is RangeSliderDetails {
  return (details as RangeSliderDetails).rangeDescription !== undefined;
}

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
