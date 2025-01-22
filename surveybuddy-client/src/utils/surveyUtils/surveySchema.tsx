import { z } from "zod";

// Schema for validating survey data

const schema = z.object({
  // Name must at least 5 characters long
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  // Description must be at least 5 characters long (optional)
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long." })
    .optional(),
  // Purpose must be from predefined array
  purpose: z
    .enum(["work", "research", "school", "fun", "other"])
    .default("other"),
  // Respondents must be from predefined array
  respondents: z.enum(["public", "registered", "inviteOnly"]).default("public"),
  // Organisation must be at least 3 characters long (optional)
  organisation: z
    .string()
    .min(3, { message: "Organisation must be at least 3 characters long." })
    .optional(),
  // Must be in a valid ISO date format (optional)
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format. Valid ISO strings only.",
    })
    .optional(),
});

export default schema;
