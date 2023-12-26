import { literal, object, string } from "zod";

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

// SUBREDDIT SCHEMAS
export const createSubredditSchema = object({
  name: string().min(1, "Subreddit name is required"),
});

export const editSubredditSchema = object({
  name: string().optional().or(literal("")),
});

// POST SCHEMAS
export const createPostSchema = object({
  title: string().min(1, "Post title is required"),
  content: string().min(1, "Post content is required"),
});

// COMMENT SCHEMAS
export const createCommentSchema = object({
  content: string().min(1, "Comment content is required"),
  parent: string().optional().or(literal("")),
});
