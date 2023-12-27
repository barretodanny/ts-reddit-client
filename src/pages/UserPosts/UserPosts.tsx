import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Post, User } from "../../types/types";
import { extractUsername, getTimeAgo } from "../../utils/utils";
import {
  getLoggedInUser,
  getUserByUsername,
  getUserPostCount,
  getUserPosts,
} from "../../api";
import ProfileOptions from "../../components/ProfileOptions/ProfileOptions";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import PostList from "../../components/PostList/PostList";

import styles from "./UserPosts.module.css";

function UserPosts() {
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postCount, setPostCount] = useState(0);

  const location = useLocation();
  const url = location.pathname;
  const searchParams = location.search;
  const username = extractUsername(url);

  const timeAgo = user ? getTimeAgo(user.createdAt) : "";

  useEffect(() => {
    document.title = `${username}'s Posts`;

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
    const fetchUserPosts = async () => {
      try {
        const response = await getUserPosts(user!._id, searchParams);
        setPosts(response.data);
      } catch (error: any) {
        // error fetching user's comments
      }
    };

    const fetchUserPostCount = async () => {
      try {
        const response = await getUserPostCount(user!._id);
        const count = parseInt(response.headers["total-post-count"]) || 0;
        setPostCount(count);
      } catch (error: any) {
        // error fetching user's comment count
      }
    };

    fetchUserPosts();
    fetchUserPostCount();
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

      <SortingOptions searchParams={searchParams} type={"points"} />
      <Pagination searchParams={searchParams} count={Number(postCount)} />

      {posts.length < 1 ? (
        <h2 className={`${styles.heading} ${styles.mt45} ${styles.white}`}>
          User has no posts
        </h2>
      ) : (
        <PostList posts={posts} loggedInUser={loggedInUser} user={user} />
      )}
    </div>
  );
}

export default UserPosts;
