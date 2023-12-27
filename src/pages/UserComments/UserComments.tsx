import { useEffect, useState } from "react";
import { Comment, User } from "../../types/types";
import { Link, useLocation } from "react-router-dom";
import { extractUsername, getTimeAgo } from "../../utils/utils";
import {
  getLoggedInUser,
  getUserByUsername,
  getUserCommentCount,
  getUserComments,
} from "../../api";

import ProfileOptions from "../../components/ProfileOptions/ProfileOptions";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import UserCommentList from "../../components/UserCommentList/UserCommentList";

import styles from "./UserComments.module.css";

function UserComments() {
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [user, setUser] = useState<User>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(0);

  const location = useLocation();
  const url = location.pathname;
  const searchParams = location.search;
  const username = extractUsername(url);

  const timeAgo = user ? getTimeAgo(user.createdAt) : "";

  useEffect(() => {
    document.title = `${username}'s Comments`;

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
    const fetchUserComments = async () => {
      try {
        const response = await getUserComments(user!._id, searchParams);
        setComments(response.data);
      } catch (error: any) {
        // error fetching user's comments
      }
    };

    const fetchUserCommentCount = async () => {
      try {
        const response = await getUserCommentCount(user!._id);
        const count = parseInt(response.headers["total-comment-count"]) || 0;
        setCommentCount(count);
      } catch (error: any) {
        // error fetching user's comment count
      }
    };

    fetchUserComments();
    fetchUserCommentCount();
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
      <Pagination searchParams={searchParams} count={Number(commentCount)} />

      {comments.length < 1 ? (
        <h2 className={`${styles.heading} ${styles.mt45} ${styles.white}`}>
          User has no comments
        </h2>
      ) : (
        <UserCommentList comments={comments} user={user} />
      )}
    </div>
  );
}

export default UserComments;
