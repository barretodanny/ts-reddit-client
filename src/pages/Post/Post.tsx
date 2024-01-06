import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Post as PostType, Subreddit } from "../../types/types";
import { extractPostId, extractSubredditName } from "../../utils/utils";
import { getPostById, getSubredditByName } from "../../api";

import SortingOptions from "../../components/SortingOptions/SortingOptions";
import PostComponent from "../../components/Post/Post";
import CommentsWrapper from "../../components/CommentsWrapper/CommentsWrapper";
import SubredditNotFound from "../../components/SubredditNotFound/SubredditNotFound";
import PostNotFound from "../../components/PostNotFound/PostNotFound";

import styles from "./Post.module.css";

function Post() {
  const [subreddit, setSubreddit] = useState<Subreddit>();
  const [subredditFetched, setSubredditFetched] = useState(false);
  const [post, setPost] = useState<PostType>();
  const [postFetched, setPostFetched] = useState(false);

  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );
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
    if (!subredditFetched) {
      return;
    }

    document.title = subreddit
      ? post
        ? `${subreddit.name} - ${post.title}`
        : "Post Not Found"
      : "Subreddit Not Found";
  }, [post, subreddit, subredditFetched]);

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
