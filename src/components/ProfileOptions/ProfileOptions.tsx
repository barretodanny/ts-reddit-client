import { Link } from "react-router-dom";
import { User } from "../../types/types";

import styles from "./ProfileOptions.module.css";

interface ProfileOptionsProps {
  user: User;
  loggedInUser: User | undefined;
}

function ProfileOptions({ user, loggedInUser }: ProfileOptionsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link
          to={`/u/${user.username}/comments`}
          className={`${styles.link} ${styles.blueLink}`}
        >
          View {user.username}&apos;s Comments
        </Link>

        <Link
          to={`/u/${user.username}/posts`}
          className={`${styles.link} ${styles.blueLink}`}
        >
          View {user.username}&apos;s Posts
        </Link>

        <Link
          to={`/u/${user.username}/subreddits`}
          className={`${styles.link} ${styles.blueLink}`}
        >
          View {user.username}&apos;s Subreddits
        </Link>
      </div>
      {loggedInUser && loggedInUser._id === user._id && (
        <div className={styles.bottom}>
          <Link
            to={`/u/${user.username}/edit`}
            className={`${styles.link} ${styles.greenLink}`}
          >
            Edit Profile
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfileOptions;
