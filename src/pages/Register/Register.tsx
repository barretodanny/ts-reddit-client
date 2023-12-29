import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();
  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    document.title = "Sign Up";
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
        Create an account
      </h3>
      <RegisterForm />
      <p className={styles.text}>
        Already have an account?{" "}
        <Link to={"/auth/login"} className={styles.loginText}>
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
