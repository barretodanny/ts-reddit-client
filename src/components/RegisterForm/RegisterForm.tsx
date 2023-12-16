import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { createUserSchema } from "../../schemas/schemas";
import { CreateUserInput } from "../../types/types";

import { createUser } from "../../api";

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{registerError}</p>

        <div>
          <label htmlFor="username">
            Username {usernameLength > 0 && `(${usernameLength})`}
          </label>
          <div>
            <input
              id="username"
              type="text"
              placeholder="bobsmith"
              {...register("username")}
              onChange={(e) => {
                setUsernameLength(e.target.value.length);
              }}
            />
          </div>
          <p>{errors.username?.message}</p>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <div>
            <input
              id="email"
              type="email"
              placeholder="bobsmith@email.com"
              {...register("email")}
            />
          </div>
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input id="password" type="password" {...register("password")} />
          </div>
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <div>
            <input
              id="passwordConfirmation"
              type="password"
              {...register("passwordConfirmation")}
            />
          </div>
          <p>{errors.passwordConfirmation?.message}</p>
        </div>

        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
}

export default RegisterForm;
