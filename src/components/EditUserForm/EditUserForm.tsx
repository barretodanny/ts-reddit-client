import { useState } from "react";
import { EditUserInput, User } from "../../types/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "../../schemas/schemas";
import { useNavigate } from "react-router-dom";
import DeleteAccountBtn from "../DeleteAccountBtn/DeleteAccountBtn";

import styles from "./EditUserForm.module.css";
import { updateUser } from "../../api";

interface EditUserFormProps {
  user: User;
}

function EditUserForm({ user }: EditUserFormProps) {
  const [editError, setEditError] = useState("");
  const [usernameLength, setUsernameLength] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditUserInput>({ resolver: zodResolver(editUserSchema) });

  const navigate = useNavigate();

  async function onSubmit(values: EditUserInput) {
    try {
      const { username, email, password, passwordConfirmation } = values;
      const payload = {
        username: username ? username : undefined,
        email: email ? email : undefined,
        password: password ? password : undefined,
        passwordConfirmation: passwordConfirmation
          ? passwordConfirmation
          : undefined,
      };

      // edit user
      await updateUser(user._id, payload);
      setEditError("");
      username ? navigate(`/u/${username}`) : navigate(`/u/${user.username}`);
    } catch (error: any) {
      Array.isArray(error.response.data)
        ? setEditError(error.response.data[0].message)
        : setEditError(error.response.data.message);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={`${styles.heading} ${styles.white} ${styles.center}`}>
        Edit User
      </h1>
      <h3 className={`${styles.warning} ${styles.center} ${styles.subHeading}`}>
        Only non empty fields will be updated
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <p className={styles.errorMessage}>{editError}</p>
        <div className={styles.formElement}>
          <label htmlFor="username" className={styles.fieldText}>
            Username {usernameLength > 0 && `(${usernameLength})`}
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="username"
              type="text"
              {...register("username")}
              onChange={(e) => {
                setUsernameLength(e.target.value.length);
              }}
              placeholder={user.username}
              className={styles.fieldInput}
            />
          </div>
          <p className={styles.errorMessage}>{errors.username?.message}</p>
        </div>
        <div className={styles.formElement}>
          <label htmlFor="email" className={styles.fieldText}>
            Email
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder={user.email}
              className={styles.fieldInput}
            />
          </div>
          <p className={styles.errorMessage}>{errors.email?.message}</p>
        </div>
        <div className={styles.formElement}>
          <label htmlFor="password" className={styles.fieldText}>
            Password
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={styles.fieldInput}
            />
          </div>
          <p className={styles.errorMessage}>{errors.password?.message}</p>
        </div>
        <div className={styles.formElement}>
          <label htmlFor="passwordConfirmation" className={styles.fieldText}>
            Confirm Password
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="passwordConfirmation"
              type="password"
              {...register("passwordConfirmation")}
              className={styles.fieldInput}
            />
          </div>
          <p className={styles.errorMessage}>{errors.password?.message}</p>
        </div>
        <div className={styles.btnContainer}>
          <button type="submit" className={styles.editBtn}>
            UPDATE
          </button>
          <DeleteAccountBtn user={user} />
        </div>
      </form>
    </div>
  );
}

export default EditUserForm;
