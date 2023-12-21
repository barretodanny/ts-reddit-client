export function getSortQueryParam(queryString: string) {
  const urlSearchParams = new URLSearchParams(queryString);
  const sortParam = urlSearchParams.get("sort");

  const validSortValues = ["old", "new", "alpha", "alpha-rev", "top", "bottom"];

  if (sortParam && validSortValues.includes(sortParam)) {
    return sortParam;
  } else {
    return "old";
  }
}

export function updateSortQueryParam(
  queryString: string,
  oldSort: string,
  newSort: string
) {
  // When changing sort category, also reset back to page 1 if not already there
  if (queryString.includes("page=")) {
    queryString = queryString.replace(/page=[^&]+/, "page=1");
  }

  if (!queryString.includes("sort=")) {
    if (queryString.includes("?")) {
      queryString += `&sort=${newSort}`;
    } else {
      queryString += `?sort=${newSort}`;
    }
  }
  return queryString.replace(oldSort, newSort);
}

export function getPageQueryParam(queryString: string) {
  const urlSearchParams = new URLSearchParams(queryString);
  const pageParam = urlSearchParams.get("page");

  if (pageParam) {
    const page = parseInt(pageParam);
    return page ? page : 1;
  } else {
    return 1;
  }
}

export function getLimitQueryParam(queryString: string) {
  const urlSearchParams = new URLSearchParams(queryString);
  const limitParam = urlSearchParams.get("limit");

  if (limitParam) {
    const limit = parseInt(limitParam);
    return limit ? limit : 10;
  } else {
    return 10;
  }
}

export function updatePageQueryParam(
  queryString: string,
  oldPage: number,
  newPage: number
) {
  if (!queryString.includes("page=")) {
    if (queryString.includes("?")) {
      queryString += `&page=${newPage}`;
    } else {
      queryString += `?page=${newPage}`;
    }
  }
  return queryString.replace("" + oldPage, "" + newPage);
}
