import { useEffect, useState } from "react";
import { Post, Subreddit, User } from "../../types/types";
import { Link, useLocation } from "react-router-dom";
import { extractSubredditName, getSearchQueryParam } from "../../utils/utils";
import {
  getLoggedInUser,
  getSubredditByName,
  getSubredditPostCount,
  getSubredditPosts,
} from "../../api";
import SearchBar from "../../components/SearchBar/SearchBar";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import PostList from "../../components/PostList/PostList";

import styles from "./SearchSubreddit.module.css";

function SearchSubreddit() {
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [subreddit, setSubreddit] = useState<Subreddit>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const location = useLocation();
  const searchParams = location.search;
  const url = location.pathname;
  const search = getSearchQueryParam(searchParams);
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

    fetchSubreddit();
  }, []);

  useEffect(() => {
    document.title = search
      ? `${subredditName}: Search result - ${search}`
      : `${subredditName}: Search`;

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
        const count = parseInt(response.headers["total-post-count"]);
        setPostCount(count);
      } catch (error: any) {
        // error fetching post count
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
    return <h2 className={styles.nfHeading}>Subreddit not found</h2>;
  }

  return (
    <div className={styles.container}>
      <Link to={`/r/${subreddit.name}`} className={styles.subLink}>
        <h1 className={`${styles.heading} ${styles.orange}`}>
          r/{subreddit.name}
        </h1>
      </Link>
      {search ? (
        <h3 className={`${styles.white} ${styles.searchTerm}`}>
          Search term: {search}
        </h3>
      ) : (
        <h3 className={`${styles.white} ${styles.searchTerm}`}>
          Enter search term below
        </h3>
      )}
      <SearchBar subreddit={subreddit} />
      {posts.length > 0 ? (
        <>
          <SortingOptions searchParams={searchParams} type={"points"} />
          <Pagination searchParams={searchParams} count={postCount} />
          <PostList posts={posts} loggedInUser={loggedInUser} />
        </>
      ) : (
        <>
          {search && (
            <h2 className={`${styles.white} ${styles.notFound}`}>
              No posts found in r/{subreddit.name} matching search term
            </h2>
          )}
        </>
      )}
    </div>
  );
}

export default SearchSubreddit;
