import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "../../api";
import { createPostSchema } from "../../schemas/schemas";
import { CreatePostInput, Post, Subreddit } from "../../types/types";

import styles from "./PostForm.module.css";

interface PostFormProps {
  subreddit: Subreddit;
}

function PostForm({ subreddit }: PostFormProps) {
  const [createError, setCreateError] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePostInput>({ resolver: zodResolver(createPostSchema) });

  const navigate = useNavigate();

  async function onSubmit(values: CreatePostInput) {
    try {
      // create post
      const res = await createPost(subreddit._id, values);
      const post: Post = res.data;
      setCreateError("");
      navigate(`/r/${subreddit.name}/post/${post._id}`);
    } catch (error: any) {
      Array.isArray(error.response.data)
        ? setCreateError(error.response.data[0].message)
        : setCreateError(error.response.data.message);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={`${styles.heading} ${styles.white} ${styles.center}`}>
        Create New Post
      </h1>
      <h3 className={`${styles.warning} ${styles.center} ${styles.subHeading}`}>
        Must fill out all fields
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <p className={styles.errorMessage}>{createError}</p>
        <div className={styles.formElement}>
          <label htmlFor="title" className={styles.fieldText}>
            Post Title {titleLength > 0 && `(${titleLength})`}
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="title"
              type="text"
              {...register("title")}
              onChange={(e) => {
                setTitleLength(e.target.value.length);
              }}
              className={styles.fieldInput}
            />
          </div>
          <p className={styles.errorMessage}>{errors.title?.message}</p>
        </div>
        <div className={styles.formElement}>
          <label htmlFor="content" className={styles.fieldText}>
            Post Content {contentLength > 0 && `(${contentLength})`}
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="content"
              {...register("content")}
              onChange={(e) => {
                setContentLength(e.target.value.length);
              }}
              className={styles.fieldTextArea}
            />
          </div>
          <p className={styles.errorMessage}>{errors.content?.message}</p>
        </div>
        <button type="submit" className={styles.createBtn}>
          CREATE
        </button>
      </form>
    </div>
  );
}

export default PostForm;
