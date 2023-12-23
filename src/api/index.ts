import axios from "axios";
import {
  CreateSessionInput,
  CreateSubredditInput,
  CreateUserInput,
} from "../types/types";

const ENDPOINT = "http://localhost:1337/api";

// USERS
export const getUsers = async (searchParams: string) => {
  const response = await axios.get(`${ENDPOINT}/users${searchParams}`);
  return response;
};

export const getUserCount = async (searchParams?: string) => {
  const response = await axios.head(
    `${ENDPOINT}/users${searchParams ? `${searchParams}` : ""}`
  );
  return response;
};

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

// SUBREDDITS
export const getSubreddits = async (searchParams: string) => {
  const response = await axios.get(`${ENDPOINT}/subreddits${searchParams}`);
  return response;
};

export const getSubredditByName = async (name: string) => {
  const response = await axios.get(
    `${ENDPOINT}/subreddits/${name}?string=true`
  );
  return response.data;
};

export const getSubredditCount = async (searchParams?: string) => {
  const response = await axios.head(
    `${ENDPOINT}/subreddits${searchParams ? `${searchParams}` : ""}`
  );
  return response;
};

export async function createSubreddit(payload: CreateSubredditInput) {
  const response = await axios.post(`${ENDPOINT}/subreddits`, payload, {
    withCredentials: true,
  });
  return response.data;
}

// POSTS
export const getPosts = async (searchParams: string) => {
  const response = await axios.get(`${ENDPOINT}/posts${searchParams}`);
  return response;
};

export const getSubredditPosts = async (
  subredditId: string,
  searchParams: string
) => {
  const response = await axios.get(
    `${ENDPOINT}/posts?subredditId=${subredditId}${
      searchParams && `&${searchParams.replace("?", "")}`
    }`
  );
  return response;
};

export const getPostCount = async (searchParams?: string) => {
  const response = await axios.head(
    `${ENDPOINT}/posts${searchParams ? `${searchParams}` : ""}`
  );
  return response;
};

export const getSubredditPostCount = async (
  subredditId: string,
  searchParams: string
) => {
  const response = await axios.head(
    `${ENDPOINT}/posts?subredditId=${subredditId}${
      searchParams && `&${searchParams.replace("?", "")}`
    }`
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

export async function updatePostVote(voteId: string, value: number) {
  const body = {
    value,
  };
  const response = await axios.put(`${ENDPOINT}/votes/${voteId}`, body, {
    withCredentials: true,
  });
  return response.data;
}

export async function deletePostVote(voteId: string) {
  const response = await axios.delete(`${ENDPOINT}/votes/${voteId}`, {
    withCredentials: true,
  });
  return response;
}
