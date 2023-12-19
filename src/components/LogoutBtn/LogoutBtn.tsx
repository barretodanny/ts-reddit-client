import { useNavigate } from "react-router-dom";
import { deleteSession } from "../../api";

import styles from "./LogoutBtn.module.css";

function LogoutBtn() {
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await deleteSession();

    // user is logged out
    if (response.status === 200) {
      navigate(0);
    }
  }

  return (
    <button className={styles.logout} onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutBtn;
