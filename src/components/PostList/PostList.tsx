import React from "react";
import { Post, User } from "../../types/types";
import PostItem from "../PostItem/PostItem";

import styles from "./PostList.module.css";

interface PostListProps {
  posts: Post[];
  loggedInUser: User | undefined;
  user?: User;
}

function PostList({ posts, loggedInUser, user }: PostListProps) {
  if (!posts) {
    return <div>No posts found</div>;
  }

  return (
    <div className={styles.container}>
      {user && (
        <>
          <h3 className={styles.subHeading}>Viewing Posts made by</h3>
          <span className={styles.name}>{user.username}</span>
        </>
      )}
      {posts.map((post: Post) => {
        return (
          <>
            <PostItem key={post._id} post={post} loggedInUser={loggedInUser} />
          </>
        );
      })}
    </div>
  );
}

export default PostList;
