import styles from "./SubredditNotFound.module.css";

function SubredditNotFound() {
  return (
    <h2 className={`${styles.heading} ${styles.notFound}`}>
      Subreddit not found
    </h2>
  );
}

export default SubredditNotFound;
