import React, { useEffect, useState } from "react";

import styles from "./PostItem.module.css";
import { Post, User, Vote } from "../../types/types";
import { Link } from "react-router-dom";
import PostVote from "../PostVote/PostVote";
import { getUserPostVote } from "../../api";
import { getTimeAgo } from "../../utils/utils";

interface PostItemProps {
  post: Post;
  loggedInUser: User | undefined;
}

function PostItem({ post, loggedInUser }: PostItemProps) {
  const [userVote, setUserVote] = useState<Vote>();
  const timeAgo = getTimeAgo(post.createdAt);

  useEffect(() => {
    const fetchUserPostvote = async () => {
      try {
        const response = await getUserPostVote(post._id);
        setUserVote(response.data);
      } catch (error) {
        // error fetching user post vote, probably does not exist
      }
    };

    fetchUserPostvote();
  }, []);

  if (!post.subreddit) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      {/* left side vote btns */}
      <PostVote post={post} vote={userVote} loggedInUser={loggedInUser} />
      {/* right side content */}
      <div className={styles.right}>
        {/* top info */}
        <div className={styles.info}>
          <Link
            to={`/r/${post.subreddit?.name}`}
            className={`${styles.infoLink} ${styles.subLink}`}
          >
            {post.subreddit ? `r/${post.subreddit.name}` : "deleted"}
          </Link>
          <span className={styles.cutText}>
            <span className={styles.postedBy}>Posted by </span>
            <Link
              to={`/u/${post.user?.username}`}
              className={`${styles.infoLink} ${styles.userLink}`}
            >
              {post.user ? <>u/{post.user?.username}</> : "deleted"}
            </Link>
          </span>

          <span className={`${styles.text} ${styles.time}`}>{timeAgo}</span>
        </div>

        <Link
          to={`/r/${post.subreddit.name}/post/${post._id}`}
          className={styles.postLink}
        >
          <p className={styles.title}>{post.title}</p>
        </Link>
        <Link
          to={`/r/${post.subreddit.name}/post/${post._id}`}
          className={styles.contentLink}
        >
          <p className={styles.content}>{post.content}</p>
        </Link>
      </div>
    </div>
  );
}

export default PostItem;
