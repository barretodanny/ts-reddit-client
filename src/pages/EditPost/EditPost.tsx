import { useEffect, useState } from "react";
import { Post, Subreddit, User } from "../../types/types";
import { Link, useLocation } from "react-router-dom";
import { extractPostId, extractSubredditName } from "../../utils/utils";
import { getLoggedInUser, getPostById, getSubredditByName } from "../../api";

import styles from "./EditPost.module.css";
import EditPostForm from "../../components/EditPostForm/EditPostForm";

function EditPost() {
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [subreddit, setSubreddit] = useState<Subreddit>();
  const [post, setPost] = useState<Post>();
  const [showContent, setShowContent] = useState(false);

  const location = useLocation();
  const url = location.pathname;
  const postId = extractPostId(url);
  const subredditName = extractSubredditName(url);

  useEffect(() => {
    const fetchSubreddit = async () => {
      try {
        const response = await getSubredditByName(subredditName);
        setSubreddit(response);
      } catch (error: any) {
        // error fetching subreddit
      }
    };

    const fetchPost = async () => {
      try {
        const response = await getPostById(postId);
        setPost(response.data);
      } catch (error: any) {
        // error fetching post
      }
    };

    const fetchLoggedInUser = async () => {
      try {
        const response = await getLoggedInUser();

        // user is logged in
        if (response && response.status === 200) {
          setLoggedInUser(response.data);
        }
      } catch (error) {
        // error fetching logged in user
      }
      setShowContent(true);
    };

    fetchSubreddit();
    fetchPost();
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    document.title = post ? `Edit Post - ${post.title}` : "Edit Post";
  }, [post]);

  if (!showContent) {
    return <></>;
  }

  if (!post) {
    return (
      <div className={styles.container}>
        <h1 className={`${styles.heading} ${styles.white} ${styles.center}`}>
          Post does not exist
        </h1>
      </div>
    );
  }

  if (!subreddit) {
    return <h2 className={styles.nfHeading}>Subreddit not found</h2>;
  }

  return (
    <div className={styles.container}>
      <Link to={`/r/${subreddit.name}`} className={styles.subLink}>
        <h1 className={`${styles.heading} ${styles.orange} ${styles.center}`}>
          r/{subreddit.name}
        </h1>
      </Link>
      {!loggedInUser ? (
        <p className={`${styles.text} ${styles.white} ${styles.center}`}>
          Must be{" "}
          <Link to={"/auth/login"} className={styles.loginLink}>
            logged in
          </Link>{" "}
          to edit a post
        </p>
      ) : (
        <>
          {loggedInUser._id === post.user?._id ? (
            <EditPostForm post={post} subreddit={subreddit} />
          ) : (
            <h2 className={`${styles.text} ${styles.white} ${styles.center}`}>
              You do not have permission to edit this post
            </h2>
          )}
        </>
      )}
    </div>
  );
}

export default EditPost;
