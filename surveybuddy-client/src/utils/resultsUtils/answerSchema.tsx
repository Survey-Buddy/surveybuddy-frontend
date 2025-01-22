import { z } from "zod";

// Schema for validating written responses
export const writtenResponseAnswerSchema = z.object({
  // Must be at least 3 characters long
  writtenResponseAnswer: z
    .string()
    .min(3, "Answer must be longer than 3 characters."),
});

// Schema for validating multi-choice answers
export const multiChoiceAnswerSchema = z.object({
  // Must be from predefined choices
  multiChoiceAnswer: z
    .enum(["answerA", "answerB", "answerC", "answerD"])
    // Default C
    .default("answerC"),
});

// Schema for validating range slider answers
export const rangeSliderAnswerSchema = z.object({
  // Must be between 0 and 10
  rangeSliderAnswer: z
    .number()
    .min(0, "Value must be at least 0.")
    .max(10, "Value must be at most 10.")
    .default(7),
});
