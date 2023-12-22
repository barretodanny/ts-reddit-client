import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../api";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

import styles from "./Register.module.css";

function Register() {
  const [showPage, setShowPage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign Up";

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
}

export default Register;
