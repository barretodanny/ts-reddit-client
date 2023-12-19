import { useState } from "react";

import styles from "./TopBtn.module.css";

function TopBtn() {
  const [scrollPos, setScrollPos] = useState(0);

  function handleScroll() {
    if (document.body.scrollTop) {
      setScrollPos(document.body.scrollTop);
    } else if (document.documentElement.scrollTop) {
      setScrollPos(document.documentElement.scrollTop);
    }
  }

  function handleClick() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setScrollPos(0);
  }

  if (typeof window !== "undefined") {
    window.onscroll = handleScroll;
  }

  return (
    <button
      onClick={handleClick}
      id="topBtn"
      title="Go to top"
      className={`${styles.container} ${scrollPos > 160 && styles.show}`}
    >
      Back To Top
    </button>
  );
}

export default TopBtn;
