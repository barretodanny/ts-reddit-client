import { Link, useLocation } from "react-router-dom";
import {
  getLimitQueryParam,
  getPageQueryParam,
  updatePageQueryParam,
} from "../../utils/utils";

import styles from "./Pagination.module.css";

interface PaginationProps {
  searchParams: string;
  count: number;
}

function Pagination({ searchParams, count }: PaginationProps) {
  const page = getPageQueryParam(searchParams);
  const limit = getLimitQueryParam(searchParams);
  const pageCount = Math.ceil(count / limit);

  const location = useLocation();
  const url = location.pathname;

  return (
    <div className={styles.container}>
      <Link
        to={`${url}${updatePageQueryParam(searchParams, page, 1)}`}
        className={`${styles.pageBtn} ${
          pageCount < 5 || page === 1 ? styles.hidden : ""
        }`}
      >
        Page 1
      </Link>

      <Link
        to={`${url}${updatePageQueryParam(searchParams, page, page - 1)}`}
        className={`${styles.pageBtn} ${page < 2 ? styles.hidden : ""}`}
      >
        Prev Page
      </Link>
      <span className={styles.count}>
        Page {count > 0 ? page : 0} of {pageCount}
      </span>
      <Link
        to={`${url}${updatePageQueryParam(searchParams, page, page + 1)}`}
        className={`${styles.pageBtn} ${
          page >= pageCount ? styles.hidden : ""
        }`}
      >
        Next Page
      </Link>

      <Link
        to={`${url}${updatePageQueryParam(searchParams, page, pageCount)}`}
        className={`${styles.pageBtn} ${
          pageCount < 5 || page === pageCount ? styles.hidden : ""
        }`}
      >
        Page {pageCount}
      </Link>
    </div>
  );
}

export default Pagination;
