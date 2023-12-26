import React, { useState } from "react";
import { Comment, User } from "../../types/types";
import { createComment } from "../../api";
import { Link } from "react-router-dom";

import styles from "./CommentReplyForm.module.css";

interface CommentReplyFormProps {
  parent: Comment;
  setReplies: React.Dispatch<React.SetStateAction<Comment[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUser: User;
}

function CommentReplyForm({
  parent,
  setReplies,
  setShowForm,
  loggedInUser,
}: CommentReplyFormProps) {
  const [content, setContent] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const postId = parent.post._id
      ? String(parent.post._id)
      : String(parent.post);
    const { _id: parentId } = parent;

    // create comment reply
    const res = await createComment(postId, { content, parent: parentId });

    if (res.status !== 201) {
      return;
    }

    const reply = await res.data;
    setReplies((prevState) => [reply, ...prevState]);
    setContent("");
    setShowForm(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p className={`${styles.m0} ${styles.grey} ${styles.topText}`}>
          Reply as{" "}
        </p>
        <Link to={`/u/${loggedInUser.username}`} className={styles.link}>
          {loggedInUser.username}
        </Link>
      </div>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            placeholder="Reply here..."
            onChange={(e) => setContent(e.target.value)}
            className={styles.fieldTextArea}
          />
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentReplyForm;
