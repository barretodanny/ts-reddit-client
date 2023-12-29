import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoginForm from "../../components/LoginForm/LoginForm";

import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);

  if (loggedInUser || !authFetched) {
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
