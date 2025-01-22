import { z } from "zod";

// Schema for validating multi choice questions

export const multiChoiceSchema = z.object({
  // The question text must be at least 5 characters long
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters long." }),

  // Validation for the multiple-choice answer options
  formatDetails: z.object({
    answerA: z
      .string()
      .min(3, { message: "Answer A must be at least 3 characters long." }),
    answerB: z
      .string()
      .min(3, { message: "Answer B must be at least 3 characters long." }),
    answerC: z
      .string()
      .min(3, { message: "Answer C must be at least 3 characters long." }),
    answerD: z
      .string()
      .min(3, { message: "Answer D must be at least 3 characters long." }),
  }),
  // The question format is set to multiChoice by default
  questionFormat: z.enum(["multiChoice"]).default("multiChoice"),
});

// Schema for validating written response questions

export const writtenResponseSchema = z.object({
  // Question text must be at least 5 characters long
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters long." }),
  questionFormat: z.enum(["writtenResponse"]).default("writtenResponse"),
});

// Schema for validating range slider questions

export const rangeSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters long." }),
  // Range description must be one of specified values
  rangeDescription: z.enum(["no", "notAtAll", "disagree"]).default("no"),
  // Set question format to randerSlider by default
  questionFormat: z.enum(["rangeSlider"]).default("rangeSlider"),
});
