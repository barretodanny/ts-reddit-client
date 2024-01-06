import styles from "./PostNotFound.module.css";

function PostNotFound() {
  return (
    <h2 className={`${styles.heading} ${styles.notFound}`}>Post not found</h2>
  );
}

export default PostNotFound;
