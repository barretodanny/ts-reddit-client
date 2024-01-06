import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Comment, Post, User } from "../../types/types";
import { getPostComments } from "../../api";

import CommentList from "../CommentList/CommentList";
import CreateCommentForm from "../CreateCommentForm/CreateCommentForm";

import styles from "./CommentsWrapper.module.css";

interface CommentsWrapperProps {
  post: Post;
  loggedInUser: User | undefined;
}

function CommentsWrapper({ post, loggedInUser }: CommentsWrapperProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsFetched, setCommentsFetched] = useState(false);
  const [newComments, setNewComments] = useState<Comment[]>([]);

  const location = useLocation();
  const searchParams = location.search;

  useEffect(() => {
    setNewComments([]);

    getPostComments(post._id, searchParams).then((data) => {
      setComments(data.data);
      setCommentsFetched(true);
    });
  }, [post._id, searchParams]);

  if (!commentsFetched) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      {comments.length < 1 && newComments.length < 1 && (
        <h2 className={`${styles.heading} ${styles.mt45}`}>
          Nobody has commented on this post
        </h2>
      )}
      {loggedInUser && (
        <CreateCommentForm
          post={post}
          loggedInUser={loggedInUser}
          // @ts-ignore
          setComments={setComments}
        />
      )}
      {/* Render the newly created comments first if any */}
      <CommentList
        comments={newComments}
        loggedInUser={loggedInUser}
        depth={0}
        fetched={false}
      />
      {/* Render the fetched comments */}
      <CommentList
        comments={comments}
        loggedInUser={loggedInUser}
        depth={0}
        fetched={true}
      />
    </div>
  );
}

export default CommentsWrapper;
