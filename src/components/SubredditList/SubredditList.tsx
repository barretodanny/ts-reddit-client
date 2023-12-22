import { Subreddit, User } from "../../types/types";
import SubredditItem from "../SubredditItem/SubredditItem";

import styles from "./SubredditList.module.css";

interface SubredditListProps {
  subreddits: Subreddit[];
  user?: User;
}

function SubredditList({ subreddits, user }: SubredditListProps) {
  if (!subreddits) {
    return <div>No subreddits found</div>;
  }

  return (
    <div className={styles.container}>
      {user && (
        <>
          <h3 className={styles.subHeading}>Viewing Subreddits made by</h3>
          <span className={styles.name}>{user.username}</span>
        </>
      )}
      {subreddits.map((subreddit: Subreddit) => {
        return <SubredditItem key={subreddit._id} subreddit={subreddit} />;
      })}
    </div>
  );
}

export default SubredditList;
