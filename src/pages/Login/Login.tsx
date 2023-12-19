import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../api";
import LoginForm from "../../components/LoginForm/LoginForm";

import styles from "./Login.module.css";

function Login() {
  const [showPage, setShowPage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In";

    const fetchLoggedInUser = async () => {
      try {
        const response = await getLoggedInUser();

        // user is logged in
        if (response && response.status === 200) {
          navigate("/");
        } else {
          setShowPage(true);
        }
      } catch (error) {
        // error fetching logged in user
        setShowPage(true);
      }
    };

    fetchLoggedInUser();
  }, []);

  if (showPage) {
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
}

export default Login;
