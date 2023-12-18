import { object, string } from "zod";

// USER SCHEMAS
export const createUserSchema = object({
  username: string().min(1, "Password is required."),
  password: string().min(6, "Password must be at least 6 characters."),
  passwordConfirmation: string().min(
    6,
    "Password must be at least 6 characters."
  ),
  email: string().min(1, "Email is required.").email("Invalid email."),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

// SESSION SCHEMAS
export const createSessionSchema = object({
  email: string().min(1, "Email is required.").email("Invalid email."),
  password: string().min(1, "Password is required"),
});
