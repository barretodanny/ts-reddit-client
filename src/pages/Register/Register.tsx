import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, reset } from "../../redux/slices/AuthSlice";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loggedInUser, isSuccess, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    document.title = "Sign Up";

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
