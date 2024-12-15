import { z } from "zod";

export const multiChoiceSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters long." }),
  answer: z.enum(["answerA", "answerB", "answerC", "answerD"]).optional(),
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
  questionFormat: z.enum(["multiChoice"]).default("multiChoice"),
});

export const writtenResponseSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters long." }),
  questionFormat: z.enum(["writtenResponse"]).default("writtenResponse"),
});

export const rangeSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters long." }),
  answer: z.enum(["no", "notAtAll", "disagree"]).default("no"),
  questionFormat: z.enum(["rangeSlider"]).default("rangeSlider"),
});
