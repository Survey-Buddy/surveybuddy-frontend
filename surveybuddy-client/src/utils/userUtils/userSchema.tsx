import { z } from "zod";

// Schema for login user validation
export const loginSchema = z.object({
  // Email must be a valid email
  email: z.string().email({ message: "Invalid email address" }),
  // Password must be at least 6 characters
  // ** Update to require stricter validation
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Schema for register user validation
export const registerSchema = loginSchema.extend({
  // Username must be at least 3 characters long
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  // Firstname must be at least 3 characters long
  firstName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
  // Lastname must be at least 3 characters long
  lastName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
});
