import { useEffect, useState } from "react";
import { Post as PostType, Subreddit, User } from "../../types/types";
import { Link, useLocation } from "react-router-dom";
import { extractPostId, extractSubredditName } from "../../utils/utils";
import { getLoggedInUser, getPostById, getSubredditByName } from "../../api";

import SortingOptions from "../../components/SortingOptions/SortingOptions";
import PostComponent from "../../components/Post/Post";
import CommentsWrapper from "../../components/CommentsWrapper/CommentsWrapper";

import styles from "./Post.module.css";

function Post() {
  const [subreddit, setSubreddit] = useState<Subreddit>();
  const [post, setPost] = useState<PostType>();
  const [loggedInUser, setLoggedInUser] = useState<User>();

  const location = useLocation();
  const url = location.pathname;
  const searchParams = location.search;
  const subredditName = extractSubredditName(url);
  const postId = extractPostId(url);

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
        setLoggedInUser(response.data);
      } catch (error: any) {
        // error fetching logged in user
      }
    };

    fetchSubreddit();
    fetchPost();
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    if (subreddit) {
      document.title = post
        ? `${subreddit.name} - ${post.title}`
        : "Post not found";
    }
  }, [post]);

  if (!subreddit) {
    return (
      <div className={styles.container}>
        <h1 className={`${styles.heading} ${styles.white} ${styles.center}`}>
          Subreddit does not exist
        </h1>
      </div>
    );
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

  return (
    <div className={styles.container}>
      <Link to={`/r/${subreddit.name}`} className={styles.subLink}>
        <h1 className={`${styles.heading} ${styles.orange}`}>
          r/{subreddit.name}
        </h1>
      </Link>
      <PostComponent
        post={post}
        subreddit={subreddit}
        loggedInUser={loggedInUser}
      />
      <SortingOptions searchParams={searchParams} type={"points"} />
      <div style={{ height: 1, backgroundColor: "#444" }}></div>
      <CommentsWrapper post={post} loggedInUser={loggedInUser} />
    </div>
  );
}

export default Post;
