import axios from "axios";
import { CreateSessionInput, CreateUserInput } from "../types/types";

const ENDPOINT = "http://localhost:1337/api";

// USERS
export const createUser = async (userData: CreateUserInput) => {
  const response = await axios.post(`${ENDPOINT}/users`, userData);
  return response;
};

// SESSIONS
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

// POSTS
export const getPosts = async (searchParams: string) => {
  const response = await axios.get(`${ENDPOINT}/posts${searchParams}`);
  return response;
};

export const getPostCount = async (searchParams?: string) => {
  const response = await axios.head(
    `${ENDPOINT}/posts${searchParams ? `${searchParams}` : ""}`
  );
  return response;
};

// VOTES
export async function getUserPostVote(postId: string) {
  const response = await axios.get(`${ENDPOINT}/votes?postId=${postId}`, {
    withCredentials: true,
  });
  return response;
}

export async function createPostVote(postId: string, value: number) {
  const body = {
    post: postId,
    value,
  };
  const response = await axios.post(`${ENDPOINT}/votes`, body, {
    withCredentials: true,
  });
  return response.data;
}
