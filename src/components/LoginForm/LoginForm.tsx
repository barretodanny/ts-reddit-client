import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
// cookie?

import { createSessionSchema } from "../../schemas/schemas";
import { CreateSessionInput } from "../../types/types";
import { createSession } from "../../api";

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
      navigate("/");

      // failed, set login error
    } catch (error: any) {
      Array.isArray(error.response.data)
        ? setLoginError(error.response.data[0].message)
        : setLoginError(error.response.data.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{loginError}</p>

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

        <button type="submit"> LOGIN</button>
      </form>
    </div>
  );
}

export default LoginForm;
