import { useEffect, useState } from "react";
import { Comment, Vote } from "../../types/types";
import {
  createCommentVote,
  deleteCommentVote,
  getUserCommentVote,
  updateCommentVote,
} from "../../api";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

import styles from "./CommentVote.module.css";

interface CommentVoteProps {
  comment: Comment;
  vote?: Vote;
}

function CommentVote({ comment, vote }: CommentVoteProps) {
  const [userVote, setUserVote] = useState(vote ? vote.value : 0);
  const [points, setPoints] = useState(comment.points);

  useEffect(() => {
    if (vote) {
      setUserVote(vote.value);
    }
  }, [vote]);

  async function upvoteComment() {
    // double check existing vote because state may not match server
    let existingVote: Vote | undefined;

    try {
      const req = await getUserCommentVote(comment._id);
      if (req && req.status === 200) {
        existingVote = req.data;
      }
    } catch (error) {
      // error fetching existingvote, probably does not exist
    }

    if (userVote) {
      if (userVote === 1 && existingVote) {
        setPoints((prev) => prev - 1);
        setUserVote(0);
        await deleteCommentVote(existingVote._id);
      } else if (userVote === -1 && existingVote) {
        if (existingVote.value === 1) {
          setPoints((prev) => prev + 2);
          setUserVote(existingVote.value);
        } else {
          setPoints((prev) => prev + 2);
          setUserVote(1);
          await updateCommentVote(existingVote._id, 1);
        }
      } else if (userVote === 1 && !existingVote) {
        setPoints((prev) => prev - 1);
        setUserVote(0);
      } else if (userVote === -1 && !existingVote) {
        setPoints((prev) => prev + 2);
        setUserVote(1);
        await createCommentVote(comment._id, 1);
      }
    } else {
      if (existingVote) {
        if (existingVote.value === 1) {
          setPoints((prev) => prev + 1);
          setUserVote(existingVote.value);
        } else {
          setPoints((prev) => prev + 1);
          setUserVote(1);
          await updateCommentVote(existingVote._id, 1);
        }
      } else {
        setPoints((prev) => prev + 1);
        setUserVote(1);
        await createCommentVote(comment._id, 1);
      }
    }
  }

  async function downvoteComment() {
    // double check existing vote because state may not match server
    let existingVote: Vote | undefined;

    try {
      const req = await getUserCommentVote(comment._id);
      if (req && req.status === 200) {
        existingVote = req.data;
      }
    } catch (error) {
      // error fetching existing vote, prob doesn't exist
    }

    if (userVote) {
      if (userVote === -1 && existingVote) {
        setPoints((prev) => prev + 1);
        setUserVote(0);
        deleteCommentVote(existingVote._id);
      } else if (userVote === 1 && existingVote) {
        if (existingVote.value === -1) {
          setPoints((prev) => prev - 2);
          setUserVote(existingVote.value);
        } else {
          setPoints((prev) => prev - 2);
          setUserVote(-1);
          await updateCommentVote(existingVote._id, -1);
        }
      } else if (userVote === -1 && !existingVote) {
        setPoints((prev) => prev + 1);
        setUserVote(0);
      } else if (userVote === 1 && !existingVote) {
        setPoints((prev) => prev - 2);
        setUserVote(-1);
        await createCommentVote(comment._id, -1);
      }
    } else {
      if (existingVote) {
        if (existingVote.value === -1) {
          setPoints((prev) => prev - 1);
          setUserVote(existingVote.value);
        } else {
          setPoints((prev) => prev - 1);
          setUserVote(-1);
          await updateCommentVote(existingVote._id, -1);
        }
      } else {
        setPoints((prev) => prev - 1);
        setUserVote(-1);
        await createCommentVote(comment._id, -1);
      }
    }
  }

  return (
    <div className={styles.container}>
      <button
        onClick={() => upvoteComment()}
        className={`${styles.voteBtn} ${
          userVote === 1 ? styles.upvoted : styles.upvoteBtn
        }`}
      >
        <BiSolidUpArrow />
      </button>
      <p>{points}</p>
      <button
        onClick={() => downvoteComment()}
        className={`${styles.voteBtn} ${
          userVote === -1 ? styles.downvoted : styles.downvoteBtn
        }`}
      >
        <BiSolidDownArrow />
      </button>
    </div>
  );
}

export default CommentVote;
