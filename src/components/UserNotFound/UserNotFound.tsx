import styles from "./UserNotFound.module.css";

function UserNotFound() {
  return (
    <h2 className={`${styles.heading} ${styles.notFound}`}>User not found</h2>
  );
}

export default UserNotFound;
