import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Subreddit, User } from "../../types/types";
import { extractUsername, getTimeAgo } from "../../utils/utils";
import {
  getUserByUsername,
  getUserSubredditCount,
  getUserSubreddits,
} from "../../api";
import ProfileOptions from "../../components/ProfileOptions/ProfileOptions";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import SubredditList from "../../components/SubredditList/SubredditList";
import UserNotFound from "../../components/UserNotFound/UserNotFound";

import styles from "./UserSubreddits.module.css";

function UserSubreddits() {
  const [user, setUser] = useState<User>();
  const [userFetched, setUserFetched] = useState(false);
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [subredditsFetched, setSubredditsFetched] = useState(false);
  const [subredditCount, setSubredditCount] = useState(0);
  const [subredditCountFetched, setSubredditCountFetched] = useState(false);

  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  const url = location.pathname;
  const searchParams = location.search;
  const username = extractUsername(url);

  const timeAgo = user ? getTimeAgo(user.createdAt) : "";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserByUsername(username);
        setUser(response);
      } catch (error: any) {
        // error fetching user
      } finally {
        setUserFetched(true);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!userFetched) {
      return;
    }

    document.title = user ? `${user.username}'s Subreddits` : "User Not Found";

    const fetchUserSubreddits = async () => {
      try {
        const response = await getUserSubreddits(user!._id, searchParams);
        setSubreddits(response.data);
      } catch (error: any) {
        // error fetching user's subreddits
      } finally {
        setSubredditsFetched(true);
      }
    };

    const fetchUserSubredditCount = async () => {
      try {
        const response = await getUserSubredditCount(user!._id);
        const count = parseInt(response.headers["total-subreddit-count"]);
        setSubredditCount(count);
      } catch (error: any) {
        // error fetching user's subreddit count
      } finally {
        setSubredditCountFetched(true);
      }
    };

    fetchUserSubreddits();
    fetchUserSubredditCount();
  }, [user, !userFetched, searchParams]);

  if (
    !authFetched ||
    !userFetched ||
    !subredditsFetched ||
    !subredditCountFetched
  ) {
    return <></>;
  }

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <div className={styles.container}>
      <Link to={`/u/${user.username}`} className={styles.userLink}>
        <h1 className={styles.heading}>u/{user.username}</h1>
      </Link>
      <h3 className={styles.subHeading}>Joined {timeAgo}</h3>
      <ProfileOptions user={user} loggedInUser={loggedInUser} />

      <SortingOptions searchParams={searchParams} type={""} />
      <Pagination searchParams={searchParams} count={Number(subredditCount)} />

      {subreddits.length < 1 ? (
        <h2 className={`${styles.heading} ${styles.mt45} ${styles.white}`}>
          User has no subreddits
        </h2>
      ) : (
        <SubredditList subreddits={subreddits} user={user} />
      )}
    </div>
  );
}

export default UserSubreddits;
