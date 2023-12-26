import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Comment, User, Vote } from "../../types/types";
import { getTimeAgo } from "../../utils/utils";
import {
  deleteComment,
  getCommentReplies,
  getUserCommentVote,
} from "../../api";

import CommentList from "../CommentList/CommentList";
import CommentVote from "../CommentVote/CommentVote";
import CommentReplyForm from "../CommentReplyForm/CommentReplyForm";

import styles from "./CommentItem.module.css";

interface CommentItemProps {
  comment: Comment;
  loggedInUser: User | undefined;
  depth: number;
  fetched: boolean;
}

function CommentItem({
  comment,
  loggedInUser,
  depth,
  fetched,
}: CommentItemProps) {
  const [replies, setReplies] = useState<Comment[]>([]);
  const [show, setShow] = useState(true);
  const [vote, setVote] = useState<Vote>();
  const [deleted, setDeleted] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const location = useLocation();
  const searchParams = location.search;
  const timeAgo = getTimeAgo(comment.createdAt);

  useEffect(() => {
    getUserCommentVote(comment._id).then((data) => {
      setVote(data.data);
    });
  }, [comment._id]);

  useEffect(() => {
    getCommentReplies(comment._id, searchParams).then((data) => {
      setReplies(data.data);
    });
  }, [comment._id, searchParams]);

  async function handleDelete() {
    const confirm = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (confirm) {
      const res = await deleteComment(comment._id);
      if (res.status === 200) {
        setDeleted(true);
      }
    }
  }

  // Support deep nested comment eventually
  if (depth > 3) {
    return <></>;
  }

  if (deleted) {
    return <></>;
  }

  if (!show) {
    return (
      <div
        style={{
          marginLeft: 10 * Number(depth > 0),
        }}
        className={styles.collapsedComment}
      >
        {!fetched ? (
          <div className={styles.info}>
            <span className={styles.infoText}>Posted by </span>
            <Link
              to={`/u/${loggedInUser!.username}`}
              className={styles.userLink}
            >
              {loggedInUser!.username}
            </Link>
          </div>
        ) : (
          <div className={styles.info}>
            <span className={styles.infoText}>Posted by </span>
            {comment.user ? (
              <Link
                to={`/u/${comment.user.username}`}
                className={styles.userLink}
              >
                {comment.user?.username}
              </Link>
            ) : (
              "[DELETED]"
            )}
          </div>
        )}
        <button
          onClick={() => setShow((prevState) => !prevState)}
          className={styles.btn}
        >
          show
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        marginLeft: 10 * Number(depth > 0),
      }}
      className={styles.container}
    >
      <div className={styles.commentContainer}>
        <CommentVote comment={comment} vote={vote} />

        <div className={styles.right}>
          {!fetched ? (
            <div className={styles.info}>
              <span className={styles.infoText}>Posted by </span>
              <Link
                to={`/u/${loggedInUser?.username}`}
                className={styles.userLink}
              >
                {loggedInUser?.username}
              </Link>
              <span className={styles.infoText}>{timeAgo}</span>
            </div>
          ) : (
            <div className={styles.info}>
              <span className={styles.infoText}>Posted by </span>
              {comment.user ? (
                <Link
                  to={`/u/${comment.user.username}`}
                  className={styles.userLink}
                >
                  {comment.user?.username}
                </Link>
              ) : (
                "[DELETED]"
              )}
              <span className={styles.infoText}>{timeAgo}</span>
            </div>
          )}

          <p className={styles.content}>{comment.content}</p>
          <div className={styles.bottom}>
            <button
              onClick={() => setShow((prevState) => !prevState)}
              className={styles.btn}
            >
              Hide
            </button>
            {loggedInUser && (
              <button
                onClick={() => setShowReplyForm((prevState) => !prevState)}
                className={styles.btn}
              >
                {showReplyForm ? "Cancel" : "Reply"}
              </button>
            )}
            {loggedInUser &&
              comment.user &&
              comment.user._id === loggedInUser._id && (
                <button
                  onClick={() => {
                    handleDelete();
                  }}
                  className={`${styles.btn} ${styles.delete}`}
                >
                  Delete
                </button>
              )}
          </div>
        </div>
      </div>
      {showReplyForm && (
        <CommentReplyForm
          parent={comment}
          setReplies={setReplies}
          setShowForm={setShowReplyForm}
          loggedInUser={loggedInUser!}
        />
      )}
      <CommentList
        comments={replies}
        loggedInUser={loggedInUser}
        depth={depth + 1}
        fetched={true}
      />
    </div>
  );
}

export default CommentItem;
