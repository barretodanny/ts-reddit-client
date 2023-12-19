import { useState } from "react";

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
    <button onClick={handleClick} id="topBtn" title="Go to top">
      Back To Top
    </button>
  );
}

export default TopBtn;
