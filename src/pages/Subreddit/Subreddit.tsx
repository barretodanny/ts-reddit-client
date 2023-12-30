import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Post, Subreddit as SubredditType } from "../../types/types";
import { extractSubredditName } from "../../utils/utils";
import {
  getSubredditByName,
  getSubredditPostCount,
  getSubredditPosts,
} from "../../api";

import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import SecondaryOptions from "../../components/SecondaryOptions/SecondaryOptions";
import PostList from "../../components/PostList/PostList";

import styles from "./Subreddit.module.css";

function Subreddit() {
  const [subreddit, setSubreddit] = useState<SubredditType>();
  const [subredditFetched, setSubredditFetched] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsFetched, setPostsFetched] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [postCountFetched, setPostCountFetched] = useState(false);

  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  const url = location.pathname;
  const subredditName = extractSubredditName(url);
  const searchParams = location.search;

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

    fetchSubreddit();
  }, []);

  useEffect(() => {
    if (!subredditFetched) {
      return;
    }

    document.title = subreddit ? `${subreddit.name}` : "Subreddit Not Found";

    const fetchPosts = async () => {
      try {
        const response = await getSubredditPosts(subreddit!._id, searchParams);
        setPosts(response.data);
      } catch (error: any) {
        // error fetching posts
      } finally {
        setPostsFetched(true);
      }
    };

    const fetchPostCount = async () => {
      try {
        const response = await getSubredditPostCount(
          subreddit!._id,
          searchParams
        );
        const count = parseInt(response.headers["total-post-count"]) || 0;
        setPostCount(count);
      } catch (error: any) {
        // error fetching posts count
      } finally {
        setPostCountFetched(true);
      }
    };

    fetchPosts();
    fetchPostCount();
  }, [searchParams, subreddit, subredditFetched]);

  if (!subredditFetched || !postsFetched || !postCountFetched || !authFetched) {
    return <></>;
  }

  if (!subreddit) {
    return (
      <h2 className={`${styles.heading} ${styles.notFound}`}>
        Subreddit not found
      </h2>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={`${styles.heading} ${styles.orange}`}>
        r/{subreddit.name}
      </h1>
      <SortingOptions searchParams={searchParams} type={"points"} />
      <Pagination searchParams={searchParams} count={postCount} />
      <SecondaryOptions subreddit={subreddit} loggedInUser={loggedInUser} />
      {posts.length > 0 ? (
        <PostList posts={posts} loggedInUser={loggedInUser} />
      ) : (
        <h2 className={`${styles.subHeading} ${styles.notFound}`}>
          No posts found
        </h2>
      )}
    </div>
  );
}

export default Subreddit;
