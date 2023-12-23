import { Link } from "react-router-dom";
import { Subreddit, User } from "../../types/types";

import styles from "./SecondaryOptions.module.css";

interface SecondaryOptionsProps {
  subreddit: Subreddit;
  loggedInUser: User | undefined;
}

function SecondaryOptions({ subreddit, loggedInUser }: SecondaryOptionsProps) {
  return (
    <div className={styles.container}>
      <Link
        to={`/r/${subreddit.name}/search`}
        className={`${styles.link} ${styles.blueLink}`}
      >
        Search for posts in /r/{subreddit.name}
      </Link>
      <div className={styles.bottom}>
        {loggedInUser && (
          <Link
            to={`/r/${subreddit.name}/create`}
            className={`${styles.link} ${styles.greenLink}`}
          >
            Create A New Post
          </Link>
        )}
        {loggedInUser && subreddit.user?._id === loggedInUser._id && (
          <Link
            to={`/r/${subreddit.name}/edit`}
            className={`${styles.link} ${styles.greenLink}`}
          >
            Edit Subreddit
          </Link>
        )}
      </div>
    </div>
  );
}

export default SecondaryOptions;
