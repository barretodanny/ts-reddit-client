import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/AuthSlice";

import styles from "./LogoutBtn.module.css";

function LogoutBtn() {
  const dispatch: AppDispatch = useDispatch();

  async function handleLogout() {
    dispatch(logout());
  }

  return (
    <button className={styles.logout} onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutBtn;
