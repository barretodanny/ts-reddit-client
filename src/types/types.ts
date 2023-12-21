import { TypeOf } from "zod";

import { createUserSchema, createSessionSchema } from "../schemas/schemas";

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type CreateSessionInput = TypeOf<typeof createSessionSchema>;

export interface User {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface Subreddit {
  _id: string;
  user: User;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface Post {
  _id: string;
  user: User;
  subreddit: Subreddit;
  title: string;
  content: string;
  points: number;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface Comment {
  _id: string;
  user: User;
  post: Post;
  parent?: string;
  content: string;
  points: number;
  createdAt: string;
  updatedAt: string;
  __v: string;
}
