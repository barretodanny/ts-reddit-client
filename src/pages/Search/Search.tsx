import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Post, Subreddit, User } from "../../types/types";
import {
  getSearchQueryParam,
  getSearchTypeQueryParam,
} from "../../utils/utils";
import {
  getPostCount,
  getPosts,
  getSubredditCount,
  getSubreddits,
  getUserCount,
  getUsers,
} from "../../api";

import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import PostList from "../../components/PostList/PostList";
import UserList from "../../components/UserList/UserList";
import SubredditList from "../../components/SubredditList/SubredditList";
import TypeOptions from "../../components/TypeOptions/TypeOptions";

import styles from "./Search.module.css";

function Search() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsFetched, setPostsFetched] = useState(false);
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [subredditsFetched, setSubredditsFetched] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [usersFetched, setUsersFetched] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [postCountFetched, setPostCountFetched] = useState(false);
  const [subredditCount, setSubredditCount] = useState(0);
  const [subredditCountFetched, setSubredditCountFetched] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [userCountFetched, setUserCountFetched] = useState(false);

  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  const searchParams = location.search;

  const search = getSearchQueryParam(searchParams);
  const type = getSearchTypeQueryParam(searchParams);

  useEffect(() => {
    setPosts([]);
    setPostsFetched(false);
    setPostCount(0);
    setPostCountFetched(false);
    setSubreddits([]);
    setSubredditsFetched(false);
    setSubredditCount(0);
    setSubredditCountFetched(false);
    setUsers([]);
    setUsersFetched(false);
    setUserCount(0);
    setUserCountFetched(false);
  }, [search, type]);

  useEffect(() => {
    document.title = search ? `Search result - ${search}` : "Search";

    const fetchData = async () => {
      try {
        let response;
        switch (type) {
          case "posts":
            response = await getPosts(searchParams);
            setPosts(response.data);
            break;
          case "subreddits":
            response = await getSubreddits(searchParams);
            setSubreddits(response.data);
            break;
          case "users":
            response = await getUsers(searchParams);
            setUsers(response.data);
            break;
          default:
            break;
        }
      } catch (error: any) {
        // error fetching data
      } finally {
        switch (type) {
          case "posts":
            setPostsFetched(true);
            break;
          case "subreddits":
            setSubredditsFetched(true);
            break;
          case "users":
            setUsersFetched(true);
            break;
        }
      }
    };

    const fetchDataCount = async () => {
      try {
        let response;
        let count = 0;
        switch (type) {
          case "posts":
            response = await getPostCount(searchParams);
            count = parseInt(response.headers["total-post-count"]);
            setPostCount(count);
            break;
          case "subreddits":
            response = await getSubredditCount(searchParams);
            count = parseInt(response.headers["total-subreddit-count"]);
            setSubredditCount(count);
            break;
          case "users":
            response = await getUserCount(searchParams);
            count = parseInt(response.headers["total-user-count"]);
            setUserCount(count);
            break;
          default:
            break;
        }
      } catch (error: any) {
        // error fetching data count
      } finally {
        switch (type) {
          case "posts":
            setPostCountFetched(true);
            break;
          case "subreddits":
            setSubredditCountFetched(true);
            break;
          case "users":
            setUserCountFetched(true);
            break;
        }
      }
    };

    fetchData();
    fetchDataCount();
  }, [searchParams]);

  if (!authFetched) {
    return <></>;
  }

  if (type === "posts" && (!postsFetched || !postCountFetched)) {
    return <></>;
  } else if (
    type === "subreddits" &&
    (!subredditsFetched || !subredditCountFetched)
  ) {
    return <></>;
  } else if (type === "users" && (!usersFetched || !userCountFetched)) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <h1 className={`${styles.heading} ${styles.white}`}>Searching {type}</h1>
      {search ? (
        <h3
          className={`${styles.white} ${styles.searchTerm} ${styles.subHeading}`}
        >
          Search term: {search}
        </h3>
      ) : (
        <h3 className={`${styles.white} ${styles.searchTerm}`}>
          Enter search term above
        </h3>
      )}
      <SortingOptions
        searchParams={searchParams}
        type={type === "posts" ? "points" : ""}
      />
      <TypeOptions searchParams={searchParams} />
      <Pagination
        searchParams={searchParams}
        count={
          type === "posts"
            ? postCount
            : type === "subreddits"
            ? subredditCount
            : userCount
        }
      />

      <>
        {type === "posts" &&
          (postCount > 0 ? (
            <PostList posts={posts} loggedInUser={loggedInUser} />
          ) : (
            <>
              {search && (
                <h2 className={`${styles.white} ${styles.notFound}`}>
                  No {type} found matching search term
                </h2>
              )}
            </>
          ))}
        {type === "subreddits" &&
          (subredditCount > 0 ? (
            <SubredditList subreddits={subreddits} />
          ) : (
            <>
              {search && (
                <h2 className={`${styles.white} ${styles.notFound}`}>
                  No {type} found matching search term
                </h2>
              )}
            </>
          ))}
        {type === "users" &&
          (userCount > 0 ? (
            <UserList users={users} />
          ) : (
            <>
              {search && (
                <h2 className={`${styles.white} ${styles.notFound}`}>
                  No {type} found matching search term
                </h2>
              )}
            </>
          ))}
      </>
    </div>
  );
}

export default Search;
