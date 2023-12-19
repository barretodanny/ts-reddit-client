import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { createSessionSchema } from "../../schemas/schemas";
import { CreateSessionInput } from "../../types/types";
import { createSession } from "../../api";

import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const [loginError, setLoginError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(values: CreateSessionInput) {
    try {
      // create session
      await createSession(values);

      // login success, cookies now set on browser with access/refresh tokens
      setLoginError("");
      // refresh page, redirects to home
      navigate(0);

      // failed, set login error
    } catch (error: any) {
      Array.isArray(error.response.data)
        ? setLoginError(error.response.data[0].message)
        : setLoginError(error.response.data.message);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <p className={styles.errorMessage}>{loginError}</p>

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
