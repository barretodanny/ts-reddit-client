import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Subreddit } from "../../types/types";
import { extractSubredditName } from "../../utils/utils";
import { getSubredditByName } from "../../api";

import EditSubredditForm from "../../components/EditSubredditForm/EditSubredditForm";
import SubredditNotFound from "../../components/SubredditNotFound/SubredditNotFound";

import styles from "./EditSubreddit.module.css";

function EditSubreddit() {
  const [subreddit, setSubreddit] = useState<Subreddit>();
  const [subredditFetched, setSubredditFetched] = useState(false);

  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  const url = location.pathname;
  const subredditName = extractSubredditName(url);

  useEffect(() => {
    const fetchSubreddit = async () => {
      try {
        const response = await getSubredditByName(subredditName);
        setSubreddit(response);
      } catch (error: any) {
        // error fetching subreddit
      } finally {
        setSubredditFetched(true);
      }
    };

    fetchSubreddit();
  }, []);

  useEffect(() => {
    if (!subredditFetched) {
      return;
    }

    document.title = subreddit
      ? `${subreddit.name} - Create Post`
      : "Subreddit Not Found";
  }, [subreddit, subredditFetched]);

  if (!authFetched || !subredditFetched) {
    return <></>;
  }

  if (!subreddit) {
    return <SubredditNotFound />;
  }

  return (
    <div className={styles.container}>
      <Link to={`/r/${subreddit.name}`} className={styles.subLink}>
        <h1 className={`${styles.heading} ${styles.orange} ${styles.center}`}>
          r/{subreddit.name}
        </h1>
      </Link>
      {!loggedInUser ? (
        <p className={`${styles.text} ${styles.white} ${styles.center}`}>
          Must be{" "}
          <Link to={"/auth/login"} className={styles.loginLink}>
            logged in
          </Link>{" "}
          to edit a subreddit
        </p>
      ) : (
        <>
          {loggedInUser._id === subreddit.user._id ? (
            <EditSubredditForm subreddit={subreddit} />
          ) : (
            <p className={`${styles.text} ${styles.warning} ${styles.center}`}>
              You do not have permission to edit this subreddit
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default EditSubreddit;
