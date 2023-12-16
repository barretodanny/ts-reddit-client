import axios from "axios";
import { CreateUserInput } from "../types/types";

const ENDPOINT = "http://localhost:1337/api";

export const createUser = async (userData: CreateUserInput) => {
  const response = await axios.post(`${ENDPOINT}/users`, userData);
  return response;
};
