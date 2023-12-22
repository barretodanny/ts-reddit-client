import { Link } from "react-router-dom";
import {
  getSearchTypeQueryParam,
  updateSearchTypeQueryParam,
} from "../../utils/utils";

import styles from "./TypeOptions.module.css";

interface TypeOptionsProps {
  searchParams: string;
}

function TypeOptions({ searchParams }: TypeOptionsProps) {
  const type = getSearchTypeQueryParam(searchParams);

  return (
    <div className={styles.container}>
      <Link
        to={`/search${updateSearchTypeQueryParam(searchParams, type, "posts")}`}
        className={`${styles.typeOption} ${
          type === "posts" ? styles.selected : ""
        }`}
      >
        Posts
      </Link>
      <Link
        to={`/search${updateSearchTypeQueryParam(
          searchParams,
          type,
          "subreddits"
        )}`}
        className={`${styles.typeOption} ${
          type === "subreddits" ? styles.selected : ""
        }`}
      >
        Subreddits
      </Link>
      <Link
        to={`/search${updateSearchTypeQueryParam(searchParams, type, "users")}`}
        className={`${styles.typeOption} ${
          type === "users" ? styles.selected : ""
        }`}
      >
        Users
      </Link>
    </div>
  );
}

export default TypeOptions;
