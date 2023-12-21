import { Link, useLocation } from "react-router-dom";

import { getSortQueryParam, updateSortQueryParam } from "../../utils/utils";

import styles from "./SortingOptions.module.css";

interface SortingOptionsProps {
  searchParams: string;
  type: string;
}

function SortingOptions({ searchParams, type }: SortingOptionsProps) {
  // type === points are sorted by old, new, top, bottom
  // type !== points are sorted by old, new, alpha, rev alpha
  const sort = getSortQueryParam(searchParams);
  const location = useLocation();
  const url = location.pathname;

  return (
    <div className={styles.container}>
      <div className={styles.sortingOptions}>
        <Link
          to={`${url}${updateSortQueryParam(searchParams, sort, "old")}`}
          className={`${styles.sortingOption} ${
            sort === "old" ? styles.selected : ""
          }`}
        >
          Old
        </Link>
        <Link
          to={`${url}${updateSortQueryParam(searchParams, sort, "new")}`}
          className={`${styles.sortingOption} ${
            sort === "new" ? styles.selected : ""
          }`}
        >
          New
        </Link>
        {type === "points" ? (
          <>
            <Link
              to={`${url}${updateSortQueryParam(searchParams, sort, "top")}`}
              className={`${styles.sortingOption} ${
                sort === "top" ? styles.selected : ""
              }`}
            >
              Top
            </Link>
            <Link
              to={`${url}${updateSortQueryParam(searchParams, sort, "bottom")}`}
              className={`${styles.sortingOption} ${
                sort === "bottom" ? styles.selected : ""
              }`}
            >
              Bottom
            </Link>
          </>
        ) : (
          <>
            <Link
              to={`${url}${updateSortQueryParam(searchParams, sort, "alpha")}`}
              className={`${styles.sortingOption} ${
                sort === "alpha" ? styles.selected : ""
              }`}
            >
              Alpha
            </Link>
            <Link
              to={`${url}${updateSortQueryParam(
                searchParams,
                sort,
                "alpha-rev"
              )}`}
              className={`${styles.sortingOption} ${
                sort === "alpha-rev" ? styles.selected : ""
              }`}
            >
              Alpha-rev
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default SortingOptions;
