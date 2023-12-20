import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { createUserSchema } from "../../schemas/schemas";
import { CreateUserInput } from "../../types/types";

import { createUser } from "../../api";

import styles from "./RegisterForm.module.css";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

function RegisterForm() {
  const [registerError, setRegisterError] = useState("");
  const [usernameLength, setUsernameLength] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(values: CreateUserInput) {
    try {
      // create user
      await createUser(values);
      setRegisterError("");
      navigate("/auth/login");
    } catch (error: any) {
      Array.isArray(error.response.data)
        ? setRegisterError(error.response.data[0].message)
        : setRegisterError(error.response.data.message);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <p className={styles.errorMessage}>{registerError}</p>

        <div className={styles.formElement}>
          <label htmlFor="username" className={styles.fieldText}>
            Username {usernameLength > 0 && `(${usernameLength})`}
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="username"
              type="text"
              placeholder="bobsmith"
              {...register("username")}
              onChange={(e) => {
                setUsernameLength(e.target.value.length);
              }}
              className={styles.fieldInput}
            />
            <BiUserCircle size={20} className={styles.icon} />
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
            <RiLockPasswordLine size={20} className={styles.icon} />
          </div>
          <p className={styles.errorMessage}>
            {errors.passwordConfirmation?.message}
          </p>
        </div>

        <button type="submit" className={styles.registerBtn}>
          SIGN UP
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
