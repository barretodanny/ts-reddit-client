import { useEffect, useState } from "react";
import { User as UserType } from "../../types/types";
import { useLocation } from "react-router-dom";
import { extractUsername, getTimeAgo } from "../../utils/utils";
import { getLoggedInUser, getUserByUsername } from "../../api";

import styles from "./User.module.css";
import ProfileOptions from "../../components/ProfileOptions/ProfileOptions";

function User() {
  const [loggedInUser, setLoggedInUser] = useState<UserType>();
  const [user, setUser] = useState<UserType>();

  const location = useLocation();
  const url = location.pathname;
  const username = extractUsername(url);

  const timeAgo = user ? getTimeAgo(user.createdAt) : "";

  useEffect(() => {
    document.title = `${username}'s Profile`;

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

  if (!user) {
    return (
      <h2 className={`${styles.heading} ${styles.notFound}`}>User not found</h2>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={`${styles.heading} ${styles.name}`}>u/{user.username}</h1>
      <h3 className={styles.subHeading}>Joined {timeAgo}</h3>
      <ProfileOptions user={user} loggedInUser={loggedInUser} />
    </div>
  );
}

export default User;
