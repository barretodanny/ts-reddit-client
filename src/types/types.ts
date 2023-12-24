import { TypeOf } from "zod";

import {
  createUserSchema,
  createSessionSchema,
  createSubredditSchema,
  createPostSchema,
  editSubredditSchema,
} from "../schemas/schemas";

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type CreateSessionInput = TypeOf<typeof createSessionSchema>;
export type CreateSubredditInput = TypeOf<typeof createSubredditSchema>;
export type EditSubredditInput = TypeOf<typeof editSubredditSchema>;
export type CreatePostInput = TypeOf<typeof createPostSchema>;

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

export interface Vote {
  _id: string;
  user: User;
  post?: Post;
  comment?: Comment;
  value: number;
  createdAt: string;
  updatedAt: string;
  __v: string;
}
