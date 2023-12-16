import { TypeOf } from "zod";

import { createUserSchema } from "../schemas/schemas";

export type CreateUserInput = TypeOf<typeof createUserSchema>;

export interface User {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}
