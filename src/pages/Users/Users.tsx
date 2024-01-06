import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { User } from "../../types/types";
import { getUserCount, getUsers } from "../../api";

import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import UserList from "../../components/UserList/UserList";

import styles from "./Users.module.css";

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [usersFetched, setUsersFetched] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [userCountFetched, setUserCountFetched] = useState(false);

  const { authFetched } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const searchParams = location.search;

  useEffect(() => {
    document.title = "Users";

    const fetchUsers = async () => {
      try {
        const response = await getUsers(searchParams);
        setUsers(response.data);
      } catch (error: any) {
        // error fetching users
      } finally {
        setUsersFetched(true);
      }
    };

    const fetchUserCount = async () => {
      try {
        const response = await getUserCount();
        const count = parseInt(response.headers["total-user-count"]);
        setUserCount(count);
      } catch (error: any) {
        // error fetching users count
      } finally {
        setUserCountFetched(true);
      }
    };

    fetchUsers();
    fetchUserCount();
  }, [searchParams]);

  if (!authFetched || !usersFetched || !userCountFetched) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Users</h1>
      <SortingOptions searchParams={searchParams} type={""} />
      <Pagination searchParams={searchParams} count={userCount} />
      {users.length > 0 ? (
        <UserList users={users} />
      ) : (
        <h2 className={`${styles.heading} ${styles.notFound}`}>
          No users found
        </h2>
      )}
    </div>
  );
}

export default Users;
