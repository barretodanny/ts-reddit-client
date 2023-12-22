import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { createSubreddit } from "../../api";

import { createSubredditSchema } from "../../schemas/schemas";
import { CreateSubredditInput } from "../../types/types";

import styles from "./SubredditForm.module.css";

function SubredditForm() {
  const [createError, setCreateError] = useState("");
  const [nameLength, setNameLength] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSubredditInput>({
    resolver: zodResolver(createSubredditSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(values: CreateSubredditInput) {
    try {
      // create subreddit
      await createSubreddit(values);
      setCreateError("");
      navigate(`/r/${values.name}`);
    } catch (error: any) {
      Array.isArray(error.response.data)
        ? setCreateError(error.response.data[0].message)
        : setCreateError(error.response.data.message);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={`${styles.heading} ${styles.white} ${styles.center}`}>
        Create New Subreddit
      </h1>

      <h3 className={`${styles.warning} ${styles.center} ${styles.subHeading}`}>
        Must fill out all fields
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <p className={styles.errorMessage}>{createError}</p>
        <div className={styles.formElement}>
          <label htmlFor="name" className={styles.fieldText}>
            Subreddit Name {nameLength > 0 && `(${nameLength})`}
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="name"
              type="text"
              {...register("name")}
              onChange={(e) => {
                setNameLength(e.target.value.length);
              }}
              className={styles.fieldInput}
            />
          </div>
          <p className={styles.errorMessage}>{errors.name?.message}</p>
        </div>
        <button type="submit" className={styles.createBtn}>
          CREATE
        </button>
      </form>
    </div>
  );
}

export default SubredditForm;
