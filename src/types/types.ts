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
