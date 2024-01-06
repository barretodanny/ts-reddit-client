import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Post, Subreddit } from "../../types/types";
import { extractPostId, extractSubredditName } from "../../utils/utils";
import { getPostById, getSubredditByName } from "../../api";

import EditPostForm from "../../components/EditPostForm/EditPostForm";
import SubredditNotFound from "../../components/SubredditNotFound/SubredditNotFound";
import PostNotFound from "../../components/PostNotFound/PostNotFound";

import styles from "./EditPost.module.css";

function EditPost() {
  const [subreddit, setSubreddit] = useState<Subreddit>();
  const [subredditFetched, setSubredditFetched] = useState(false);
  const [post, setPost] = useState<Post>();
  const [postFetched, setPostFetched] = useState(false);

  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );
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
      } finally {
        setSubredditFetched(true);
      }
    };

    const fetchPost = async () => {
      try {
        const response = await getPostById(postId);
        setPost(response.data);
      } catch (error: any) {
        // error fetching post
      } finally {
        setPostFetched(true);
      }
    };

    fetchSubreddit();
    fetchPost();
  }, []);

  useEffect(() => {
    if (!subredditFetched || !postFetched) {
      return;
    }

    document.title = subreddit
      ? post
        ? `Edit Post - ${post.title}`
        : "Post Not Found"
      : "Subreddit Not Found";
    document.title = post ? `Edit Post - ${post.title}` : "Edit Post";
  }, [post, subreddit, postFetched, subredditFetched]);

  if (!authFetched || !subredditFetched || !postFetched) {
    return <></>;
  }

  if (!subreddit) {
    return <SubredditNotFound />;
  }

  if (!post) {
    return <PostNotFound />;
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
