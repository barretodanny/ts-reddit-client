import { Link } from "react-router-dom";
import { getTimeAgo } from "../../utils/utils";
import { User } from "../../types/types";

import styles from "./UserItem.module.css";

interface UserItemProps {
  user: User;
}

function UserItem({ user }: UserItemProps) {
  const timeAgo = getTimeAgo(user.createdAt);

  return (
    <div className={styles.container}>
      <span className={styles.grey}>Joined {timeAgo}</span>
      <Link to={`/u/${user.username}`} className={styles.link}>
        {user.username}
      </Link>
    </div>
  );
}

export default UserItem;
