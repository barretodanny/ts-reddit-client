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

export function getSearchQueryParam(queryString: string) {
  const urlSearchParams = new URLSearchParams(queryString);
  const searchParam = urlSearchParams.get("search");
  return searchParam;
}

export function getSearchTypeQueryParam(queryString: string) {
  const urlSearchParams = new URLSearchParams(queryString);
  const searchTypeParam = urlSearchParams.get("type");

  if (searchTypeParam) {
    return searchTypeParam;
  } else {
    return "posts";
  }
}

export function updateSearchTypeQueryParam(
  queryString: string,
  oldType: string,
  newType: string
) {
  // When changing search type category, also reset back to page 1 if not already there
  if (queryString.includes("page=")) {
    queryString = queryString.replace(/page=[^&]+/, "page=1");
  }

  if (!queryString.includes("type=")) {
    if (queryString.includes("?")) {
      queryString += `&type=${newType}`;
    } else {
      queryString += `?type=${newType}`;
    }
  }
  return queryString.replace(oldType, newType);
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

export function getTimeAgo(createdAt: string) {
  const now = new Date(); // Current date and time
  const createdAtDate = new Date(createdAt); // Convert the string to a Date object

  // Calculate the time difference in milliseconds
  const timeDiff = now.getTime() - createdAtDate.getTime();

  // Convert the time difference to minutes, hours, or days
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Return the appropriate time ago format
  if (minutes < 1) {
    return "Just now";
  } else if (minutes < 60) {
    return minutes + " minutes ago";
  } else if (hours < 24) {
    return hours + " hours ago";
  } else {
    return days + " days ago";
  }
}

export function extractSubredditName(url: string) {
  // regex pattern
  const pattern = /\/r\/([^/]+)/;
  const match = url.match(pattern);

  if (match && match[1]) {
    return match[1];
  } else {
    return "";
  }
}
