import { useEffect, useState } from "react";
import { User } from "../../types/types";
import { Link, useLocation } from "react-router-dom";
import { extractUsername } from "../../utils/utils";
import { getLoggedInUser, getUserByUsername } from "../../api";

import EditUserForm from "../../components/EditUserForm/EditUserForm";

import styles from "./EditUser.module.css";

function EditUser() {
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [user, setUser] = useState<User>();

  const location = useLocation();
  const url = location.pathname;
  const username = extractUsername(url);

  useEffect(() => {
    document.title = `Edit ${username}'s Profile`;

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
