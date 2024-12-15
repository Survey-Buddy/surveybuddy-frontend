import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long." })
    .optional(),
  purpose: z
    .enum(["work", "research", "school", "fun", "other"])
    .default("other"),
  respondents: z.enum(["public", "registered", "inviteOnly"]).default("public"),
  organisation: z
    .string()
    .min(3, { message: "Organisation must be at least 3 characters long." })
    .optional(),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format. Valid ISO strings only.",
    })
    .optional(),
});

export default schema;
