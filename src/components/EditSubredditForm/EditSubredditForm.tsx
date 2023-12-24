import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditSubredditInput, Subreddit } from "../../types/types";
import { editSubredditSchema } from "../../schemas/schemas";
import { useNavigate } from "react-router-dom";
import { updateSubreddit } from "../../api";
import DeleteSubredditBtn from "../DeleteSubredditBtn/DeleteSubredditBtn";

import styles from "./EditSubredditForm.module.css";

interface EditSubredditFormProps {
  subreddit: Subreddit;
}

function EditSubredditForm({ subreddit }: EditSubredditFormProps) {
  const [editError, setEditError] = useState("");
  const [nameLength, setNameLength] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditSubredditInput>({
    resolver: zodResolver(editSubredditSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(values: EditSubredditInput) {
    try {
      const { name } = values;
      const payload = {
        name: name ? name : undefined,
      };

      await updateSubreddit(subreddit._id, payload);
      setEditError("");

      // send to subreddit page, if name updated send to new name
      if (name) {
        navigate(`/r/${name}`);
      } else {
        navigate(`/r/${subreddit.name}`);
      }
    } catch (error: any) {
      Array.isArray(error.response.data)
        ? setEditError(error.response.data[0].message)
        : setEditError(error.response.data.message);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={`${styles.heading} ${styles.white} ${styles.center}`}>
        Edit Subreddit
      </h1>
      <h3 className={`${styles.warning} ${styles.center} ${styles.subHeading}`}>
        Only non empty fields will be updated
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <p className={styles.errorMessage}>{editError}</p>
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
              placeholder={subreddit.name}
              className={styles.fieldInput}
            />
          </div>
          <p className={styles.errorMessage}>{errors.name?.message}</p>
        </div>
        <div className={styles.btnContainer}>
          <button type="submit" className={styles.editBtn}>
            UPDATE
          </button>
          <DeleteSubredditBtn subreddit={subreddit} />
        </div>
      </form>
    </div>
  );
}

export default EditSubredditForm;
