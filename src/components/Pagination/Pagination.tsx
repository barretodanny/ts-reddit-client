import { Link, useLocation } from "react-router-dom";
import {
  getLimitQueryParam,
  getPageQueryParam,
  updatePageQueryParam,
} from "../../utils/utils";

import styles from "./Pagination.module.css";
import { useEffect, useState } from "react";

interface PaginationProps {
  searchParams: string;
  count: number;
}

function Pagination({ searchParams, count }: PaginationProps) {
  const [loading, setLoading] = useState(false);

  const page = getPageQueryParam(searchParams);
  const limit = getLimitQueryParam(searchParams);
  const pageCount = Math.ceil(count / limit);

  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 350);
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <Link
        to={`${url}${updatePageQueryParam(searchParams, page, 1)}`}
        className={`${styles.pageBtn} ${
          pageCount < 5 || page === 1 ? styles.hidden : ""
        } ${loading && styles.hidden}`}
        onClick={() => {
          setLoading(true);
        }}
      >
        Page 1
      </Link>

      <Link
        to={`${url}${updatePageQueryParam(searchParams, page, page - 1)}`}
        className={`${styles.pageBtn} ${page < 2 ? styles.hidden : ""} ${
          loading && styles.hidden
        }`}
        onClick={() => {
          setLoading(true);
        }}
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
        } ${loading && styles.hidden}`}
        onClick={() => {
          setLoading(true);
        }}
      >
        Next Page
      </Link>

      <Link
        to={`${url}${updatePageQueryParam(searchParams, page, pageCount)}`}
        className={`${styles.pageBtn} ${
          pageCount < 5 || page === pageCount ? styles.hidden : ""
        } ${loading && styles.hidden}`}
        onClick={() => {
          setLoading(true);
        }}
      >
        Page {pageCount}
      </Link>
    </div>
  );
}

export default Pagination;
