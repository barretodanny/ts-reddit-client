import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Post, Subreddit } from "../../types/types";
import { extractSubredditName, getSearchQueryParam } from "../../utils/utils";
import {
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
  const [subreddit, setSubreddit] = useState<Subreddit>();
  const [subredditFetched, setSubredditFetched] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsFetched, setPostsFetched] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [postCountFetched, setPostCountFetched] = useState(false);

  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );
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

    document.title = subreddit
      ? search
        ? `${subreddit.name}: Search result - ${search}`
        : `${subreddit.name}: Search`
      : "Subreddit Not Found";

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
        const count = parseInt(response.headers["total-post-count"]);
        setPostCount(count);
      } catch (error: any) {
        // error fetching post count
      } finally {
        setPostCountFetched(true);
      }
    };

    fetchPosts();
    fetchPostCount();
  }, [searchParams, subreddit, subredditFetched]);

  if (!authFetched || !subredditFetched || !postsFetched || !postCountFetched) {
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
