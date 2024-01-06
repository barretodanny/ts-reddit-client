import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import styles from "./NotFound.module.css";

function NotFound() {
  const { authFetched } = useSelector((state: RootState) => state.auth);

  if (!authFetched) {
    return <></>;
  }

  return (
    <div>
      <h2 className={`${styles.heading} ${styles.notFound}`}>Page Not Found</h2>
    </div>
  );
}

export default NotFound;
