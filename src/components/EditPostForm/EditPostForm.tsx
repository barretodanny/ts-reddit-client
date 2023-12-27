import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditPostInput, Post, Subreddit } from "../../types/types";
import { editPostSchema } from "../../schemas/schemas";
import { updatePost } from "../../api";

import styles from "./EditPostForm.module.css";
import DeletePostBtn from "../DeletePostBtn/DeletePostBtn";

interface EditPostFormProps {
  post: Post;
  subreddit: Subreddit;
}

function EditPostForm({ post, subreddit }: EditPostFormProps) {
  const [editError, setEditError] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditPostInput>({ resolver: zodResolver(editPostSchema) });

  const navigate = useNavigate();

  async function onSubmit(values: EditPostInput) {
    try {
      // edit post
      await updatePost(post._id, values);
      setEditError("");
      navigate(`/r/${subreddit.name}/post/${post._id}`);
    } catch (error: any) {
      Array.isArray(error.response.data)
        ? setEditError(error.response.data[0].message)
        : setEditError(error.response.data.message);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={`${styles.heading} ${styles.white} ${styles.center}`}>
        Edit Post
      </h1>
      <h3 className={`${styles.warning} ${styles.center} ${styles.subHeading}`}>
        Only non empty fields will be updated
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <p className={styles.errorMessage}>{editError}</p>
        <div className={styles.formElement}>
          <label htmlFor="title" className={styles.fieldText}>
            Post Title {titleLength > 0 && `(${titleLength})`}
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="title"
              {...register("title")}
              onChange={(e) => {
                setTitleLength(e.target.value.length);
              }}
              placeholder={post.title}
              className={styles.fieldInput}
            />
          </div>
          <p className={styles.errorMessage}>{errors.title?.message}</p>
        </div>
        <div className={styles.formElement}>
          <label htmlFor="content" className={styles.fieldText}>
            Post Content {contentLength > 0 && `(${contentLength})`}
          </label>
          <textarea
            id="content"
            {...register("content")}
            onChange={(e) => {
              setContentLength(e.target.value.length);
            }}
            placeholder={post.content}
            className={styles.fieldTextArea}
          />
          <p className={styles.errorMessage}>{errors.content?.message}</p>
        </div>
        <div className={styles.btnContainer}>
          <button type="submit" className={`${styles.editBtn} ${styles.btn}`}>
            UPDATE
          </button>
          <button className={`${styles.btn} ${styles.cancelBtn}`}>
            <Link
              to={`/r/${subreddit.name}/post/${post._id}`}
              className={styles.link}
            >
              CANCEL
            </Link>
          </button>
          <DeletePostBtn post={post} />
        </div>
      </form>
    </div>
  );
}

export default EditPostForm;
