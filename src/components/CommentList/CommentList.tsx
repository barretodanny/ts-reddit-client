import { Comment, User } from "../../types/types";
import CommentItem from "../CommentItem/CommentItem";

import styles from "./CommentList.module.css";

interface CommentListProps {
  comments: Comment[];
  loggedInUser: User | undefined;
  depth: number;
  fetched: boolean;
}

function CommentList({
  comments,
  loggedInUser,
  depth,
  fetched,
}: CommentListProps) {
  return (
    <div className={styles.container}>
      {comments.map((comment: Comment) => {
        return (
          <CommentItem
            key={comment._id}
            comment={comment}
            loggedInUser={loggedInUser}
            depth={depth}
            fetched={fetched}
          />
        );
      })}
    </div>
  );
}

export default CommentList;
