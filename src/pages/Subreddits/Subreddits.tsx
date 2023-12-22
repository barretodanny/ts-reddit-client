import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Subreddit, User } from "../../types/types";
import { getLoggedInUser, getSubredditCount, getSubreddits } from "../../api";

import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import SubredditList from "../../components/SubredditList/SubredditList";

import styles from "./Subreddits.module.css";

function Subreddits() {
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [subredditCount, setSubredditCount] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [showContent, setShowContent] = useState(false);

  const location = useLocation();
  const searchParams = location.search;

  useEffect(() => {
    document.title = "Subreddits";

    const fetchSubreddits = async () => {
      try {
        const response = await getSubreddits(searchParams);
        setSubreddits(response.data);
      } catch (error: any) {
        // error fetching subreddits
      }
    };

    const fetchSubredditCount = async () => {
      try {
        const response = await getSubredditCount();
        const count = parseInt(response.headers["total-subreddit-count"]) || 0;
        setSubredditCount(count);
      } catch (error: any) {
        // error fetching subreddit count
      }
      setShowContent(true);
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

    fetchSubreddits();
    fetchSubredditCount();
    fetchLoggedInUser();
  }, [searchParams]);

  if (!showContent) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Subreddits</h1>
      <SortingOptions searchParams={searchParams} type={""} />
      <Pagination searchParams={searchParams} count={subredditCount} />
      {loggedInUser ? (
        <Link to={"/subreddits/create"} className={styles.createBtn}>
          Create Subreddit
        </Link>
      ) : (
        <h3 className={styles.white}>
          <Link to={"/auth/login"} className={`${styles.link} ${styles.login}`}>
            Log in
          </Link>{" "}
          or{" "}
          <Link
            to={"/auth/register"}
            className={`${styles.link} ${styles.register}`}
          >
            Register
          </Link>{" "}
          to create a subreddit
        </h3>
      )}
      {subreddits.length > 0 ? (
        <SubredditList subreddits={subreddits} />
      ) : (
        <h2 className={`${styles.heading} ${styles.notFound}`}>
          No subreddits found
        </h2>
      )}
    </div>
  );
}

export default Subreddits;
