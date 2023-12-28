import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";

import { createSessionSchema } from "../../schemas/schemas";
import { CreateSessionInput } from "../../types/types";

import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.auth);
  const { isError, message } = state;

  async function onSubmit(values: CreateSessionInput) {
    await dispatch(login(values));
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <p className={styles.errorMessage}>{isError && message}</p>

        <div className={styles.formElement}>
          <label htmlFor="email" className={styles.fieldText}>
            Email
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="email"
              type="email"
              placeholder="bobsmith@email.com"
              {...register("email")}
              className={styles.fieldInput}
            />
            <AiOutlineMail size={20} className={styles.icon} />
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
            <RiLockPasswordLine size={20} className={styles.icon} />
          </div>
          <p className={styles.errorMessage}>{errors.password?.message}</p>
        </div>

        <button type="submit" className={styles.loginBtn}>
          {" "}
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
