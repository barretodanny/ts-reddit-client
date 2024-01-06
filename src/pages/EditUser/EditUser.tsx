import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link, useLocation } from "react-router-dom";
import { User } from "../../types/types";
import { extractUsername } from "../../utils/utils";
import { getUserByUsername } from "../../api";

import EditUserForm from "../../components/EditUserForm/EditUserForm";

import styles from "./EditUser.module.css";

function EditUser() {
  const [user, setUser] = useState<User>();
  const [userFetched, setUserFetched] = useState(false);

  const { loggedInUser, authFetched } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  const url = location.pathname;
  const username = extractUsername(url);

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

    document.title = user ? `Edit ${username}'s Profile` : "User Not Found";
  }, [user, userFetched]);

  if (!authFetched || !userFetched) {
    return <></>;
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <h1 className={`${styles.heading} ${styles.white} ${styles.center}`}>
          User does not exist
        </h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to={`/u/${user.username}`} className={styles.userLink}>
        <h1 className={`${styles.heading} ${styles.center}`}>
          u/{user.username}
        </h1>
      </Link>
      {!loggedInUser ? (
        <p className={`${styles.text} ${styles.white} ${styles.center}`}>
          Must be{" "}
          <Link to={"/auth/login"} className={styles.loginLink}>
            logged in
          </Link>{" "}
          to edit a user
        </p>
      ) : (
        <>
          {loggedInUser._id === user._id ? (
            <EditUserForm user={user} />
          ) : (
            <p className={`${styles.text} ${styles.warning} ${styles.center}`}>
              You do not have permission to edit this user
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default EditUser;
