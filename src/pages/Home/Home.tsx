import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Post, User } from "../../types/types";
import { getLoggedInUser, getPosts, getPostCount } from "../../api";

import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";

import styles from "./Home.module.css";
import PostList from "../../components/PostList/PostList";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [showContent, setShowContent] = useState(false);

  const location = useLocation();
  const searchParams = location.search;

  useEffect(() => {
    const abortController = new AbortController();
    document.title = "Reddit - Home";

    const fetchPosts = async () => {
      try {
        const response = await getPosts(searchParams);
        setPosts(response.data);
      } catch (error: any) {
        // error fetching posts
      }
    };

    const fetchPostsCount = async () => {
      try {
        const response = await getPostCount();
        const count = parseInt(response.headers["total-post-count"]) || 0;
        setPostCount(count);
      } catch (error: any) {
        // error fetching posts count
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

    fetchPosts();
    fetchPostsCount();
    fetchLoggedInUser();

    return () => {
      abortController.abort();
    };
  }, [searchParams]);

  if (!showContent) {
    return <></>;
  }

  return (
    <main className={styles.container}>
      <h1 className={`${styles.heading} ${styles.title}`}>All Posts</h1>
      <SortingOptions searchParams={searchParams} type={"points"} />
      <Pagination searchParams={searchParams} count={postCount} />
      {posts.length > 0 ? (
        <PostList posts={posts} loggedInUser={loggedInUser} />
      ) : (
        <h2 className={`${styles.heading} ${styles.notFound}`}>
          No posts found
        </h2>
      )}
    </main>
  );
}

export default Home;
