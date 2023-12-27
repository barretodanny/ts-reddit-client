import { Comment, User } from "../../types/types";

import UserCommentItem from "../UserCommentItem/UserCommentItem";

import styles from "./UserCommentList.module.css";

interface UserCommentListProps {
  comments: Comment[];
  user: User;
}

function UserCommentList({ comments, user }: UserCommentListProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.subHeading}>Viewing Comments made by</h3>
      <span className={styles.name}>{user.username}</span>
      {comments.map((comment) => {
        return <UserCommentItem key={comment._id} comment={comment} />;
      })}
    </div>
  );
}

export default UserCommentList;
