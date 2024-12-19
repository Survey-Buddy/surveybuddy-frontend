import { z } from "zod";

// Login Schema Validation
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Register Schema Validation extends Login schema
export const registerSchema = loginSchema.extend({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  firstName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
});
