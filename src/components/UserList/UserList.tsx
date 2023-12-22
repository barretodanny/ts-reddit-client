import { User } from "../../types/types";
import UserItem from "../UserItem/UserItem";

import styles from "./UserList.module.css";

interface UserListProps {
  users: User[];
}

function UserList({ users }: UserListProps) {
  if (!users) {
    return <div>No users found</div>;
  }

  return (
    <div className={styles.container}>
      {users.map((user: User) => {
        return <UserItem key={user._id} user={user} />;
      })}
    </div>
  );
}

export default UserList;
