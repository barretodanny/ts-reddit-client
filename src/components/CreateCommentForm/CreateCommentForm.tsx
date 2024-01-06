import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCommentInput, Post, User } from "../../types/types";
import { createCommentSchema } from "../../schemas/schemas";
import { createComment } from "../../api";

import styles from "./CreateCommentForm.module.css";

interface CreateCommentFormProps {
  post: Post;
  loggedInUser: User;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

function CreateCommentForm({
  post,
  loggedInUser,
  setComments,
}: CreateCommentFormProps) {
  const [createError, setCreateError] = useState("");
  const { register, handleSubmit, reset } = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
  });

  async function onSubmit(values: CreateCommentInput) {
    try {
      // create comment
      const response = await createComment(post._id, values);
      const comment = response.data;
      setCreateError("");
      setComments((prev) => [
        { ...comment, user: { _id: comment.user } },
        ...prev,
      ]);
      reset({ content: "" });
    } catch (error: any) {
      Array.isArray(error.response.data)
        ? setCreateError(error.response.data[0].message)
        : setCreateError(error.response.data.message);
    }
  }

  return (
    <div className={styles.container}>
      <p className={`${styles.m0} ${styles.grey}`}>
        Comment as{" "}
        <Link to={`/u/${loggedInUser.username}`} className={styles.link}>
          {loggedInUser.username}
        </Link>
      </p>
      {createError && <p className={styles.warning}>{createError}</p>}
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formElement}>
            <textarea
              id="content"
              {...register("content")}
              placeholder="Comment here..."
              className={styles.fieldTextArea}
            />
          </div>
          <button type="submit" className={styles.submit}>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCommentForm;
