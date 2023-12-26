import { useEffect, useState } from "react";
import { Post as PostType, Subreddit, User, Vote } from "../../types/types";
import { getUserPostVote } from "../../api";

import styles from "./Post.module.css";
import PostVote from "../PostVote/PostVote";
import { Link } from "react-router-dom";
import { getTimeAgo } from "../../utils/utils";

interface PostProps {
  post: PostType;
  subreddit: Subreddit;
  loggedInUser: User | undefined;
}

function Post({ post, subreddit, loggedInUser }: PostProps) {
  const [userVote, setUserVote] = useState<Vote>();

  useEffect(() => {
    const fetchUserVote = async () => {
      try {
        const response = await getUserPostVote(post._id);
        setUserVote(response.data);
      } catch (error: any) {
        // error fetching vote
      }
    };

    fetchUserVote();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <PostVote post={post} vote={userVote} loggedInUser={loggedInUser} />
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <span className={styles.postedBy}>Posted by </span>
          {post.user ? (
            <Link
              to={`/u/${post.user.username}`}
              className={`${styles.infoLink} ${styles.userLink}`}
            >
              u/{post.user.username}
            </Link>
          ) : (
            "[DELETED]"
          )}{" "}
          <span className={`${styles.text} ${styles.time}`}>
            {getTimeAgo(post.createdAt)}
          </span>
        </div>
        <h2 className={`${styles.title} ${styles.white}`}>{post.title}</h2>
        <div className={styles.contentWrapper}>
          <p className={`${styles.content} ${styles.white}`}>{post.content}</p>
        </div>

        {loggedInUser && post.user?._id == loggedInUser._id && (
          <Link
            to={`/r/${subreddit.name}/post/${post._id}/edit`}
            className={`${styles.link} ${styles.edit}`}
          >
            Edit
          </Link>
        )}
      </div>
    </div>
  );
}

export default Post;
