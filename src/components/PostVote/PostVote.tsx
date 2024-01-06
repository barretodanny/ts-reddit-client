import { useEffect, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { Post, User, Vote } from "../../types/types";
import {
  createPostVote,
  deletePostVote,
  getUserPostVote,
  updatePostVote,
} from "../../api";

import styles from "./PostVote.module.css";

interface PostVoteProps {
  post: Post;
  vote: Vote | undefined;
  loggedInUser: User | undefined;
}

function PostVote({ post, vote, loggedInUser }: PostVoteProps) {
  const [userVote, setUserVote] = useState(vote ? vote.value : 0);
  const [points, setPoints] = useState(post.points);

  useEffect(() => {
    setUserVote(vote ? vote.value : 0);
    setPoints(post.points);
  }, [post, vote]);

  async function upvotePost() {
    // double check existing vote because state may not match server
    let existingVote: Vote | undefined;

    try {
      const req = await getUserPostVote(post._id);
      if (req && req.status === 200) {
        existingVote = req.data;
      }
    } catch (error) {
      // error fetching existing vote, probably doesn't exist
    }

    if (userVote) {
      if (userVote === 1 && existingVote) {
        setPoints((prev) => prev - 1);
        setUserVote(0);
        await deletePostVote(existingVote._id);
      } else if (userVote === -1 && existingVote) {
        if (existingVote.value === 1) {
          setPoints((prev) => prev + 2);
          setUserVote(existingVote.value);
        } else {
          setPoints((prev) => prev + 2);
          setUserVote(1);
          await updatePostVote(existingVote._id, 1);
        }
      } else if (userVote === 1 && !existingVote) {
        setPoints((prev) => prev - 1);
        setUserVote(0);
      } else if (userVote === -1 && !existingVote) {
        setPoints((prev) => prev + 2);
        setUserVote(1);
        await createPostVote(post._id, 1);
      }
    } else {
      if (existingVote) {
        if (existingVote.value === 1) {
          setPoints((prev) => prev + 1);
          setUserVote(existingVote.value);
        } else {
          setPoints((prev) => prev + 1);
          setUserVote(1);
          await updatePostVote(existingVote._id, 1);
        }
      } else {
        setPoints((prev) => prev + 1);
        setUserVote(1);
        await createPostVote(post._id, 1);
      }
    }
  }

  async function downvotePost() {
    // double check existing vote because state may not match server
    let existingVote: Vote | undefined;

    try {
      const req = await getUserPostVote(post._id);
      if (req && req.status === 200) {
        existingVote = req.data;
      }
    } catch (error) {
      // error fetching existing vote, probably doesn't exist
    }

    if (userVote) {
      if (userVote === -1 && existingVote) {
        setPoints((prev) => prev + 1);
        setUserVote(0);
        await deletePostVote(existingVote._id);
      } else if (userVote === 1 && existingVote) {
        if (existingVote.value === -1) {
          setPoints((prev) => prev - 2);
          setUserVote(existingVote.value);
        } else {
          setPoints((prev) => prev - 2);
          setUserVote(-1);
          await updatePostVote(existingVote._id, -1);
        }
      } else if (userVote === -1 && !existingVote) {
        setPoints((prev) => prev + 1);
        setUserVote(0);
      } else if (userVote === 1 && !existingVote) {
        setPoints((prev) => prev - 2);
        setUserVote(-1);
        await createPostVote(post._id, -1);
      }
    } else {
      if (existingVote) {
        if (existingVote.value === -1) {
          setPoints((prev) => prev - 1);
          setUserVote(existingVote.value);
        } else {
          setPoints((prev) => prev - 1);
          setUserVote(-1);
          await updatePostVote(existingVote._id, -1);
        }
      } else {
        setPoints((prev) => prev - 1);
        setUserVote(-1);
        await createPostVote(post._id, -1);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${!loggedInUser && styles.disabledWrapper}`}>
        <button
          onClick={() => upvotePost()}
          className={`${styles.voteBtn} ${
            userVote === 1 ? styles.upvoted : styles.upvoteBtn
          } ${!loggedInUser && styles.disabled}`}
        >
          <BiSolidUpArrow />
        </button>
      </div>
      <p className={styles.text}>{points}</p>
      <div className={`${!loggedInUser && styles.disabledWrapper}`}>
        <button
          onClick={() => downvotePost()}
          className={`${styles.voteBtn} ${
            userVote === -1 ? styles.downvoted : styles.downvoteBtn
          } ${!loggedInUser && styles.disabled}`}
        >
          <BiSolidDownArrow />
        </button>
      </div>
    </div>
  );
}

export default PostVote;
