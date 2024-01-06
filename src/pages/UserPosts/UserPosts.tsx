import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Post, User } from "../../types/types";
import { extractUsername, getTimeAgo } from "../../utils/utils";
import { getUserByUsername, getUserPostCount, getUserPosts } from "../../api";
import ProfileOptions from "../../components/ProfileOptions/ProfileOptions";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import PostList from "../../components/PostList/PostList";

import styles from "./UserPosts.module.css";
import UserNotFound from "../../components/UserNotFound/UserNotFound";

function UserPosts() {
  const [user, setUser] = useState<User>();
  const [userFetched, setUserFetched] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsFetched, setPostsFetched] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [postCountFetched, setPostCountFetched] = useState(false);

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

    document.title = user ? `${user.username}'s Posts` : "User Not Found";

    const fetchUserPosts = async () => {
      try {
        const response = await getUserPosts(user!._id, searchParams);
        setPosts(response.data);
      } catch (error: any) {
        // error fetching user's comments
      } finally {
        setPostsFetched(true);
      }
    };

    const fetchUserPostCount = async () => {
      try {
        const response = await getUserPostCount(user!._id);
        const count = parseInt(response.headers["total-post-count"]) || 0;
        setPostCount(count);
      } catch (error: any) {
        // error fetching user's comment count
      } finally {
        setPostCountFetched(true);
      }
    };

    fetchUserPosts();
    fetchUserPostCount();
  }, [user, userFetched, searchParams]);

  if (!authFetched || !userFetched || !postsFetched || !postCountFetched) {
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
