import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import styles from "./NavSearchBar.module.css";

function NavSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", clearSearch);

    return () => {
      document.removeEventListener("click", clearSearch);
    };
  }, []);

  function handleSearch(e: any) {
    e.preventDefault();

    if (!searchTerm) {
      return;
    }

    navigate(`/search?search=${searchTerm}`);
    setSearchTerm("");
  }

  function clearSearch(e: any) {
    // clear the search term if the target is not the search bar
    if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
      setSearchTerm("");
    }
  }

  return (
    <div ref={searchBarRef} className={styles.container}>
      <AiOutlineSearch size={26} />
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />
      </form>
    </div>
  );
}

export default NavSearchBar;
