import { useEffect, useState } from "react";
import { Subreddit, User } from "../../types/types";
import { Link, useLocation } from "react-router-dom";
import { extractUsername, getTimeAgo } from "../../utils/utils";
import {
  getLoggedInUser,
  getUserByUsername,
  getUserSubredditCount,
  getUserSubreddits,
} from "../../api";
import ProfileOptions from "../../components/ProfileOptions/ProfileOptions";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import SubredditList from "../../components/SubredditList/SubredditList";

import styles from "./UserSubreddits.module.css";

function UserSubreddits() {
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [user, setUser] = useState<User>();
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [subredditCount, setSubredditCount] = useState(0);

  const location = useLocation();
  const url = location.pathname;
  const searchParams = location.search;
  const username = extractUsername(url);

  const timeAgo = user ? getTimeAgo(user.createdAt) : "";

  useEffect(() => {
    document.title = `${username}'s Subreddits`;

    const fetchUser = async () => {
      try {
        const response = await getUserByUsername(username);
        setUser(response);
      } catch (error: any) {
        // error fetching user
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

    fetchUser();
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchUserSubreddits = async () => {
      try {
        const response = await getUserSubreddits(user!._id, searchParams);
        setSubreddits(response.data);
      } catch (error: any) {
        // error fetching user's subreddits
      }
    };

    const fetchUserSubredditCount = async () => {
      try {
        const response = await getUserSubredditCount(user!._id);
        const count = parseInt(response.headers["total-subreddit-count"]);
        setSubredditCount(count);
      } catch (error: any) {
        // error fetching user's subreddit count
      }
    };

    fetchUserSubreddits();
    fetchUserSubredditCount();
  }, [user]);

  if (!user) {
    return (
      <h2 className={`${styles.heading} ${styles.white} ${styles.notFound}`}>
        User not found
      </h2>
    );
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
