import { useEffect, useState } from "react";
import { Post, Subreddit as SubredditType, User } from "../../types/types";
import { useLocation } from "react-router-dom";
import { extractSubredditName } from "../../utils/utils";
import {
  getLoggedInUser,
  getSubredditByName,
  getSubredditPostCount,
  getSubredditPosts,
} from "../../api";

import styles from "./Subreddit.module.css";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import SecondaryOptions from "../../components/SecondaryOptions/SecondaryOptions";
import PostList from "../../components/PostList/PostList";

function Subreddit() {
  const [subreddit, setSubreddit] = useState<SubredditType>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [showContent, setShowContent] = useState(false);

  const location = useLocation();
  const url = location.pathname;
  const subredditName = extractSubredditName(url);
  const searchParams = location.search;

  useEffect(() => {
    document.title = subredditName ? subredditName : "Not found";

    const fetchSubreddit = async () => {
      try {
        const response = await getSubredditByName(subredditName);
        setSubreddit(response);
      } catch (error: any) {
        // error fetching subreddit
      }
    };

    fetchSubreddit();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getSubredditPosts(subreddit!._id, searchParams);
        setPosts(response.data);
      } catch (error: any) {
        // error fetching posts
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

    fetchPosts();
    fetchPostCount();
    fetchLoggedInUser();
  }, [searchParams, subreddit]);

  if (!showContent) {
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
        <div>No posts found</div>
      )}
    </div>
  );
}

export default Subreddit;
