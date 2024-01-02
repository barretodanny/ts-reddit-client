import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { User as UserType } from "../../types/types";
import { extractUsername, getTimeAgo } from "../../utils/utils";
import { getUserByUsername } from "../../api";

import ProfileOptions from "../../components/ProfileOptions/ProfileOptions";

import styles from "./User.module.css";

function User() {
  const [user, setUser] = useState<UserType>();
  const [userFetched, setUserFetched] = useState(false);

  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  const url = location.pathname;
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

    document.title = user ? `${user.username}'s Profile` : "User Not Found";
  }, [user, userFetched]);

  if (!authFetched || !userFetched) {
    return <></>;
  }

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
