import { useEffect, useState } from "react";
import { Subreddit as SubredditType, User } from "../../types/types";
import { Link, useLocation } from "react-router-dom";
import { extractSubredditName } from "../../utils/utils";
import { getLoggedInUser, getSubredditByName } from "../../api";

import PostForm from "../../components/PostForm/PostForm";

import styles from "./CreatePost.module.css";

function CreatePost() {
  const [subreddit, setSubreddit] = useState<SubredditType>();
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [showContent, setShowContent] = useState(false);

  const location = useLocation();
  const url = location.pathname;
  const subredditName = extractSubredditName(url);

  useEffect(() => {
    document.title = subredditName
      ? `${subredditName} - Create Post`
      : "Not found";

    const fetchSubreddit = async () => {
      try {
        const response = await getSubredditByName(subredditName);
        setSubreddit(response);
      } catch (error: any) {
        // error fetching subreddit
      }
      setShowContent(true);
    };

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
    };

    fetchSubreddit();
    fetchLoggedInUser();
  }, []);

  if (!showContent) {
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
