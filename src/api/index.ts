import axios from "axios";
import { CreateSessionInput, CreateUserInput } from "../types/types";

const ENDPOINT = "http://localhost:1337/api";

export const createUser = async (userData: CreateUserInput) => {
  const response = await axios.post(`${ENDPOINT}/users`, userData);
  return response;
};

export const createSession = async (loginData: CreateSessionInput) => {
  const response = await axios.post(`${ENDPOINT}/sessions`, loginData, {
    withCredentials: true,
  });
  return response;
};

export const deleteSession = async () => {
  const response = await axios.delete(`${ENDPOINT}/sessions`, {
    withCredentials: true,
  });
  return response;
};

export const getLoggedInUser = async () => {
  const response = await axios.get(`${ENDPOINT}/me`, { withCredentials: true });
  return response;
};
