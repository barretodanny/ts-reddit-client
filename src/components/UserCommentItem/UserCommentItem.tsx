import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubredditById } from "../../api";
import { Comment, Subreddit } from "../../types/types";
import { getTimeAgo } from "../../utils/utils";

import styles from "./UserCommentItem.module.css";

interface UserCommentItemProps {
  comment: Comment;
}

function UserCommentItem({ comment }: UserCommentItemProps) {
  const [subreddit, setSubreddit] = useState<Subreddit>();

  const timeAgo = getTimeAgo(comment.createdAt);

  useEffect(() => {
    const fetchSubreddit = async () => {
      try {
        // @ts-ignore
        const response = await getSubredditById(comment.post.subreddit);
        setSubreddit(response);
      } catch (error: any) {
        // error fetching subreddit
      }
    };

    fetchSubreddit();
  }, []);

  if (!subreddit) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={styles.postedBy}>Posted by </span>
        <Link to={`/u/${comment.user.username}`} className={styles.userLink}>
          {comment.user.username}
        </Link>
        <span className={styles.time}>{timeAgo}</span>
        <span className={styles.points}>(Points: {comment.points})</span>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.content}>{comment.content}</p>
      </div>
      <div className={styles.bottom}>
        <span className={styles.commentedOn}>Commented on: </span>
        <Link
          to={`/r/${subreddit.name}/post/${comment.post._id}`}
          className={`${styles.postLink} ${styles.blueLink}`}
        >
          {comment.post.title}
        </Link>
      </div>
    </div>
  );
}

export default UserCommentItem;
