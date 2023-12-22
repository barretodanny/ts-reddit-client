import { useEffect, useState } from "react";
import { Post, Subreddit, User } from "../../types/types";
import { useLocation } from "react-router-dom";
import {
  getSearchQueryParam,
  getSearchTypeQueryParam,
} from "../../utils/utils";
import {
  getLoggedInUser,
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
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [subredditCount, setSubredditCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const location = useLocation();
  const searchParams = location.search;

  const search = getSearchQueryParam(searchParams);
  const type = getSearchTypeQueryParam(searchParams);

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
      }
      setShowContent(true);
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
    };

    fetchData();
    fetchDataCount();
    fetchLoggedInUser();
  }, [searchParams]);

  if (!showContent) {
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
