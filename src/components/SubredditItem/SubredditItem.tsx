import { Link } from "react-router-dom";
import { getTimeAgo } from "../../utils/utils";
import { Subreddit } from "../../types/types";

import styles from "./SubredditItem.module.css";

interface SubredditItemProps {
  subreddit: Subreddit;
}

function SubredditItem({ subreddit }: SubredditItemProps) {
  const timeAgo = getTimeAgo(subreddit.createdAt);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={`${styles.createdBy} ${styles.grey}`}>Created by</span>
        {subreddit.user ? (
          <Link
            to={`/u/${subreddit.user.username}`}
            className={`${styles.link} ${styles.userLink}`}
          >
            u/{subreddit.user.username}
          </Link>
        ) : (
          <span className={styles.deleted}>[DELETED]</span>
        )}
        <span className={styles.grey}>{timeAgo}</span>
      </div>
      <Link
        to={`/r/${subreddit.name}`}
        className={`${styles.link} ${styles.subLink}`}
      >
        {subreddit.name}
      </Link>
    </div>
  );
}

export default SubredditItem;
