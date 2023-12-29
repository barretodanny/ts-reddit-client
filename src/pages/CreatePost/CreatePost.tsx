import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link, useLocation } from "react-router-dom";
import { Subreddit as SubredditType } from "../../types/types";
import { extractSubredditName } from "../../utils/utils";
import { getSubredditByName } from "../../api";

import PostForm from "../../components/PostForm/PostForm";

import styles from "./CreatePost.module.css";

function CreatePost() {
  const [subreddit, setSubreddit] = useState<SubredditType>();
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
    return <h2 className={styles.nfHeading}>Subreddit not found</h2>;
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
          to create a Post
        </p>
      ) : (
        <PostForm subreddit={subreddit} />
      )}
    </div>
  );
}

export default CreatePost;
