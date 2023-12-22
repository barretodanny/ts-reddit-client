import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/types";
import { getLoggedInUser } from "../../api";
import SubredditForm from "../../components/SubredditForm/SubredditForm";

import styles from "./CreateSubreddit.module.css";

function CreateSubreddit() {
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    document.title = "Create New Subreddit";

    const fetchLoggedInUser = async () => {
      try {
        const response = await getLoggedInUser();

        // user is logged in
        if (response && response.status === 200) {
          setLoggedInUser(response.data);
        }
      } catch (error) {
        // error fetching logged in user
      }
      setShowContent(true);
    };

    fetchLoggedInUser();
  }, []);

  if (!showContent) {
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
