import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAuthUser, reset } from "../../redux/slices/AuthSlice";
import LoginForm from "../../components/LoginForm/LoginForm";

import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loggedInUser, isSuccess, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    document.title = "Sign In";

    dispatch(getAuthUser());
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
      dispatch(reset());
    }
  }, [loggedInUser]);

  if (loggedInUser || isLoading || !isSuccess) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <h1 className={`${styles.text} ${styles.heading}`}>Welcome!</h1>
      <h3 className={`${styles.text} ${styles.subHeading}`}>
        Please Sign in to your account
      </h3>
      <LoginForm />
      <p className={styles.text}>
        Don&apos;t have an account?{" "}
        <Link to={"/auth/register"} className={styles.registerText}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
