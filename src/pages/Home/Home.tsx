import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Post } from "../../types/types";
import { getPosts, getPostCount } from "../../api";

import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import PostList from "../../components/PostList/PostList";

import styles from "./Home.module.css";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsFetched, setPostsFetched] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [postCountFetched, setPostCountFetched] = useState(false);

  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  const searchParams = location.search;

  useEffect(() => {
    document.title = "Reddit - Home";
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts(searchParams);
        setPosts(response.data);
      } catch (error: any) {
        // error fetching posts
      } finally {
        setPostsFetched(true);
      }
    };

    const fetchPostCount = async () => {
      try {
        const response = await getPostCount();
        const count = parseInt(response.headers["total-post-count"]) || 0;
        setPostCount(count);
      } catch (error: any) {
        // error fetching posts count
      } finally {
        setPostCountFetched(true);
      }
    };

    fetchPosts();
    fetchPostCount();
  }, [searchParams]);

  if (!postsFetched || !postCountFetched || !authFetched) {
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
