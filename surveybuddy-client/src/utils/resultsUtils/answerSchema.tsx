import { z } from "zod";

// For written responses
export const writtenResponseAnswerSchema = z.object({
  writtenResponseAnswer: z
    .string()
    .min(3, "Answer must be longer than 3 characters."),
});

// For multi-choice answers
export const multiChoiceAnswerSchema = z.object({
  multiChoiceAnswer: z
    .enum(["answerA", "answerB", "answerC", "answerD"])

    .default("answerC"),
});

// For range slider answers
export const rangeSliderAnswerSchema = z.object({
  rangeSliderAnswer: z
    .number()
    .min(0, "Value must be at least 0.")
    .max(10, "Value must be at most 10.")
    .default(7),
});
