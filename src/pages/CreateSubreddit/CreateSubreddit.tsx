import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SubredditForm from "../../components/SubredditForm/SubredditForm";

import styles from "./CreateSubreddit.module.css";

function CreateSubreddit() {
  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    document.title = "Create New Subreddit";
  }, []);

  if (!authFetched) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <Link to={"/subreddits"} className={styles.headingLink}>
        <h1 className={`${styles.heading} ${styles.white} ${styles.center}`}>
          Subreddits
        </h1>
      </Link>
      {!loggedInUser ? (
        <p className={`${styles.text} ${styles.white} ${styles.center}`}>
          Must be{" "}
          <Link to={"/auth/login"} className={styles.loginLink}>
            logged in
          </Link>{" "}
          to create a Subreddit
        </p>
      ) : (
        <SubredditForm />
      )}
    </div>
  );
}

export default CreateSubreddit;
