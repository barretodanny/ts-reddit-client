import axios from "axios";
import {
  CreateCommentInput,
  CreatePostInput,
  CreateSessionInput,
  CreateSubredditInput,
  CreateUserInput,
  EditPostInput,
  EditSubredditInput,
  EditUserInput,
} from "../types/types";

const ENDPOINT = "https://api2.dannbarr.dev/api";

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

export const getUserByUsername = async (username: string) => {
  const response = await axios.get(`${ENDPOINT}/users/${username}?string=true`);
  return response.data;
};

export async function updateUser(userId: string, payload: EditUserInput) {
  const response = await axios.put(`${ENDPOINT}/users/${userId}`, payload, {
    withCredentials: true,
  });
  return response;
}

export async function deleteUser(userId: string) {
  const response = await axios.delete(`${ENDPOINT}/users/${userId}`, {
    withCredentials: true,
  });
  return response;
}

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
  const response = await axios.get(`${ENDPOINT}/me`, {
    withCredentials: true,
    params: { timestamp: Date.now() },
  });
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

export const getSubredditById = async (subredditId: string) => {
  const response = await axios.get(`${ENDPOINT}/subreddits/${subredditId}`);
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

export async function updateSubreddit(
  subredditId: string,
  payload: EditSubredditInput
) {
  const response = await axios.put(
    `${ENDPOINT}/subreddits/${subredditId}`,
    payload,
    { withCredentials: true }
  );
  return response;
}

export async function deleteSubreddit(subredditId: string) {
  const response = await axios.delete(`${ENDPOINT}/subreddits/${subredditId}`, {
    withCredentials: true,
  });
  return response;
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

export const createPost = async (
  subredditId: string,
  payload: CreatePostInput
) => {
  const body = { ...payload, subreddit: subredditId };
  const response = await axios.post(`${ENDPOINT}/posts`, body, {
    withCredentials: true,
  });
  return response;
};

export const getPostById = async (postId: string) => {
  const response = await axios.get(`${ENDPOINT}/posts/${postId}`);
  return response;
};

export async function updatePost(postId: string, payload: EditPostInput) {
  const response = await axios.put(`${ENDPOINT}/posts/${postId}`, payload, {
    withCredentials: true,
  });
  return response;
}

export async function deletePost(postId: string) {
  const response = await axios.delete(`${ENDPOINT}/posts/${postId}`, {
    withCredentials: true,
  });
  return response;
}

// COMMENTS
export async function createComment(
  postId: string,
  payload: CreateCommentInput
) {
  const body = { ...payload, post: postId };
  const response = await axios.post(`${ENDPOINT}/comments`, body, {
    withCredentials: true,
  });
  return response;
}

export async function deleteComment(commentId: string) {
  const response = await axios.delete(`${ENDPOINT}/comments/${commentId}`, {
    withCredentials: true,
  });
  return response;
}

export async function getPostComments(postId: string, searchParams: string) {
  const response = await axios.get(
    `${ENDPOINT}/comments?postId=${postId}${
      searchParams && `&${searchParams.replace("?", "")}`
    }`
  );
  return response;
}

export async function getCommentReplies(
  parentId: string,
  searchParams: string
) {
  const response = await axios.get(
    `${ENDPOINT}/comments?parentId=${parentId}${
      searchParams && `&${searchParams}`
    }`
  );
  return response;
}

export const getUserComments = async (userId: string, searchParams: string) => {
  const response = await axios.get(
    `${ENDPOINT}/comments?userId=${userId}${
      searchParams && `&${searchParams.replace("?", "")}`
    }`
  );
  return response;
};

export const getUserCommentCount = async (userId: string) => {
  const response = await axios.head(`${ENDPOINT}/comments?userId=${userId}`);
  return response;
};

export const getUserPosts = async (userId: string, searchParams: string) => {
  const response = await axios.get(
    `${ENDPOINT}/posts?userId=${userId}${
      searchParams && `&${searchParams.replace("?", "")}`
    }`
  );
  return response;
};

export const getUserPostCount = async (userId: string) => {
  const response = await axios.head(`${ENDPOINT}/posts?userId=${userId}`);
  return response;
};

export const getUserSubreddits = async (
  userId: string,
  searchParams: string
) => {
  const response = await axios.get(
    `${ENDPOINT}/subreddits?userId=${userId}${
      searchParams && `&${searchParams.replace("?", "")}`
    }`
  );
  return response;
};

export const getUserSubredditCount = async (userId: string) => {
  const response = await axios.head(`${ENDPOINT}/subreddits?userId=${userId}`);
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

export async function getUserCommentVote(commentId: string) {
  const response = await axios.get(`${ENDPOINT}/votes?commentId=${commentId}`, {
    withCredentials: true,
  });
  return response;
}

export async function createCommentVote(commentId: string, value: number) {
  const body = {
    comment: commentId,
    value,
  };
  const response = await axios.post(`${ENDPOINT}/votes`, body, {
    withCredentials: true,
  });
  return response.data;
}

export async function updateCommentVote(voteId: string, value: number) {
  const body = {
    value,
  };
  const response = await axios.put(`${ENDPOINT}/votes/${voteId}`, body, {
    withCredentials: true,
  });
  return response.data;
}

export async function deleteCommentVote(voteId: string) {
  const response = await axios.delete(`${ENDPOINT}/votes/${voteId}`, {
    withCredentials: true,
  });
  return response;
}
